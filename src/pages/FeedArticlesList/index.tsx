import React, { useEffect, useState } from 'react';
import ArticlesList from '../../components/ArticlesList';
import { getArticlesInFeed } from '../../helpers/api';
import { IArticle, IFeed } from '../../interfaces';

const FeedArticlesListPage = ({ route: { params: { feed } } }: { route: { params: { feed: IFeed } } }) => {
    const [articles, setArticles] = useState<IArticle[]>([]);

    useEffect(() => {
        getArticlesInFeed(feed.sourceId, setArticles);
    }, []);

    return (
        <ArticlesList articles={articles} feed={feed} />
    );
}

export default FeedArticlesListPage;
