import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { _d } from '@honzachalupa/helpers';
import './style';
import Layout from 'Layouts/SubPage';

class Page_SavedArticles extends Component {
    state = {
        page: {
            title: 'Uložené články',
            hasBackButton: true
        },
        articles: []
    }

    componentDidMount() {
        this.getArticles();
    }

    getArticles() {
        const savedArticlesRaw = localStorage.getItem('savedArticles');

        if (savedArticlesRaw) {
            this.setState({
                articles: JSON.parse(savedArticlesRaw)
            });
        }
    }

    handleRedirection(url) {
        this.props.history.push(url);
    }

    render() {
        const { articles, page } = this.state;

        return (
            <section>
                <Layout page={page}>
                    {_d.isValid(articles) ? (
                        <div>
                            {articles.map(article => (
                                <div key={article.id} className="article" data-component="" onClick={() => this.handleRedirection(`clanek/${article.id}`)}>
                                    <div className="content">
                                        <p>{article.title}</p>
                                    </div>

                                    {article.images.length > 0 && (
                                        <img src={article.images[0].url} className="image" alt="" />
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>Nemáte žádné uložené články.</p>
                    )}
                </Layout>
            </section>
        );
    }
}

export default withRouter(Page_SavedArticles);
