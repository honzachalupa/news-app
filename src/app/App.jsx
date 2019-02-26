/* globals __BASENAME__ */

import '@babel/polyfill';
import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { autobind } from 'core-decorators';
import { _a, Context } from '@honzachalupa/helpers';
import { getAvailableFeeds } from 'Helpers/api';
import config from 'app-config';
import './App.scss';
import Page_Home from 'Pages/Home';
import Page_Articles from 'Pages/Articles';
import Page_FeedsSettings from 'Pages/FeedsSettings';
import Page_SavedArticles from 'Pages/SavedArticles';
import Page_NotFound from 'Pages/NotFound';


class App extends Component {
    state = {
        availableFeeds: [],
        _updateContextProperty: this.updateContextProperty
    }

    async componentDidMount() {
        this.setState({
            availableFeeds: await getAvailableFeeds()
        });

        if (config.caching) {
            _a.initServiceWorker('/sw.js', __BASENAME__);
        }
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
        console.log(this.state.availableFeeds);

        return (
            <Context.Provider value={this.state}>
                <Router basename={__BASENAME__}>
                    <Switch>
                        <Route component={Page_Home} path="/" exact />
                        <Route component={Page_Home} path="/zdroje" exact />
                        <Route component={Page_Home} path="/index.html" />
                        <Route component={Page_Articles} path="/clanky/:apiGroup/:feedId" exact />
                        <Route component={Page_Articles} path="/clanky/:apiGroup" exact />
                        <Route component={Page_FeedsSettings} path="/zdroje/moznosti" exact />
                        <Route component={Page_SavedArticles} path="/ulozene-clanky" exact />
                        <Route component={Page_NotFound} exact />
                    </Switch>
                </Router>
            </Context.Provider>
        );
    }
}

render(<App />, document.querySelector('#app'));
