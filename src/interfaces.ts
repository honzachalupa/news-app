import { ENewsProviders, ENewsSourceLabels, ENewsSources } from './enumerators';

export interface IFeedDefinition {
    id: string;
    name: ENewsSourceLabels;
    url: ENewsSources;
    provider: ENewsProviders;
}

export interface IArticle {
    id: string;
    title: string;
    contentPreview: string;
    content: string;
    url: string;
    createdDate: any; // TODO: Add Timestamp type.
}

export interface IFeed {
    id: string;
    name: string;
    url: string;
    articles: IArticle[];
    updatedDate: any; // TODO: Add Timestamp type.
}
