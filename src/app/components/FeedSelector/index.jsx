import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import { _b, _d, Context } from '@honzachalupa/helpers';
import enumerator from '../../enumerator';
import './style';
import { autobind } from 'core-decorators';
import LoadingScreen from 'Components/LoadingScreen';

class FeedSelector extends Component {
    static contextType = Context;

    state = {
        feedContainerHeight: 0,
        resizer: _b.onWindowResize(this.handleWindowResize)
    };

    componentDidMount() {
        this.state.resizer.mount();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.feedContainerHeight === 0) {
            this.handleWindowResize();
        }
    }

    componentWillUnmount() {
        this.state.resizer.unmount();
    }

    cleanFeedName(name) {
        return name.replace(/ idnes.cz/i, '').replace('.cz', '');
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
        const { availableFeeds } = this.context;
        const { feedContainerHeight } = this.state;

        if (_d.isValid(availableFeeds)) {
            const availableFeedsGrouped = this.groupAndOrderFeeds(availableFeeds);
            const groups = Object.keys(availableFeedsGrouped);

            return (
                <div>
                    <time className="date" dateTime={moment()}>{moment().locale('cs-CZ').format('dddd D.M.')}</time>

                    <h2 className="headline">Zdroje</h2>

                    <ul className="feeds">
                        {groups.map(group => (
                            <li key={group} className="group" data-component="">
                                <h2 className="headline">{enumerator[group.toUpperCase()] || group}</h2>

                                <ul className="grid">
                                    {availableFeedsGrouped[group].map(feed => (
                                        <li key={feed.id} className="feed" data-component="" style={{ height: feedContainerHeight }} ref={control => this.feedContainer = control}>
                                            <button onClick={() => this.handleRedirection(`clanky/${group}/${feed.id}`)} type="button">
                                                {feed.image && (
                                                    <img className="icon" src={feed.image.url} alt="" />
                                                )}

                                                {!feed.useImageOnly && (
                                                    <span className="name">
                                                        {this.cleanFeedName(feed.name)}
                                                    </span>
                                                )}
                                            </button>
                                        </li>
                                    ))}
                                </ul>

                                {availableFeedsGrouped[group].length > 1 && (
                                    <button className="all-feeds-button" onClick={() => this.handleRedirection(`clanky/${group}`)} type="button">Všechny články z kategorie</button>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            );
        } else {
            return (
                <LoadingScreen />
            );
        }
    }
}

export default withRouter(FeedSelector);
