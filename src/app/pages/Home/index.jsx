import React, { Component } from 'react';
import moment from 'moment';
import SwipeableViews from 'react-swipeable-views';
import { _d } from '@honzachalupa/helpers';
import { timeoutFetch } from 'Helpers/app';
import { getEndpointUrl } from 'Helpers/api';
import './style';
import OrderIcon from 'Icons/order';
import HeartIcon from 'Icons/heart';
import SettingsIcon from 'Icons/settings';
import Layout from 'Layouts/MainPage';
import ArticleTeaser from 'Components/ArticleTeaser';
import FeedSelector from 'Components/FeedSelector';

export default class Page_Home extends Component {
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

    handleRedirection(url) {
        this.props.history.push(url);
    }

    render() {
        const { page, articles } = this.state;

        return (
            <section>
                <time className="date" dateTime={moment()}>{moment().locale('cs-CZ').format('dddd D.M.')}</time>

                <Layout page={page}>
                    <div className="latest-articles">
                        <SwipeableViews resistance>
                            {articles.filter(article => _d.isValid(article.images)).map(article => (
                                <ArticleTeaser key={article.title} {...article} />
                            ))}
                        </SwipeableViews>
                    </div>

                    <FeedSelector />
                </Layout>
            </section>
        );
    }
}
