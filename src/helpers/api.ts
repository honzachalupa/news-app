import { IArticle, IFeed } from '../interfaces';

const apiUrl = 'https://europe-west2-universal-api-69.cloudfunctions.net';

export const getFeeds = (callback: (data: IFeed[]) => void) =>
    fetch(`${apiUrl}/news_getFeeds`)
        .then(response => response.json())
        .then(callback)
        .catch(console.error);

export const getArticle = (articleId: IArticle['id'], callback: (data: IArticle) => void) =>
    fetch(`${apiUrl}/news_getArticle`, {
        method: 'GET',
        body: JSON.stringify({ articleId })
    })
        .then(response => response.json())
        .then(callback)
        .catch(console.error);

export const getArticles = (callback: (data: IArticle[]) => void) =>
    fetch(`${apiUrl}/news_getArticles`, {
        method: 'POST'
    })
        .then(response => response.json())
        .then(callback)
        .catch(console.error);

export const getArticlesInFeed = (sourceId: IFeed['sourceId'], callback: (data: IArticle[]) => void) =>
    fetch(`${apiUrl}/news_getArticles`, {
        method: 'POST',
        body: JSON.stringify({ sourceId })
    })
        .then(response => response.json())
        .then(callback)
        .catch(console.error);
