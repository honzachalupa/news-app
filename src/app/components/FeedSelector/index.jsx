import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import { _b, _d, Context } from '@honzachalupa/helpers';
import { timeoutFetch } from 'Helpers/app';
import { getEndpointUrl } from 'Helpers/api';
import enumerator from '../../enumerator';
import './style';
import { autobind } from 'core-decorators';

class FeedSelector extends Component {
    static contextType = Context;

    state = {
        availableFeedsGrouped: [],
        unreadCounts: {},
        feedContainerHeight: 0,
        resizer: _b.onWindowResize(this.handleWindowResize)
    };

    componentDidMount() {
        const { _showLoading } = this.context;

        _showLoading('Stahují se dostupné zdroje.');

        this.getGroupedFeeds();

        this.getUnreadCount();

        setInterval(() => this.getUnreadCount(), 60000);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.feedContainerHeight === 0) {
            this.handleWindowResize();
        }
    }

    componentWillUnmount() {
        this.state.resizer.unmount();
    }

    getGroupedFeeds() {
        const { availableFeeds, _hideLoading } = this.context;
        const { availableFeedsGrouped } = this.state;

        if (!_d.isValid(availableFeedsGrouped) && _d.isValid(availableFeeds)) {
            const availableFeedsGrouped = this.groupAndOrderFeeds(availableFeeds);

            this.setState({
                availableFeedsGrouped
            });
        }

        _hideLoading();
    }

    groupAndOrderFeeds(feeds = []) {
        const grouped = {};
        const groupsOrderedRaw = localStorage.getItem('groupsOrdered');

        if (groupsOrderedRaw) {
            const groupsOrdered = JSON.parse(groupsOrderedRaw);

            groupsOrdered.forEach(groupId => {
                grouped[groupId] = [];
            });
        }

        feeds.forEach(feed => {
            if (!grouped[feed.groupId]) {
                grouped[feed.groupId] = [];
            }

            grouped[feed.groupId].push(feed);
        });

        return grouped;
    }

    getIcon(imageDefinition) {
        if (imageDefinition) {
            const { url, svg, isInverted } = imageDefinition;

            return svg ? (
                <div className="icon" style={{ width: this.state.feedContainerHeight - 40 }} dangerouslySetInnerHTML={{ __html: svg }} />
            ) : (
                <img className={`icon ${isInverted ? 'inverted' : ''}`} src={url} alt="" />
            );
        } else {
            return null;
        }
    }

    cleanFeedName(name) {
        return name.replace(/\sidnes/i, '').replace('.cz', '');
    }

    getUnreadCount() {
        if (navigator.onLine) {
            const { availableFeeds } = this.context;

            const lastReadDatesRaw = localStorage.getItem('lastReadDates');
            const lastReadDates = lastReadDatesRaw ? JSON.parse(lastReadDatesRaw) : {};

            const unreadCounts = {};
            availableFeeds.forEach(async feed => {
                const articles = await this.getArticles(feed.groupId, feed.id);

                if (Object.keys(lastReadDates).includes(feed.id)) {
                    let count = 0;
                    articles.forEach(article => {
                        if (moment(article.date).diff(moment(lastReadDates[feed.id])) > 0) {
                            count += 1;
                        }
                    });

                    unreadCounts[feed.id] = count;
                } else {
                    unreadCounts[feed.id] = '9+';
                }

                this.setState({
                    unreadCounts
                });
            });
        }
    }

    async getArticles(apiGroup, feedId) {
        return timeoutFetch(fetch(getEndpointUrl(apiGroup, feedId)), 10000).then(async response => response.json());
    }

    @autobind
    handleWindowResize() {
        if (this.feedContainer) {
            this.setState({
                feedContainerHeight: this.feedContainer.offsetWidth
            });
        }
    }

    handleRedirection(url) {
        this.props.history.push(url);
    }

    render() {
        const { availableFeedsGrouped, unreadCounts, feedContainerHeight } = this.state;

        return (
            <div>
                <ul className="feeds">
                    {Object.keys(availableFeedsGrouped).map(groupId => (
                        <li key={groupId} className="group" data-component="">
                            <h2 className="headline">{enumerator[groupId.toUpperCase()] || groupId}</h2>

                            <ul className="grid">
                                {availableFeedsGrouped[groupId].map(feed => (
                                    <li key={feed.id} className="feed" data-component="" style={{ height: feedContainerHeight }} ref={control => this.feedContainer = control}>
                                        <button onClick={() => this.handleRedirection(`clanky/${groupId}/${feed.id}`)} type="button">
                                            {this.getIcon(feed.image)}

                                            {!feed.useImageOnly && (
                                                <span className="name">
                                                    {this.cleanFeedName(feed.name)}
                                                </span>
                                            )}

                                            {parseInt(unreadCounts[feed.id]) > 0 && (
                                                <p className="unread-count">{unreadCounts[feed.id]}</p>
                                            )}
                                        </button>
                                    </li>
                                ))}
                            </ul>

                            {availableFeedsGrouped[groupId].length > 1 && (
                                <button className="all-feeds-button" onClick={() => this.handleRedirection(`clanky/${groupId}`)} type="button">Všechny články z kategorie</button>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default withRouter(FeedSelector);
