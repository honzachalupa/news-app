import React, { Component } from 'react';
import OfflineStatusBar from 'Components/OfflineStatusBar';

export default class Layout_Blank extends Component {
    render() {
        const { children: content } = this.props;

        return (
            <div>
                {content}

                <OfflineStatusBar />
            </div>
        );
    }
}
