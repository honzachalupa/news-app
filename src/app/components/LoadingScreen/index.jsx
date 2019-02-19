import React, { Component } from 'react';
import { _d } from '@honzachalupa/helpers';
import LoadingCircleImage from 'Icons/loading-circle';
import './style';

export default class LoadingScreen extends Component {
    render() {
        let { isLoading } = this.props;

        isLoading = !_d.isValid(isLoading) || isLoading;

        return isLoading && (
            <div>
                <div className="content">
                    <img className="progress-indicator" src={LoadingCircleImage} alt="" />
                    <p className="message">Načítání</p>
                </div>
            </div>
        );
    }
}
