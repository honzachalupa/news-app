import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';
import { _d, Context } from '@honzachalupa/helpers';
import { timeoutFetch, getUrlParameters } from 'Helpers/app';
import { getEndpointUrl, getArticleById } from 'Helpers/api';
import './style';
import BackIcon from 'Icons/accented/grid';
import HeartIcon from 'Icons/accented/heart';
import HeartFilledIcon from 'Icons/accented/heart-filled';
import Layout from 'Layouts/Blank';
import LoadingOverlay from 'Components/LoadingOverlay';
import Article from 'Components/Article';
import { autobind } from 'core-decorators';


class Page_Articles extends Component {
    static contextType = Context;

    state = {
        articles: [],
        initialArticleId: 0,
        selectedArticleId: null,
        isSaved: false,
        errorMessage: null
    }

    componentDidMount() {
        this.getArticles();
        this.checkSaveState();
    }

    componentDidUpdate(prevProps, prevState) {
        const articleChanged = prevState.selectedArticleId !== this.state.selectedArticleId;

        if (articleChanged) {
            this.checkSaveState();
        }
    }

    checkSaveState() {
        const { selectedArticleId } = this.state;

        const savedArticlesIDsRaw = localStorage.getItem('savedArticlesIDs');

        if (savedArticlesIDsRaw && selectedArticleId) {
            const savedArticlesIDs = JSON.parse(savedArticlesIDsRaw);
            const isSaved = savedArticlesIDs.includes(selectedArticleId);

            this.setState({
                isSaved
            });
        }
    }

    async getArticles() {
        // const { _showLoading, _hideLoading } = this.context;
        const { apiGroup, feedId } = this.props.match.params;

        // _showLoading('Stahují se články.');

        timeoutFetch(fetch(getEndpointUrl(apiGroup, feedId)), 10000).then(async response => {
            const articles = await response.json();

            this.setState({
                articles,
                selectedArticleId: articles[0].id,
                initialArticleId: Math.max(this.getInitialArticleId(articles), 0)
            });

            // _hideLoading();
        }).catch(error => {
            if (navigator.onLine) {
                throw new Error(error);
            } else {
                this.setState({
                    articles: null,
                    errorMessage: 'Zkontrolujte prosím připojení k internetu.'
                });
            }

            // _hideLoading();
        });
    }

    getInitialArticleId(articles) {
        const { id } = getUrlParameters();

        return articles.findIndex(article => article.id === id);
    }

    async asyncForEach(array, callback) {
        for (let i = 0; i < array.length; i += 1) {
            await callback(array[i], i, array); // eslint-disable-line no-await-in-loop
        }
    }

    async saveArticles(savedArticlesIDs) {
        const articlesToSave = [];

        await this.asyncForEach(savedArticlesIDs, async id => {
            const article = await getArticleById(id);

            articlesToSave.push(article);
        });

        localStorage.setItem('savedArticlesIDs', JSON.stringify(savedArticlesIDs));
        localStorage.setItem('savedArticles', JSON.stringify(articlesToSave));
    }

    @autobind
    handleSwipe(index) {
        const { articles } = this.state;

        window.scrollTo(0, 0);

        this.setState({
            selectedArticleId: articles[index].id,
            initialArticleId: null
        });
    }

    @autobind
    handleChangeSave() {
        const savedArticlesIDsRaw = localStorage.getItem('savedArticlesIDs');
        let savedArticlesIDs;

        if (savedArticlesIDsRaw) {
            const { selectedArticleId, isSaved } = this.state;

            savedArticlesIDs = JSON.parse(savedArticlesIDsRaw) || [];

            if (!savedArticlesIDs.includes(selectedArticleId)) {
                savedArticlesIDs.push(selectedArticleId);
            } else {
                const matchIndex = savedArticlesIDs.findIndex(id => id === selectedArticleId);

                savedArticlesIDs.splice(matchIndex, 1);
            }

            this.setState({
                isSaved: !isSaved
            });
        } else {
            const { selectedArticleId } = this.state;

            savedArticlesIDs = [selectedArticleId];
        }

        this.saveArticles(savedArticlesIDs);
    }

    handleRedirection(url) {
        this.props.history.push(url);
    }

    render() {
        const { articles, initialArticleId, isSaved, errorMessage } = this.state;

        return (
            <section>
                <Layout>
                    {_d.isValid(articles) ? (
                        <Fragment>
                            <header className="header">
                                <div className="aligned-left">
                                    <button className="button back" type="button" onClick={() => this.handleRedirection('/')}>
                                        <img className="icon" src={BackIcon} alt="" />
                                    </button>
                                </div>

                                <div className="aligned-right">
                                    <button className="button save" type="button" onClick={this.handleChangeSave}>
                                        <img className="icon" src={isSaved ? HeartFilledIcon : HeartIcon} alt="" />
                                    </button>
                                </div>
                            </header>

                            <SwipeableViews index={initialArticleId} resistance animateHeight onChangeIndex={this.handleSwipe}>
                                {articles.map(article => (
                                    <Article key={article.id} {...article} />
                                ))}
                            </SwipeableViews>
                        </Fragment>
                    ) : errorMessage ? (
                        <div className="error">{errorMessage}</div>
                    ) : (
                        <LoadingOverlay />
                    )}
                </Layout>
            </section>
        );
    }
}

export default withRouter(Page_Articles);
