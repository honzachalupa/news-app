import { apiUrl } from 'app-config';

export async function getAvailableFeeds() {
    return fetch(`${apiUrl}/api/feeds`).then(response => {
        return response.json();
    }).catch(error => {
        console.error(error);
    });
}

export async function getArticleById(id) {
    return fetch(`${apiUrl}/api/article/${id}`).then(response => {
        return response.json();
    }).catch(error => {
        console.error(error);
    });
}

export function getEndpoint(apiGroup, feedId) {
    return feedId ?
        `${apiUrl}/api/${apiGroup}/${feedId}` :
        `${apiUrl}/api/${apiGroup}/`;
}
