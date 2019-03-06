import React, { Component } from 'react';
import { Context } from '@honzachalupa/helpers';

export default class Footer extends Component {
    static contextType = Context;

    getIcon(imageDefinition) {
        if (imageDefinition) {
            const { url, svg, isInverted } = imageDefinition;

            return svg ? (
                <div className="icon" dangerouslySetInnerHTML={{ __html: svg }} />
            ) : (
                <img className={`icon ${isInverted ? 'inverted' : ''}`} src={url} alt="" />
            );
        } else {
            return null;
        }
    }

    render() {
        const { availableFeeds } = this.context;
        const { url, feedId } = this.props;

        const feed = availableFeeds.find(feed => feed.id === feedId);

        return (
            <footer className="footer">
                {this.getIcon(feed.image)}

                <a className="source-button" href={url}>Původní článek</a>
            </footer>
        );
    }
}
