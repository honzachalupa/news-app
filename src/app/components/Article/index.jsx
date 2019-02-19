import React, { Component } from 'react';
import './style';
import Header from './blocks/Header';
import Text from './blocks/Text';
import Gallery from './blocks/Gallery';

export default class Article extends Component {
    render() {
        const { images, title, date, paragraphs, url, source } = this.props;

        return (
            <article>
                <Header image={images[0]} title={title} source={source} date={date} />

                <Text paragraphs={paragraphs} />
                <Gallery images={images} />

                <footer className="footer">
                    <p className="source">
                        <span className="label">Zdroj:</span>
                        <a className="value" href={url}>{url}</a>
                    </p>
                </footer>
            </article>
        );
    }
}
