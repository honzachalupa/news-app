import React, { Component } from 'react';
import './style';
import Header from './blocks/Header';
import Text from './blocks/Text';
import Gallery from './blocks/Gallery';

export default class Article extends Component {
    render() {
        const { images, videos, title, date, paragraphs, url, feedName } = this.props;

        return (
            <article>
                <Header images={images} title={title} feedName={feedName} date={date} />

                <Text paragraphs={paragraphs} />
                <Gallery images={images} videos={videos} />

                <footer className="footer">
                    <a className="source-button" href={url}>Původní článek</a>
                </footer>
            </article>
        );
    }
}
