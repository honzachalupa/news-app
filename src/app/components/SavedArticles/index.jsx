import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { _d } from '@honzachalupa/helpers';
import './style';

class SavedArticles extends Component {
    state = {
        savedTitles: []
    };

    componentDidMount() {
        let savedTitles = localStorage.getItem('savedTitles');

        if (savedTitles) {
            savedTitles = JSON.parse(savedTitles);

            this.setState({
                savedTitles
            });
        }
    }

    handleRedirection(url) {
        this.props.history.push(url);
    }

    render() {
        const { savedTitles } = this.state;

        return _d.isValid(savedTitles) ? (
            <div>
                {savedTitles.map(title => (
                    <p>{title}</p>
                ))}
            </div>
        ) : null;
    }
}

export default withRouter(SavedArticles);
