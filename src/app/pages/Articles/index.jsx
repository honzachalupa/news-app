import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';
import { _d, Context } from '@honzachalupa/helpers';
import { timeoutFetch } from 'Helpers/app';
import { getEndpointUrl } from 'Helpers/api';
import './style';
import BackIcon from 'Icons/back';
import StarIcon from 'Icons/star';
import StarFilledIcon from 'Icons/star-filled';
import ReloadIcon from 'Icons/reload';
import Layout from 'Layouts/Blank';
import LoadingOverlay from 'Components/LoadingOverlay';
import Article from 'Components/Article';
import { autobind } from 'core-decorators';


class Page_Articles extends Component {
    static contextType = Context;

    state = {
        articles: [],
        selectedArticleID: null,
        isSaved: false,
        errorMessage: null
    }

    componentDidMount() {
        const { _hideLoading } = this.context;

        this.getArticles();
        this.checkSaveState();

        _hideLoading();
    }

    componentDidUpdate(prevProps, prevState) {
        const { _hideLoading } = this.context;
        const articleChanged = prevState.selectedArticleID !== this.state.selectedArticleID;

        if (articleChanged) {
            this.checkSaveState();
        }

        if (!_d.isValid(prevState.articles) && _d.isValid(this.state.articles)) {
            // _hideLoading();
        }
    }

    checkSaveState() {
        const { selectedArticleID } = this.state;

        let savedArticlesIDs = localStorage.getItem('savedArticlesIDs');

        if (savedArticlesIDs && selectedArticleID) {
            savedArticlesIDs = JSON.parse(savedArticlesIDs);

            const matchIndex = savedArticlesIDs.findIndex(id => id === selectedArticleID);

            this.setState({
                isSaved: matchIndex > 0
            });
        }
    }

    async getArticles() {
        const { _showLoading, _hideLoading } = this.context;
        const { apiGroup, feedId } = this.props.match.params;

        _showLoading('Stahují se články.');

        console.log('getArticles()');

        timeoutFetch(fetch(getEndpointUrl(apiGroup, feedId)), 10000).then(async response => {
            console.log('fetch()');

            const articles = await response.json();

            this.setState({
                articles,
                selectedArticleID: articles[0].id
            });

            _hideLoading();
        }).catch(error => {
            if (navigator.onLine) {
                throw new Error(error);
            } else {
                this.setState({
                    articles: null,
                    errorMessage: 'Zkontrolujte prosím připojení k internetu.'
                });
            }
        });
    }

    @autobind
    handleSwipe(i) {
        const { articles } = this.state;

        window.scrollTo(0, 0);

        this.setState({
            selectedArticleID: articles[i].id
        });
    }

    @autobind
    handleChangeSave() {
        const savedArticlesIDsRaw = localStorage.getItem('savedArticlesIDs');

        if (savedArticlesIDsRaw) {
            let savedArticlesIDs = JSON.parse(savedArticlesIDsRaw);

            this.setState(prevState => {
                const { selectedArticleID, isSaved: isSaved_prev } = prevState;

                const isSaved = !isSaved_prev;

                if (!savedArticlesIDs) {
                    savedArticlesIDs = [];
                }

                const matchIndex = savedArticlesIDs.findIndex(id => id === selectedArticleID);

                console.log(matchIndex, selectedArticleID, savedArticlesIDs);

                if (matchIndex > -1) {
                    savedArticlesIDs.splice(matchIndex - 1, 1);
                } else {
                    savedArticlesIDs.push(selectedArticleID);
                }

                localStorage.setItem('savedArticlesIDs', JSON.stringify(savedArticlesIDs));

                return {
                    isSaved
                };
            });
        } else {
            const { selectedArticleID } = this.state;

            localStorage.setItem('savedArticlesIDs', JSON.stringify([selectedArticleID]));
        }
    }

    handleRefresh() {
        window.location.reload(true);
    }

    handleRedirection(url) {
        this.props.history.push(url);
    }

    render() {
        const { articles, isSaved, errorMessage } = this.state;

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
                                        <img className="icon" src={isSaved ? StarFilledIcon : StarIcon} alt="" />
                                    </button>

                                    <button className="button reload" type="button" onClick={this.handleRefresh}>
                                        <img className="icon" src={ReloadIcon} alt="" />
                                    </button>
                                </div>
                            </header>

                            <SwipeableViews resistance animateHeight onChangeIndex={this.handleSwipe}>
                                {articles.map(article => (
                                    <Article key={article.title} {...article} />
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
