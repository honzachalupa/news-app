import AsyncStorage from '@react-native-community/async-storage';
import { IContext } from '../App';

interface ISavedState {
    savedArticles: IContext['savedArticles'];
    readArticlesIDs: IContext['readArticlesIDs'];
    settingsSelectedFeeds: IContext['settingsSelectedFeeds'];
    settingsBlacklist: IContext['settingsBlacklist'];
}

export const saveContext = async (context: IContext) => {
    await AsyncStorage.setItem('state', JSON.stringify({
        feeds: context.feeds,
        articles: context.articles,
        savedArticles: context.savedArticles,
        readArticlesIDs: context.readArticlesIDs,
        lastRefreshTime: context.lastRefreshTime,
        settingsSelectedFeeds: context.settingsSelectedFeeds,
        settingsBlacklist: context.settingsBlacklist
    } as ISavedState));
};

export const loadContext = async (callback: any) => {
    await AsyncStorage.getItem('state').then(value => {
        if (value) {
            callback((prevState: IContext) => ({
                ...prevState,
                ...JSON.parse(value)
            }));
        }
    });
};
