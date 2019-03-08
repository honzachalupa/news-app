import React, { Component } from 'react';
import moment from 'moment';
import './style';
import Header from './blocks/Header';
import Text from './blocks/Text';
import Gallery from './blocks/Gallery';
import Footer from './blocks/Footer';

export default class Article extends Component {
    componentDidMount() {
        if (navigator.onLine) {
            this.setLastReadDates();
        }
    }

    setLastReadDates() {
        const { feedId } = this.props;

        const lastReadDatesRaw = localStorage.getItem('lastReadDates');
        const lastReadDates = lastReadDatesRaw ? JSON.parse(lastReadDatesRaw) : {};

        lastReadDates[feedId] = moment();

        localStorage.setItem('lastReadDates', JSON.stringify(lastReadDates));
    }

    render() {
        const { images, videos, title, date, paragraphs, url, feedId, feedName } = this.props;

        return (
            <article>
                <Header images={images} title={title} feedName={feedName} date={date} />

                <Text paragraphs={paragraphs} />
                <Gallery images={images} videos={videos} />
                <Footer url={url} feedId={feedId} />
            </article>
        );
    }
}
