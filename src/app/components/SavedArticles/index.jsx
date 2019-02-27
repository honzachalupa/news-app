import React, { Component } from 'react';
import { _d } from '@honzachalupa/helpers';
import { getArticleById } from 'Helpers/api';
import './style';

export default class SavedArticles extends Component {
    state = {
        article: null
    };

    componentDidMount() {
        this.getArticles();
    }

    componentDidUpdate() {
        if (this.state.articles === null) {
            this.getArticles();
        }
    }

    getArticles() {
        const savedArticlesIDsRaw = localStorage.getItem('savedArticlesIDs');

        if (savedArticlesIDsRaw) {
            const savedArticlesIDs = JSON.parse(savedArticlesIDsRaw);

            const articles = [];
            savedArticlesIDs.forEach(async articleId => {
                const article = await getArticleById(articleId);

                articles.push(article);
            });

            this.setState({
                articles
            });
        }
    }

    handleRedirection(url) {
        this.props.history.push(url);
    }

    render() {
        const { articles } = this.state;

        return _d.isValid(articles) ? (
            <div>
                {articles.map(article => (
                    <p key={article.id}>{article.title}</p>
                ))}
            </div>
        ) : null;
    }
}
