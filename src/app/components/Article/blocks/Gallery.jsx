import React, { Component } from 'react';
import { _d } from '@honzachalupa/helpers';
import GalleryItem from './GalleryItem';

export default class Gallery extends Component {
    render() {
        const { images, videos } = this.props;

        return (
            <div>
                {_d.isValid(images) && images.length >= 2 ? (
                    images.slice(1, images.length).map(image => (
                        <GalleryItem key={image.url} {...image} type="image" />
                    ))
                ) : null}

                {_d.isValid(videos) ? (
                    videos.map(video => (
                        <GalleryItem key={video.url} {...video} type="video" />
                    ))
                ) : null}
            </div>
        );
    }
}
