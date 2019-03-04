import React, { Component } from 'react';
import './style';
import Layout from 'Layouts/SubPage';
import FeedOptions from 'Components/FeedOptions';

export default class Page_FeedOptions extends Component {
    state = {
        page: {
            title: 'Možnosti zdrojů',
            hasBackButton: true
        }
    }

    render() {
        const { page } = this.state;

        return (
            <section>
                <Layout page={page}>
                    <FeedOptions />
                </Layout>
            </section>
        );
    }
}
