import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { _d } from '@honzachalupa/helpers';
import './style';

export default class FullScreenMessage extends Component {
    static propTypes = {
        id: PropTypes.string,
        content: PropTypes.string,
        buttonLabel: PropTypes.string,
        buttonEvent: PropTypes.func,
        children: PropTypes.node,
        color: PropTypes.string,
        additionalStyle: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object
        ])
    };

    static defaultProps = {
        id: '',
        content: '',
        buttonLabel: '',
        buttonEvent: () => {},
        children: {},
        color: '',
        additionalStyle: ''
    };

    render() {
        const { id, content, buttonLabel, buttonEvent, children, color, additionalStyle } = this.props;

        if (_d.isValid(children)) {
            return (
                <section id={id} className={classNames(color, additionalStyle)}>
                    <div className="content">{children}</div>
                </section>
            );
        } else {
            return (
                <section id={id} className={classNames(color, additionalStyle)}>
                    <p className="content">{content}</p>

                    <div className="button-container">
                        <button className="button" type="button" onClick={buttonEvent}>{buttonLabel}</button>
                    </div>
                </section>
            );
        }
    }
}
