import React, { Component } from 'react';
import './style';
import Layout from 'Layouts/Main';
import FeedSelector from 'Components/FeedSelector';

export default class Page_Home extends Component {
    constructor() {
        super();

        this.state = {
            page: {
                label: 'Zpravodajství'
            }
        };
    }

    render() {
        const { page } = this.state;

        return (
            <section>
                <Layout page={page}>
                    <FeedSelector />
                </Layout>
            </section>
        );
    }
}
