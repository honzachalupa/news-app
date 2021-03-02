import React, { Component, Fragment } from 'react';
import moment from 'moment';
import SwipeableViews from 'react-swipeable-views';
import { _d, Context } from '@honzachalupa/helpers';
import { timeoutFetch } from 'Helpers/app';
import { getEndpointUrl } from 'Helpers/api';
import './style';
import OrderIcon from 'Icons/black/order';
import HeartIcon from 'Icons/black/heart';
import SettingsIcon from 'Icons/black/settings';
import Layout from 'Layouts/MainPage';
import ArticleTeaser from 'Components/ArticleTeaser';
import FeedSelector from 'Components/FeedSelector';
import OfflineMessage from 'Components/OfflineMessage';
import { autobind } from 'core-decorators';

export default class Page_Home extends Component {
    static contextType = Context;

    state = {
        page: {
            title: 'Zdroje',
            actions: [{
                icon: OrderIcon,
                onClick: () => this.handleRedirection('/zdroje/moznosti')
            }, {
                icon: HeartIcon,
                onClick: () => this.handleRedirection('/ulozene-clanky')
            }, {
                icon: SettingsIcon,
                onClick: () => this.handleRedirection('/nastaveni')
            }]
        },
        articles: []
    }

    componentDidMount() {
        this.getArticles();
    }

    async getArticles() {
        timeoutFetch(fetch(getEndpointUrl(null, null)), 10000).then(async response => {
            const articles = await response.json();

            this.setState({
                articles
            });
        }).catch(() => {
            this.setState({
                articles: []
            });
        });
    }

    @autobind
    handleSwipe(index) {
        const { _updateContextProperty } = this.context;

        _updateContextProperty('teaserLastIndex', index);
    }

    handleRedirection(url) {
        this.props.history.push(url);
    }

    render() {
        const { teaserLastIndex, isOffline } = this.context;
        const { page, articles } = this.state;

        return (
            <section>
                <time className="date" dateTime={moment()}>{moment().locale('cs-CZ').format('dddd D.M.')}</time>

                <Layout page={page}>
                    {!isOffline ? (
                        <Fragment>
                            <div className="latest-articles">
                                <SwipeableViews index={teaserLastIndex} resistance onChangeIndex={this.handleSwipe}>
                                    {articles.filter(article => _d.isValid(article.images)).map(article => (
                                        <ArticleTeaser key={article.title} {...article} />
                                    ))}
                                </SwipeableViews>
                            </div>

                            <FeedSelector />
                        </Fragment>
                    ) : (
                        <OfflineMessage />
                    )}
                </Layout>
            </section>
        );
    }
}
