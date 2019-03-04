import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { _d, Context } from '@honzachalupa/helpers';
import enumerator from '../../enumerator';
import './style';
import ArrowUpIcon from 'Icons/arrow-up';
import ArrowDownIcon from 'Icons/arrow-down';
// import HeartIcon from 'Icons/heart';
import LoadingOverlay from 'Components/LoadingOverlay';

class FeedOptions extends Component {
    static contextType = Context;

    state = {
        availableFeedsGrouped: {},
        groups: []
    };

    componentDidMount() {
        this.prepareFeeds();
    }

    componentDidUpdate(prevProps, prevState) {
        if (!_d.isValid(prevState.availableFeedsGrouped)) {
            this.prepareFeeds();
        }
    }

    prepareFeeds() {
        const { availableFeeds } = this.context;

        if (_d.isValid(availableFeeds)) {
            const availableFeedsGrouped = this.groupAndOrderFeeds(availableFeeds);

            this.setState({
                availableFeedsGrouped,
                groups: Object.keys(availableFeedsGrouped)
            });
        }
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

    handleMove(group, direction) {
        const { groups } = this.state;

        const index = groups.indexOf(group);

        groups.splice(index, 1);
        groups.splice(index + direction, 0, group);

        this.setState({
            groups
        });

        localStorage.setItem('groupsOrdered', JSON.stringify(groups));
    }

    handleToggleFavorite() {

    }

    handleRedirection(url) {
        this.props.history.push(url);
    }

    render() {
        const { availableFeedsGrouped, groups } = this.state;

        if (_d.isValid(availableFeedsGrouped)) {
            return (
                <div>
                    <ul className="feeds">
                        {groups.map((group, i) => (
                            <li key={group} className="group" data-component="">
                                <header>
                                    <h2 className="headline">{enumerator[group.toUpperCase()] || group}</h2>

                                    <div className="actions">
                                        {i > 0 && (
                                            <button onClick={() => this.handleMove(group, -1)} type="button">
                                                <img className="icon" src={ArrowUpIcon} alt="" />
                                            </button>
                                        )}
                                        {i !== groups.length - 1 && (
                                            <button onClick={() => this.handleMove(group, 1)} type="button">
                                                <img className="icon" src={ArrowDownIcon} alt="" />
                                            </button>
                                        )}
                                    </div>
                                </header>

                                <ul className="list">
                                    {availableFeedsGrouped[group].map(feed => (
                                        <li key={feed.id} className="feed" data-component="">
                                            <p className="name">{feed.name}</p>

                                            {/* <button className="favorite-button" onClick={this.handleToggleFavorite} type="button">
                                                <img className="icon" src={HeartIcon} alt="" />
                                            </button> */}
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>
            );
        } else {
            return (
                <LoadingOverlay />
            );
        }
    }
}

export default withRouter(FeedOptions);
