import React, { Component } from 'react';
import { _d } from '@honzachalupa/helpers';

export default class HeaderImage extends Component {
    render() {
        const { image } = this.props;

        return _d.isValid(image) && (
            <div className="image" style={{ backgroundImage: `url(${image.url})` }} />
        );
    }
}
