import React, { Component } from 'react';
import { Context } from '@honzachalupa/helpers';
import './style';

export default class OfflineStatusBar extends Component {
    static contextType = Context;

    render() {
        const { isOffline } = this.context;

        return isOffline && (
            <div>
                <p className="message">Aplikace je v offline režimu.</p>
            </div>
        );
    }
}
