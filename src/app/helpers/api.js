import { showModal, timeoutFetch } from 'Helpers/app';
import { apiUrl } from 'app-config';

export async function getAvailableFeeds() {
    return timeoutFetch(
        fetch(`${apiUrl}/api/feeds`),
        10000
    ).then(response => response.json()).catch(() => {
        showModal('Vyskytla se chyba při načítání zdrojů.');
    });
}

export async function getArticleById(id) {
    return timeoutFetch(
        fetch(`${apiUrl}/api/article/${id}`),
        10000
    ).then(response => response.json()).catch(() => {
        showModal('Vyskytla se chyba při načítání článku.');
    });
}

export function getEndpointUrl(apiGroup, feedId) {
    return feedId ?
        `${apiUrl}/api/${apiGroup}/${feedId}` :
        `${apiUrl}/api/${apiGroup}/`;
}
