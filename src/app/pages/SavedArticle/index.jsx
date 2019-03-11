import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { _d } from '@honzachalupa/helpers';
import './style';
import BackIcon from 'Icons/accented/back';
import HeartCrossed from 'Icons/accented/heart-crossed';
import Layout from 'Layouts/Blank';
import Article from 'Components/Article';
import { autobind } from 'core-decorators';


class Page_SavedArticle extends Component {
    state = {
        article: {}
    };

    componentDidMount() {
        this.getArticle();
    }

    getArticle() {
        const { id: articleId } = this.props.match.params;

        const savedArticlesRaw = localStorage.getItem('savedArticles');

        if (savedArticlesRaw) {
            const savedArticles = JSON.parse(savedArticlesRaw);

            const article = savedArticles.find(article => article.id === articleId);

            this.setState({
                article
            });
        }
    }

    @autobind
    handleUnsave() {
        const { id: articleId } = this.props.match.params;

        const savedArticlesRaw = localStorage.getItem('savedArticles');
        const savedArticlesIDsRaw = localStorage.getItem('savedArticlesIDs');

        if (savedArticlesRaw) {
            const savedArticles = JSON.parse(savedArticlesRaw);
            const articles = savedArticles.filter(article => article.id !== articleId);

            localStorage.setItem('savedArticles', JSON.stringify(articles));
        }

        if (savedArticlesIDsRaw) {
            const savedArticlesIDs = JSON.parse(savedArticlesIDsRaw);
            const ids = savedArticlesIDs.filter(id => id !== articleId);

            localStorage.setItem('savedArticlesIDs', JSON.stringify(ids));
        }

        window.history.back();
    }

    handleRedirection(url) {
        this.props.history.push(url);
    }

    render() {
        const { article } = this.state;

        return (
            <section>
                <Layout>
                    {_d.isValid(article) && (
                        <Fragment>
                            <header className="header">
                                <div className="aligned-left">
                                    <button className="button back" type="button" onClick={() => window.history.back()}>
                                        <img className="icon" src={BackIcon} alt="" />
                                    </button>
                                </div>

                                <div className="aligned-right">
                                    <button className="button unsave" type="button" onClick={this.handleUnsave}>
                                        <img className="icon" src={HeartCrossed} alt="" />
                                    </button>
                                </div>
                            </header>

                            <Article {...article} />
                        </Fragment>
                    )}
                </Layout>
            </section>
        );
    }
}

export default withRouter(Page_SavedArticle);
