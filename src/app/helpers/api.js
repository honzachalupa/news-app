import { showModal, timeoutFetch } from 'Helpers/app';
import { apiUrl } from 'app-config';

const apiRoot = `${apiUrl}/news-engine/api`;

export async function getAvailableFeeds() {
    return timeoutFetch(
        fetch(`${apiRoot}/feeds`),
        10000
    ).then(response => response.json()).catch(() => {
        showModal('Vyskytla se chyba při načítání zdrojů.');
    });
}

export async function getAllArticles() {
    return timeoutFetch(
        fetch(`${apiRoot}/articles`),
        10000
    ).then(response => response.json()).catch(() => {
        showModal('Vyskytla se chyba při načítání článků.');
    });
}

export async function getArticleById(id) {
    return timeoutFetch(
        fetch(`${apiRoot}/article/${id}`),
        10000
    ).then(response => response.json()).catch(() => {
        showModal('Vyskytla se chyba při načítání článku.');
    });
}

export function getEndpointUrl(apiGroup, feedId, options = {}) {
    const params = getUrlParams(options);

    return apiGroup && feedId ?
        `${apiRoot}/articles/${apiGroup}/${feedId}${params}` :
        apiGroup ?
            `${apiRoot}/articles/${apiGroup}${params}` :
            `${apiRoot}/articles${params}`;
}

function getUrlParams(options) {
    const optionsArray = [];

    Object.keys(options).forEach(key => {
        optionsArray.push(`${key}=${options[key]}`);
    });

    return optionsArray.length ? `?${optionsArray.join('&')}` : '';
}
