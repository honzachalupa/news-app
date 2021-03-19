import { Context } from '@honzachalupa/helpers';
import { useContext } from 'react';
import { IContext } from '../App';
import { EPageIDs } from '../enumerators';
import { IArticle } from '../interfaces';

export const getTabBarIcon = (routeName: string, isFocused: boolean) => {
    // Icons list: https://oblador.github.io/react-native-vector-icons/

    const icon =
        routeName === EPageIDs.ARTICLES_PAGE ?
            'file-tray-full' :
            routeName === EPageIDs.SAVED_ARTICLES_PAGE ?
                'bookmarks' : '';

    return isFocused ? `ios-${icon}` : `ios-${icon}-outline`;
};

export const getUnreadArticlesCount = (articles: IArticle[], readArticlesIDs: IArticle['id'][]) =>
        articles.filter(({ id }) => !readArticlesIDs.includes(id)).length;

export const filterFeedsAndArticles = (ignoreSource?: boolean) => {
    const { feeds, articles, settingsSelectedFeeds, settingsBlacklist } = useContext(Context) as IContext;

    const feedsFiltered = feeds.filter(({ id }) => settingsSelectedFeeds.includes(id));

    let articlesFiltered =
        settingsBlacklist.length > 0 ?
            articles.filter(({ title, content, category, tags }) =>
                settingsBlacklist.filter(blacklistedValue =>
                    title.toLowerCase().includes(blacklistedValue.toLowerCase()) ||
                    content.join('_').toLowerCase().includes(blacklistedValue.toLowerCase()) ||
                    category.toLowerCase().includes(blacklistedValue.toLowerCase()) ||
                    tags.join('_').toLowerCase().includes(blacklistedValue.toLowerCase())
                ).length === 0
            ) :
            articles;

    if (!ignoreSource) {
        articlesFiltered = articlesFiltered.filter(({ sourceId }) => feedsFiltered.map(({ sourceId }) => sourceId).includes(sourceId));
    }

    return {
        feedsFiltered,
        articlesFiltered
    };
};

export const searchInArticles = (articles: IArticle[], query: string) =>
    articles.filter(({ title, content, tags }) =>
        title.toLowerCase().includes(query.toLowerCase()) ||
        content.join('_').toLowerCase().includes(query.toLowerCase()) ||
        tags.join('_').toLowerCase().includes(query.toLowerCase())
    );
