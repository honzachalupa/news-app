import config from '../config';
import { IArticle, IFeed } from '../interfaces';

export const getFeeds = (callback: (data: IFeed[]) => void) =>
    fetch(`${config.apiUrl}/get_newsFeeds`)
        .then(response => response.json())
        .then(callback)
        .catch(console.error);

export const getArticle = (articleId: IArticle['id'], callback: (data: IArticle[]) => void) =>
    fetch(`${config.apiUrl}/get_newsArticle`, {
        method: 'POST',
        body: JSON.stringify({ articleId })
    })
    .then(response => response.json())
    .then(callback)
    .catch(console.error);

export const getArticles = (sourceId: IFeed['sourceId'], callback: (data: IArticle[]) => void) =>
    fetch(`${config.apiUrl}/get_newsArticles`, {
        method: 'POST',
        body: JSON.stringify({ sourceId })
    })
    .then(response => response.json())
    .then(callback)
    .catch(console.error);
