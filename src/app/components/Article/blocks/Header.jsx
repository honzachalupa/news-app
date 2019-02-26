import React, { Component, Fragment } from 'react';
import { _d } from '@honzachalupa/helpers';
import HeaderImage from './HeaderImage';
import Date from './Date';

export default class Header extends Component {
    render() {
        const { images, title, date, feedName } = this.props;

        const block = (
            <Fragment>
                <p className="source">{feedName}</p>
                <h3 className="title">{title}</h3>
                <Date date={date} />
            </Fragment>
        );

        return _d.isValid(images) ? (
            <header>
                <HeaderImage image={images[0]} />

                <div className="position-helper">
                    {block}
                </div>
            </header>
        ) : (
            <header className="no-image">
                {block}
            </header>
        );
    }
}
