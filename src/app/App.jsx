/* globals __BASENAME__, __PLATFORM__ */

import '@babel/polyfill';
import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, HashRouter, Route, Switch } from 'react-router-dom';
import { autobind } from 'core-decorators';
import { _a, _d, Context } from '@honzachalupa/helpers';
import { getAvailableFeeds } from 'Helpers/api';
import config from 'app-config';
import './App.scss';
import LoadingOverlay from 'Components/LoadingOverlay';
import Page_Home from 'Pages/Home';
import Page_Articles from 'Pages/Articles';
import Page_FeedOptions from 'Pages/FeedOptions';
import Page_SavedArticles from 'Pages/SavedArticles';
import Page_Settings from 'Pages/Settings';
import Page_NotFound from 'Pages/NotFound';

class App extends Component {
    state = {
        availableFeeds: [],
        isLoading: false,
        loadingMessage: null,
        settings: {
            isDarkThemeOn: false
        },
        _showMessageBox: this.showMessageBox,
        _hideMessageBox: this.hideMessageBox,
        _showLoading: this.showLoading,
        _hideLoading: this.hideLoading,
        _updateContextProperty: this.updateContextProperty
    }

    async componentDidMount() {
        this.setState({
            availableFeeds: await getAvailableFeeds(),
            settings: this.getSettings()
        });

        if (config.caching) {
            _a.initServiceWorker('/sw.js', __BASENAME__);
        }
    }

    getSettings() {
        const settingsRaw = localStorage.getItem('settings');

        return settingsRaw ?
            JSON.parse(settingsRaw) :
            this.state.settings;
    }

    setTheme() {
        const { isDarkThemeOn } = this.state.settings;

        document.body.dataset.theme = isDarkThemeOn ? 'dark' : 'light';
    }

    @autobind
    showMessageBox(message) {
        if (message) {
            this.setState({
                isMessageShown: true,
                messageBoxContent: message
            });
        }
    }

    @autobind
    hideMessageBox() {
        this.setState({
            isMessageShown: false,
            messageBoxContent: null
        });
    }

    @autobind
    showLoading(message = null) {
        this.setState({
            isLoading: true,
            loadingMessage: message
        });
    }

    @autobind
    hideLoading() {
        this.setState({
            isLoading: false,
            loadingMessage: null
        });
    }

    /**
     * Performs an update of the global (App-level) context. Updates only selected item.
     *
     * @param {any} key
     * @param {any} value
     * @memberof App
     */
    @autobind
    updateContextProperty(key, value) {
        this.setState({
            [key]: value
        });
    }

    render() {
        const { isLoading, availableFeeds } = this.state;

        this.setTheme();

        const Router = __PLATFORM__ === 'electron' ? HashRouter : BrowserRouter;

        return (!isLoading && _d.isValid(availableFeeds) ? (
            <Context.Provider value={this.state}>
                <Router basename={__BASENAME__}>
                    <Switch>
                        <Route component={Page_Home} path="/" exact />
                        <Route component={Page_Home} path="/index.html" />
                        <Route component={Page_Home} path="/zdroje" exact />
                        <Route component={Page_Articles} path="/clanky/:apiGroup/:feedId" exact />
                        <Route component={Page_Articles} path="/clanky/:apiGroup" exact />
                        <Route component={Page_FeedOptions} path="/zdroje/moznosti" exact />
                        <Route component={Page_SavedArticles} path="/ulozene-clanky" exact />
                        <Route component={Page_Settings} path="/nastaveni" exact />
                        <Route component={Page_NotFound} exact />
                    </Switch>
                </Router>
            </Context.Provider>
        ) : (
            <LoadingOverlay context={this.state} />
        ));
    }
}

render(<App />, document.querySelector('#app'));
