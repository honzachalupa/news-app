import React, { Component } from 'react';
import './style';
import Layout from 'Layouts/Main';
import FeedSettings from 'Components/FeedSettings';

export default class Page_FeedsSettings extends Component {
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
                    <FeedSettings />
                </Layout>
            </section>
        );
    }
}
