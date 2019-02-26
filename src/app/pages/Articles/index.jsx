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
import Layout from 'Layouts/Main';
import LoadingScreen from 'Components/LoadingScreen';
import Article from 'Components/Article';
import { autobind } from 'core-decorators';


class Page_Articles extends Component {
    state = {
        page: {
            label: 'Articles'
        },
        articles: [],
        selectedArticle: null,
        isSaved: false,
        errorMessage: null
    }

    componentDidMount() {
        this.getFeed();
        this.checkSaveState();
    }

    componentDidUpdate(prevProps, prevState) {
        const articleChanged = prevState.selectedArticle !== this.state.selectedArticle;

        if (articleChanged) {
            this.checkSaveState();
        }
    }

    checkSaveState() {
        const { selectedArticle } = this.state;

        let savedArticles = localStorage.getItem('savedArticles');

        if (savedArticles && selectedArticle) {
            savedArticles = JSON.parse(savedArticles);

            let matchIndex = -1;
            savedArticles.forEach((article, i) => {
                if (article.id === selectedArticle.id) {
                    matchIndex = i;
                }
            });

            this.setState({
                isSaved: matchIndex > -1
            });
        }
    }

    async getFeed() {
        const { apiGroup, feedId } = this.props.match.params;
        const endpoint = getEndpoint(apiGroup, feedId);

        console.log(endpoint);

        fetch(endpoint).then(async response => {
            const articles = await response.json();

            this.setState({
                articles,
                selectedArticle: articles[0]
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
            selectedArticle: articles[i]
        });
    }

    @autobind
    handleChangeSave() {
        const savedArticlesRaw = localStorage.getItem('savedArticles');

        if (savedArticlesRaw) {
            let savedArticles = JSON.parse(savedArticlesRaw);

            this.setState(prevState => {
                const { selectedArticle, isSaved: isSaved_prev } = prevState;

                const isSaved = !isSaved_prev;

                if (!savedArticles) {
                    savedArticles = [];
                }

                let matchIndex = -1;
                savedArticles.forEach((article, i) => {
                    if (article.id === selectedArticle.id) {
                        matchIndex = i;
                    }
                });

                if (matchIndex > -1) {
                    savedArticles.splice(matchIndex, 1);
                } else {
                    savedArticles.push(selectedArticle);
                }

                localStorage.setItem('savedArticles', JSON.stringify(savedArticles));

                return {
                    isSaved
                };
            });
        } else {
            const { selectedArticle } = this.state;

            localStorage.setItem('savedArticles', JSON.stringify([selectedArticle]));
        }
    }

    handleRefresh() {
        window.location.reload(true);
    }

    handleRedirection(url) {
        this.props.history.push(url);
    }

    render() {
        const { page, articles, isSaved, errorMessage } = this.state;

        return (
            <section>
                <Layout page={page}>
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
