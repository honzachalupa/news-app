import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './style';
import BackIcon from 'Icons/back';

class Layout_Main extends Component {
    handleRedirection(url) {
        this.props.history.push(url);
    }

    render() {
        const { page, children: content } = this.props;
        const { title, actions = [], hasBackButton } = page;

        return (
            <div>
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
            </div>
        );
    }
}

export default withRouter(Layout_Main);
