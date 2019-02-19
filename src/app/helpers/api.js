// const host = 'https://news-engine.now.sh';
const host = 'http://192.168.1.106:5000';

export async function getAvailableEndpoints() {
    return fetch(`${host}/feeds`).then(response => {
        return response.json();
    }).catch(error => {
        console.error(error);
    });
}

export function getEndpoint(apiGroup, feedId, paramsObject) {
    const params = paramsObject ? `?${Object.entries(paramsObject).map(([key, val]) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`).join('&')}` : '';

    return feedId ?
        `${host}/api/${apiGroup}/${feedId}${params}` :
        `${host}/api/${apiGroup}/${params}`;
}
