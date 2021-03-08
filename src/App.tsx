import { Context } from '@honzachalupa/helpers';
import React, { useEffect, useState } from 'react';
import { AppearanceProvider } from 'react-native-appearance';
import { getArticles, getFeeds } from './helpers/api';
import { IArticle, IFeed } from './interfaces';
import Router from './Router';

export interface IContext {
    feeds: IFeed[],
    articles: IArticle[],
    unreadArticlesCount: number;
    updateContextProperty: (key: string, value: unknown) => void;
}

const App = () => {
    const [context, setContext] = useState<IContext>({
        feeds: [],
        articles: [],
        unreadArticlesCount: 1,
        updateContextProperty: () => { }
    });

    const contextFunctions = {
        updateContextProperty: (key: string, value: unknown) => setContext((prevState: IContext) => ({
            ...prevState,
            [key]: value
        }))
    };

    /* const getUnreadArticlesCount = (articles: { [key: string]: IArticle[] }) => {
        let sum = 0;

        Object.values(articles).forEach((articles: any) =>
            sum += articles.length
        );

        return sum;

        // updateContextProperty('unreadArticlesCount', getUnreadArticlesCount(articles));
    }; */

    useEffect(() => {
        getFeeds(feeds => {
            setContext(prevState => ({
                ...prevState,
                feeds
            }));
        });

        getArticles(articles => {
            setContext(prevState => ({
                ...prevState,
                articles,
                isLoading: false
            }));
        });
    }, []);

    return (
        <Context.Provider value={{ ...context, ...contextFunctions }}>
            <AppearanceProvider>
                <Router />
            </AppearanceProvider>
        </Context.Provider>
    );
};

export default App;
