import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { _d, Context } from '@honzachalupa/helpers';
import enumerator from '../../enumerator';
import './style';

class FeedSelector extends Component {
    static contextType = Context;

    handleRedirection(url) {
        this.props.history.push(url);
    }

    render() {
        const { availableEndpoints } = this.context;

        const groups = Object.keys(availableEndpoints);

        if (_d.isValid(availableEndpoints)) {
            return (
                <ul>
                    {groups.map(group => (
                        <li key={group} className="group" data-component="">
                            <h2>{enumerator[group.toUpperCase()]}</h2>

                            <ul className="grid">
                                <li className="feed">
                                    <button onClick={() => this.handleRedirection(`articles/${group}`)} type="button">Vše</button>
                                </li>

                                {availableEndpoints[group].map(feed => (
                                    <li key={feed.id} className="feed" data-component="">
                                        <button onClick={() => this.handleRedirection(`articles/${group}/${feed.id}`)} type="button">{feed.name}</button>
                                        <p>{feed.description}</p>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            );
        } else {
            return null;
        }
    }
}

export default withRouter(FeedSelector);
