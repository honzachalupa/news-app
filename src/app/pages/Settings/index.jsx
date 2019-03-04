import React, { Component } from 'react';
import './style';
import Layout from 'Layouts/SubPage';

export default class Page_Settings extends Component {
    state = {
        page: {
            title: 'Nastavení',
            hasBackButton: true
        }
    }

    render() {
        const { page } = this.state;

        return (
            <section>
                <Layout page={page}>
                    Nastavení
                </Layout>
            </section>
        );
    }
}
