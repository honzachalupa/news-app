export interface IFeed {
    id: string;
    name: string;
    url: string;
    sourceId: string;
    provider: {
        id: string;
        name: string;
    };
    branding: {
        logo: string;
        accentColor: string;
    }
}

export interface IArticle {
    id: string;
    title: string;
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
    createdDate: any;
}
