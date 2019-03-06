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

export function getEndpointUrl(apiGroup, feedId, options = {}) {
    if (apiGroup && feedId) {
        return `${apiUrl}/api/${apiGroup}/${feedId}?${getOptions(options)}`;
    } else if (apiGroup) {
        return `${apiUrl}/api/${apiGroup}?${getOptions(options)}`;
    } else {
        return `${apiUrl}/api/articles?${getOptions(options)}`;
    }
}

function getOptions(options) {
    const optionsArray = [];

    Object.keys(options).forEach(key => {
        optionsArray.push(`${key}=${options[key]}`);
    });

    return optionsArray.join('&');
}
