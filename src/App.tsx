import { Context } from '@honzachalupa/helpers';
import moment, { Moment } from 'moment';
import 'moment/locale/cs';
import React, { useEffect, useState } from 'react';
import { AppearanceProvider } from 'react-native-appearance';
import { getArticles, getFeeds } from './helpers/api';
import { getContextFunctions } from './helpers/contextFunctions';
import { getUnreadArticlesCount } from './helpers/data';
import { useAppState } from './helpers/lifecycle';
import { useNetworkStatus } from './helpers/network';
import { loadContext, saveContext } from './helpers/storage';
import { IArticle, IFeed } from './interfaces';
import Router from './Router';

moment().locale('cs')

export interface IContext {
    feeds: IFeed[];
    articles: IArticle[];
    savedArticles: IArticle[];
    readArticlesIDs: IArticle['id'][];
    unreadArticlesCount: number;
    lastRefreshTime: Moment | null;
    isRefreshing: boolean;
    isOnline: boolean | null;
    settingsIsAutoPlayOn: boolean;
    settingsSelectedFeeds: IFeed['id'][];
    settingsBlacklist: string[];
    handleRefresh: (callback?: () => void) => void;
    handleSaveArticle: (article: IArticle) => void;
    handleUnsaveArticle: (article: IArticle['id']) => void;
    markArticleAsRead: (articleId: IArticle['id']) => void;
    setContextProperty: (key: string, value: unknown) => void;
}

const App = () => {
    const appState = useAppState();
    const isOnline = useNetworkStatus();

    const [context, setContext] = useState<IContext>({
        feeds: [],
        articles: [],
        savedArticles: [],
        readArticlesIDs: [],
        unreadArticlesCount: 0,
        lastRefreshTime: null,
        isRefreshing: false,
        isOnline,
        settingsIsAutoPlayOn: false,
        settingsSelectedFeeds: [],
        settingsBlacklist: [],
        handleRefresh: () => { },
        handleSaveArticle: () => { },
        handleUnsaveArticle: () => { },
        markArticleAsRead: () => { },
        setContextProperty: () => { }
    });

    const setContextProperty = (key: string, value: unknown) =>
        setContext(prevState => ({
            ...prevState,
            [key]: value
        }));

    const getData = (callback?: () => void) => {
        if (context.isOnline) {
            setContextProperty('isRefreshing', true);

            const feedsPromise = getFeeds(feeds => {
                setContextProperty('feeds', feeds);
            });

            const articlesPromises = getArticles(articles => {
                setContextProperty('articles', articles);
                setContextProperty('unreadArticlesCount', getUnreadArticlesCount(articles, context.readArticlesIDs));
            });

            Promise.all([feedsPromise, articlesPromises]).then(() => {
                setContextProperty('isRefreshing', false);
                setContextProperty('lastRefreshTime', moment());

                if (callback) {
                    callback();
                }
            });
        }
    };

    const handleActivation = () => {
        if (context.lastRefreshTime && moment().diff(context.lastRefreshTime, 'minutes') > 5) {
            getData();
        }
    };

    useEffect(() => {
        loadContext(setContext);
        getData();
    }, []);

    useEffect(() => {
        saveContext(context);
    }, [context]);

    useEffect(() => {
        if (appState === 'active') {
            handleActivation();
        }
    }, [appState]);

    useEffect(() => {
        setContextProperty('isOnline', isOnline);
    }, [isOnline]);

    useEffect(() => {
        setContextProperty('unreadArticlesCount', getUnreadArticlesCount(context.articles, context.readArticlesIDs));
    }, [context.articles, context.readArticlesIDs]);

    return (
        <Context.Provider value={{ ...context, ...getContextFunctions(context, setContext, getData) }}>
            <AppearanceProvider>
                <Router />
            </AppearanceProvider>
        </Context.Provider>
    );
};

export default App;
