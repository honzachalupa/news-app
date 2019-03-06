import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './style';
import Header from '../Article/blocks/Header';

class ArticleTeaser extends Component {
    handleRedirection(url) {
        this.props.history.push(url);
    }

    render() {
        const { images, title, date, groupId, feedId, feedName } = this.props;

        return (
            <article onClick={() => this.handleRedirection(`clanky/${groupId}/${feedId}`)}>
                <Header images={images} title={title} feedName={feedName} date={date} />
            </article>
        );
    }
}

export default withRouter(ArticleTeaser);
