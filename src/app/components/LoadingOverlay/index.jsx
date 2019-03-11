import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './style';
import LoadingCircleImage from 'Icons/accented/loading-circle';
import { Context } from '@honzachalupa/helpers';
import FullScreenMessage from 'Components/FullScreenMessage';

export default props => (
    <Context.Consumer>
        {context => (
            <LoadingOverlay context={context} {...props} />
        )}
    </Context.Consumer>
);

class LoadingOverlay extends Component {
    static propTypes = {
        context: PropTypes.object.isRequired
    };

    state = {
        isLoading: false,
        loadingMessage: '',
        isUnloading: false,
        unloadingTime: 2000
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        const { isLoading, loadingMessage } = nextProps.context;

        if (!isLoading && isLoading !== prevState.isLoading) {
            return {
                isUnloading: true
            };
        } else {
            return {
                isLoading,
                isUnloading: false,
                loadingMessage
            };
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { isUnloading, unloadingTime } = this.state;

        const shouldUnload = isUnloading && isUnloading !== prevState.isUnloading;

        if (shouldUnload) {
            setTimeout(() => {
                this.setState({
                    isLoading: false,
                    isUnloading: false
                });
            }, unloadingTime);
        }
    }

    render() {
        const { isLoading, isUnloading, loadingMessage } = this.state;

        return (
            (isLoading || isUnloading) && (
                <div className={classNames({ 'is-unloading': isUnloading })}>
                    <FullScreenMessage color="white">
                        <img className="progress-indicator" src={LoadingCircleImage} alt="" />
                        <p className="message">{loadingMessage || 'Načítání'}</p>
                    </FullScreenMessage>
                </div>
            )
        );
    }
}
