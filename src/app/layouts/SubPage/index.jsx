import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Context } from '@honzachalupa/helpers';
import './style';
import BackIcon from 'Icons/accented/back';
import OfflineStatusBar from 'Components/OfflineStatusBar';

class Layout_SubPage extends Component {
    static contextType = Context;

    handleRedirection(url) {
        this.props.history.push(url);
    }

    render() {
        const { settings } = this.context;
        const { page, children: content } = this.props;
        const { title, actions = [], hasBackButton } = page;

        return (
            <div className={settings.isDarkThemeOn ? 'dark-theme' : 'light-theme'}>
                <header>
                    {hasBackButton && (
                        <button className="back-button" type="button" onClick={() => this.handleRedirection('/')}>
                            <img src={BackIcon} alt="" />
                        </button>
                    )}

                    <h1 className="title">{title}</h1>

                    <div className="actions">
                        {actions.map(action => (
                            <button key={action.icon} className="action" type="button" onClick={action.onClick} data-component="">
                                <img src={action.icon} alt="" />
                            </button>
                        ))}
                    </div>
                </header>

                {content}

                <OfflineStatusBar />
            </div>
        );
    }
}

export default withRouter(Layout_SubPage);
