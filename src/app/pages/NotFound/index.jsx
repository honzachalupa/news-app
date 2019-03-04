import React, { Component } from 'react';
import Layout from 'Layouts/SubPage';

export default class Page_NotFound extends Component {
    state = {
        page: {
            title: 'Stránka nenalezena',
            hasBackButton: true
        }
    }

    render() {
        const { page } = this.state;

        return (
            <section>
                <Layout page={page}>
                    <h1>{page.label}</h1>
                </Layout>
            </section>
        );
    }
}
