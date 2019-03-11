import { Plugins as Capacitor } from '@capacitor/core';

export function _log (...message) {
    console.log(...message); // eslint-disable-line no-console
}

export async function timeoutFetch(promise, timeout) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error('Request timeout.'));
        }, timeout);

        promise.then(resolve, reject);
    });
}

export async function showModal(message, title = 'Chyba') {
    await Capacitor.Modals.alert({
        title,
        message
    });
}

export function getUrlParameters() {
    const { search } = window.location;

    const parametersString = search.replace(/^\?/, '');

    const parameters = {};
    parametersString.split('&').forEach(node => {
        const splitted = node.split('=');

        parameters[splitted[0]] = splitted[1];
    });

    return parameters;
}
