import { IFeed, IFeedDefinition } from '../../interfaces';

const apiUrl = 'https://europe-west2-universal-api-69.cloudfunctions.net';

export const getFeedsDefinitions = (callback: (data: IFeedDefinition[]) => void) => {
    fetch(`${apiUrl}/get_newsFeedDefinitions`)
        .then(response => response.json())
        .then(callback)
        .catch(console.error);
};

export const getFeeds = (callback: (data: { [key: string]: IFeed }) => void) => {
    fetch(`${apiUrl}/get_newsFeeds`)
        .then(response => response.json())
        .then(callback)
        .catch(console.error);
};
