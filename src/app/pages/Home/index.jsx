import React, { Component } from 'react';
import moment from 'moment';
import './style';
import OrderIcon from 'Icons/order';
import HeartIcon from 'Icons/heart';
import SettingsIcon from 'Icons/settings';
import Layout from 'Layouts/Main';
import FeedSelector from 'Components/FeedSelector';

export default class Page_Home extends Component {
    state = {
        page: {
            title: 'Zdroje',
            actions: [{
                icon: OrderIcon,
                onClick: () => this.handleRedirection('/zdroje/moznosti')
            }, {
                icon: HeartIcon,
                onClick: () => this.handleRedirection('/ulozene-clanky')
            }, {
                icon: SettingsIcon,
                onClick: () => this.handleRedirection('/nastaveni')
            }]
        }
    }

    handleRedirection(url) {
        this.props.history.push(url);
    }

    render() {
        const { page } = this.state;

        return (
            <section>
                <time className="date" dateTime={moment()}>{moment().locale('cs-CZ').format('dddd D.M.')}</time>

                <Layout page={page}>
                    <FeedSelector />
                </Layout>
            </section>
        );
    }
}
