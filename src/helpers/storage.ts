import AsyncStorage from '@react-native-community/async-storage';
import { IContext } from '../App';

export enum EStorageKeys {
    STATE = 'STATE'
}

export const saveContext = async (context: IContext) => {
    const newContext: Partial<IContext> = {
        feeds: context.feeds,
        articles: context.articles,
        savedArticles: context.savedArticles,
        readArticlesIDs: context.readArticlesIDs,
        lastRefreshTime: context.lastRefreshTime,
        settingsSelectedFeeds: context.settingsSelectedFeeds,
        settingsBlacklist: context.settingsBlacklist
    };

    await AsyncStorage.setItem(EStorageKeys.STATE, JSON.stringify(newContext));
};

export const loadContext = async (callback: any) => {
    await AsyncStorage.getItem(EStorageKeys.STATE).then(value => {
        if (value) {
            callback((prevState: IContext) => ({
                ...prevState,
                ...JSON.parse(value)
            }));
        }
    });
};
