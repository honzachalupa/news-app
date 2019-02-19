import React, { Component } from 'react';
import { _d } from '@honzachalupa/helpers';
import HeaderImage from './HeaderImage';

export default class Header extends Component {
    render() {
        const { image, title, date, source } = this.props;

        return _d.isValid(image) ? (
            <header>
                <HeaderImage image={image} />

                <div className="position-helper">
                    <p className="source">{source}</p>
                    <h3 className="title">{title}</h3>
                    <date className="date">{date}</date>
                </div>
            </header>
        ) : (
            <header className="no-image">
                <p className="source">{source}</p>
                <h3 className="title">{title}</h3>
                <date className="date">{date}</date>
            </header>
        );
    }
}
