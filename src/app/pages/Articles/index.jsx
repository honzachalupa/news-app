import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';
import { _d } from '@honzachalupa/helpers';
import { getEndpoint } from 'Helpers/api';
import './style';
import BackIcon from 'Icons/back';
import ReloadIcon from 'Icons/reload';
import Layout from 'Layouts/Main';
import LoadingScreen from 'Components/LoadingScreen';
import Article from 'Components/Article';

class Page_Articles extends Component {
    state = {
        page: {
            label: 'Articles'
        },
        feed: {},
        errorMessage: null
    }

    componentDidMount() {
        this.getFeed();
    }

    async getFeed() {
        const { apiGroup, feedId } = this.props.match.params;
        const endpoint = getEndpoint(apiGroup, feedId);

        fetch(endpoint).then(async response => {
            this.setState({
                feed: await response.json()
            });
        }).catch(error => {
            if (navigator.onLine) {
                throw new Error(error);
            } else {
                this.setState({
                    feed: null,
                    errorMessage: 'Zkontrolujte prosím připojení k internetu.'
                });
            }
        });
    }

    scrollTop() {
        window.scrollTo(0, 0);
    }

    handleRefresh() {
        window.location.reload(true);
    }

    handleRedirection(url) {
        this.props.history.push(url);
    }

    render() {
        const { page, feed, errorMessage } = this.state;

        return (
            <section>
                <Layout page={page}>
                    {_d.isValid(feed) ? (
                        <Fragment>
                            <header className="header">
                                <div className="aligned-left">
                                    <button className="button back" type="button" onClick={() => this.handleRedirection('/')}>
                                        <img className="icon" src={BackIcon} alt="" />
                                    </button>
                                </div>

                                <div className="aligned-right">
                                    <button className="button reload" type="button" onClick={() => this.handleRefresh()}>
                                        <img className="icon" src={ReloadIcon} alt="" />
                                    </button>
                                </div>
                            </header>

                            <SwipeableViews resistance animateHeight onChangeIndex={this.scrollTop}>
                                {feed.articles.map(article => (
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
