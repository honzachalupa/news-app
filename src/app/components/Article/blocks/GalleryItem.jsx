import React, { Component } from 'react';

export default class GalleryItem extends Component {
    render() {
        const { url, description, type } = this.props;

        return type === 'image' ? (
            <div>
                <img className="image" src={url} title={description} alt="" />

                {description && (
                    <p className="description">{description}</p>
                )}
            </div>
        ) : (
            <iframe src={url} title={url} />
        );
    }
}
