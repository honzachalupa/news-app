import { Context } from '@honzachalupa/helpers';
import React, { useContext } from 'react';
import { IContext } from '../../App';
import ArticlesList from '../../components/ArticlesList';

const FeedArticlesListPage = () => {
    const { savedArticles } = useContext(Context) as IContext;

    return (
        <ArticlesList articles={savedArticles} label="Uložené" isRefreshDisabled />
    );
}

export default FeedArticlesListPage;
