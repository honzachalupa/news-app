import React, { Component } from 'react';

export default class Text extends Component {
    render() {
        const { paragraphs } = this.props;

        return (
            <div>
                {paragraphs.map(text => (
                    <p key={text} className="paragraph" data-component="">{text}</p>
                ))}
            </div>
        );
    }
}
