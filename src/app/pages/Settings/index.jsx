import React, { Component } from 'react';
import Switch from 'react-ios-switch';
import { Context } from '@honzachalupa/helpers';
import './style';
import Layout from 'Layouts/SubPage';

export default class Page_Settings extends Component {
    static contextType = Context;

    state = {
        page: {
            title: 'Nastavení',
            hasBackButton: true
        },
        settings: this.context.settings
    }

    handleToggle(varName) {
        this.setState(prevState => {
            const settings = prevState.settings;

            settings[varName] = !settings[varName];

            this.saveChanges();

            return {
                settings
            };
        });
    }

    saveChanges() {
        const { _updateContextProperty } = this.context;
        const { settings } = this.state;

        _updateContextProperty('settings', settings);

        localStorage.setItem('settings', JSON.stringify(settings));
    }

    render() {
        const { page, settings } = this.state;

        return (
            <section>
                <Layout page={page}>
                    <div className="controls">
                        <div className="control">
                            <p className="label">Tmavý vzhled</p>
                            <Switch checked={settings.isDarkThemeOn} onChange={() => this.handleToggle('isDarkThemeOn')} />
                        </div>
                    </div>
                </Layout>
            </section>
        );
    }
}
