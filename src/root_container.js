import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import ReactGA from 'react-ga';

import AppContainer from "./modules/app_container";
ReactGA.initialize("UA-123906240-1");

function logPageView() {
    ReactGA.pageview(window.location.pathname + window.location.search);
}
export default class Root extends Component {
    render() {
        const { store, history } = this.props;
        return (
            <Provider store={store}>
                <ConnectedRouter history={history} onChange={logPageView}>
                    <AppContainer history={history} />
                </ConnectedRouter>
            </Provider>
        );
    }
}

Root.propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};
