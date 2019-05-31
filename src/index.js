import React from 'react';
import { AppContainer } from 'react-hot-loader';
import { render } from 'react-dom';
// import configStore from './common/configStore';
import store from './common/store';

import routeConfig from './common/routeConfig';
import Root from './Root';

function renderApp(app) {
  render(<AppContainer>{app}</AppContainer>, document.getElementById('root'));
}

renderApp(<Root store={store.getStore()} routeConfig={routeConfig} />);

window.bridge.ipcRenderer.on('redux-action', action => store.getStore().dispatch(action));

// Hot Module Replacement API
/* istanbul ignore if  */
if (module.hot) {
  module.hot.accept('./common/routeConfig', () => {
    const nextRouteConfig = require('./common/routeConfig').default; // eslint-disable-line
    renderApp(<Root store={store.getStore()} routeConfig={nextRouteConfig} />);
  });
  module.hot.accept('./Root', () => {
    const nextRoot = require('./Root').default; // eslint-disable-line
    renderApp(<Root store={store.getStore()} routeConfig={routeConfig} />);
  });
}
