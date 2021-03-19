import { Context } from '@honzachalupa/helpers';
import React, { useContext, useEffect, useState } from 'react';
import { IContext } from '../../App';
import ArticlesList from '../../components/ArticlesList';
import { getArticlesInFeed } from '../../helpers/api';
import { IArticle, IFeed } from '../../interfaces';

const FeedArticlesListPage = ({ route: { params: { feed } } }: { route: { params: { feed: IFeed } } }) => {
    const { setContextProperty } = useContext(Context) as IContext;
    const [articles, setArticles] = useState<IArticle[]>([]);

    useEffect(() => {
        setContextProperty('isRefreshing', true);

        getArticlesInFeed(feed.sourceId, articles => {
            setArticles(articles);
            setContextProperty('isRefreshing', false);
        });
    }, []);

    return (
        <ArticlesList articles={articles} feed={feed} />
    );
}

export default FeedArticlesListPage;
