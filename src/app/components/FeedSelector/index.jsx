import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { _b, _d, Context } from '@honzachalupa/helpers';
import enumerator from '../../enumerator';
import './style';
import { autobind } from 'core-decorators';

class FeedSelector extends Component {
    static contextType = Context;

    state = {
        availableFeedsGrouped: [],
        feedContainerHeight: 0,
        resizer: _b.onWindowResize(this.handleWindowResize)
    };

    componentDidMount() {
        const { _showLoading } = this.context;

        _showLoading('Stahují se dostupné zdroje.');

        this.getGroupedFeeds();
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
        return name.replace(/ idnes.cz/i, '').replace('.cz', '');
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
        const { availableFeedsGrouped, feedContainerHeight } = this.state;

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
