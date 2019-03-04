import React, { Component } from 'react';
import './style';
import Layout from 'Layouts/SubPage';
import SavedArticles from 'Components/SavedArticles';

export default class Page_SavedArticles extends Component {
    state = {
        page: {
            title: 'Uložené články',
            hasBackButton: true
        }
    }

    render() {
        const { page } = this.state;

        return (
            <section>
                <Layout page={page}>
                    <SavedArticles />
                </Layout>
            </section>
        );
    }
}
