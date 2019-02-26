import React, { Component } from 'react';
import './style';
import Layout from 'Layouts/Main';
import SavedArticles from 'Components/SavedArticles';

export default class Page_SavedArticles extends Component {
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
                    <SavedArticles />
                </Layout>
            </section>
        );
    }
}
