import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Context } from '@honzachalupa/helpers';
import './style';
import NetworkIcon from 'Icons/network-offline';

class OfflineMessage extends Component {
    static contextType = Context;

    handleRedirection(url) {
        this.props.history.push(url);
    }

    render() {
        const { isOffline } = this.context;

        return isOffline && (
            <div>
                <img className="icon" src={NetworkIcon} alt="" />
                <p className="message">Aplikace je v offline režimu.</p>

                <button className="save-articles-button" onClick={() => this.handleRedirection('/ulozene-clanky')} type="button">Číst uložené články</button>
            </div>
        );
    }
}

export default withRouter(OfflineMessage);
