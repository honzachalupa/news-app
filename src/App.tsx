import { Context } from '@honzachalupa/helpers';
import AsyncStorage from '@react-native-community/async-storage';
import React, { useEffect, useState } from 'react';
import { AppearanceProvider } from 'react-native-appearance';
import { getArticles, getFeeds } from './helpers/api';
import { IArticle, IFeed } from './interfaces';
import Router from './Router';

export interface IContext {
    feeds: IFeed[];
    articles: IArticle[];
    savedArticles: IArticle[];
    readArticlesIDs: IArticle['id'][];
    unreadArticlesCount: number;
    isRefreshing: boolean;
    handleRefresh: () => void;
    handleSaveArticle: (article: IArticle) => void;
    handleUnsaveArticle: (article: IArticle['id']) => void;
    markArticleAsRead: (articleId: IArticle['id']) => void;
    updateContextProperty: (key: string, value: unknown) => void;
}

interface ISavedState {
    savedArticles: IContext['savedArticles'];
    readArticlesIDs: IContext['readArticlesIDs'];
}

const App = () => {
    const [context, setContext] = useState<IContext>({
        feeds: [],
        articles: [],
        savedArticles: [],
        readArticlesIDs: [],
        unreadArticlesCount: 0,
        isRefreshing: false,
        handleRefresh: () => { },
        handleSaveArticle: () => { },
        handleUnsaveArticle: () => { },
        markArticleAsRead: () => { },
        updateContextProperty: () => { }
    });

    const setContextValue = (key: string, value: unknown) => {
        setContext(prevState => ({
            ...prevState,
            [key]: value
        }));
    };

    const getUnreadArticlesCount = (articles: IArticle[], readArticlesIDs: IArticle['id'][]) =>
        articles.filter(({ id }) => !context.readArticlesIDs.includes(id)).length;

    const getData = () => {
        setContextValue('isRefreshing', true);

        const feedsPromise = getFeeds(feeds =>
            setContextValue('feeds', feeds)
        );

        const articlesPromises = getArticles(articles => {
            setContextValue('articles', articles);
            setContextValue('unreadArticlesCount', getUnreadArticlesCount(articles, context.readArticlesIDs));
        });

        Promise.all([feedsPromise, articlesPromises]).then(() =>
            setContextValue('isRefreshing', false)
        );
    };

    const saveState = async () => {
        try {
            await AsyncStorage.setItem('state', JSON.stringify({
                savedArticles: context.savedArticles,
                readArticlesIDs: context.readArticlesIDs
            } as ISavedState));
        } catch (error) {
            console.error(error);
        }
    };

    const loadState = async () => {
        try {
            await AsyncStorage.getItem('state').then(value => {
                if (value) {
                    const { savedArticles, readArticlesIDs }: ISavedState = JSON.parse(value);

                    setContext(prevState => ({
                        ...prevState,
                        savedArticles,
                        readArticlesIDs
                    }));
                }
            });
        } catch (error) {
            console.error(error);
        }
    };

    const contextFunctions = {
        handleRefresh: () => {
            getData();
        },
        handleSaveArticle: (article: IArticle) => {
            setContext(prevState => ({
                ...prevState,
                savedArticles: [...prevState.savedArticles, article]
            }));
        },
        handleUnsaveArticle: (articleId: IArticle['id']) => {
            setContext(prevState => ({
                ...prevState,
                savedArticles: prevState.savedArticles.filter(({ id }) => id !== articleId)
            }));
        },
        markArticleAsRead: (articleId: IArticle['id']) => {
            setContext(prevState => ({
                ...prevState,
                readArticlesIDs: [...prevState.readArticlesIDs, articleId]
            }));
        },
        updateContextProperty: (key: string, value: unknown) => setContext((prevState: IContext) => ({
            ...prevState,
            [key]: value
        }))
    };

    useEffect(() => {
        loadState();
        getData();
    }, []);

    useEffect(() => {
        saveState();
    }, [context]);

    useEffect(() => {
        setContextValue('unreadArticlesCount', getUnreadArticlesCount(context.articles, context.readArticlesIDs));
    }, [context.articles, context.readArticlesIDs]);

    return (
        <Context.Provider value={{ ...context, ...contextFunctions }}>
            <AppearanceProvider>
                <Router />
            </AppearanceProvider>
        </Context.Provider>
    );
};

export default App;
