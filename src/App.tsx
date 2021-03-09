import { Context } from '@honzachalupa/helpers';
import React, { useEffect, useState } from 'react';
import { AppearanceProvider } from 'react-native-appearance';
import { getArticles, getFeeds } from './helpers/api';
import { IArticle, IFeed } from './interfaces';
import Router from './Router';

export interface IContext {
    feeds: IFeed[],
    articles: IArticle[],
    readArticlesIDs: IArticle['id'][];
    unreadArticlesCount: number;
    isRefreshing: boolean;
    handleRefresh: () => void;
    markArticleAsRead: (articleId: IArticle['id']) => void;
    updateContextProperty: (key: string, value: unknown) => void;
}

const App = () => {
    const [context, setContext] = useState<IContext>({
        feeds: [],
        articles: [],
        readArticlesIDs: [],
        unreadArticlesCount: 0,
        isRefreshing: false,
        handleRefresh: () => {},
        markArticleAsRead: () => {},
        updateContextProperty: () => {}
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

    const contextFunctions = {
        handleRefresh: () => {
            getData();
        },
        markArticleAsRead: (articleId: IArticle['id']) => {
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
        getData();
    }, []);

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
