import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import ReactGA from 'react-ga';

require('./favicon.ico');
import Root from './root_container';
import configureStore, { history } from './data/store/configureStore';
const store = configureStore({});

ReactGA.initialize('UA-123906240-1', { standardImplementation: true });

render(
    <AppContainer>
        <Root store={store} history={history} />
    </AppContainer>,
    document.getElementById('app')
);

if (module.hot) {
    module.hot.accept('./root_container', () => {
        const NewRoot = require('./root_container').default;
        render(
            <AppContainer>
                <NewRoot store={store} history={history} />
            </AppContainer>,
            document.getElementById('app')
        );
    });
}
