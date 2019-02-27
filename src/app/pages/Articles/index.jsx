import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';
import { _d } from '@honzachalupa/helpers';
import { getEndpoint } from 'Helpers/api';
import './style';
import BackIcon from 'Icons/back';
import StarIcon from 'Icons/star';
import StarFilledIcon from 'Icons/star-filled';
import ReloadIcon from 'Icons/reload';
import Layout from 'Layouts/Blank';
import LoadingScreen from 'Components/LoadingScreen';
import Article from 'Components/Article';
import { autobind } from 'core-decorators';


class Page_Articles extends Component {
    state = {
        articles: [],
        selectedArticleID: null,
        isSaved: false,
        errorMessage: null
    }

    componentDidMount() {
        this.getArticles();
        this.checkSaveState();
    }

    componentDidUpdate(prevProps, prevState) {
        const articleChanged = prevState.selectedArticleID !== this.state.selectedArticleID;

        if (articleChanged) {
            this.checkSaveState();
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
        const { apiGroup, feedId } = this.props.match.params;
        const endpoint = getEndpoint(apiGroup, feedId);

        fetch(endpoint).then(async response => {
            const articles = await response.json();

            this.setState({
                articles,
                selectedArticleID: articles[0].id
            });
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
                        <LoadingScreen />
                    )}
                </Layout>
            </section>
        );
    }
}

export default withRouter(Page_Articles);
