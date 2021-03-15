export interface IFeed {
    id: string;
    name: string;
    url: string;
    sourceId: string;
    providerId: string;
    branding: {
        logo: string;
        accentColor: string;
        backgroundColor: string;
    }
}

export interface IArticle {
    id: string;
    title: string;
    contentPreview: string;
    content: string[];
    images: string[];
    videos: string[];
    url: string;
    readingTime: number;
    category: string;
    tags: string[];
    author: string;
    sourceId: string;
    providerId: string;
    createdDate: any; // TODO: Add Timestamp type.
}
