import React, { Component } from 'react';

export default class Layout_Blank extends Component {
    render() {
        const { children: content } = this.props;

        return (
            <div>
                {content}
            </div>
        );
    }
}
