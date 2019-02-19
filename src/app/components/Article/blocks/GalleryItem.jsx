import React, { Component } from 'react';

export default class GalleryItem extends Component {
    render() {
        const { url, description } = this.props;

        return (
            <div>
                <img className="image" src={url} title={description} alt="" />

                {description && (
                    <p className="description">{description}</p>
                )}
            </div>
        );
    }
}
