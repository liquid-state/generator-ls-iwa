import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createHashHistory } from 'history';
import createApp from '@liquid-state/iwa-core';
import initialise from '@liquid-state/iwa-router';
import Desktop, { middleware } from '@liquid-state/iwa-desktop';
import KeyValuePlugin from '@liquid-state/iwa-keyvalue';
import IdentityPlugin from '@liquid-state/iwa-identity';
import definition from './webapp.json';
import devConfig from './dev-settings';
import configureStore from './redux/store';
import rootSaga from './redux/sagas';
import { Router } from './routing';
import App from './App';

const createDevApp = () => {
  const app = createApp(definition, Desktop.createNoopCommunicator());
  Desktop.injectDefaultMiddleware(app.communicator);
  app.communicator.addOnSendMiddleware(middleware.config(devConfig));
  return app;
};

const instanciateApp = () => {
  const app = process.env.NODE_ENV === 'production'
    ? createApp(definition)
    : createDevApp();
  app.plugin(KeyValuePlugin.configure());
  app.plugin(IdentityPlugin.configure());
  return app;
};

const app = instanciateApp();
// Create a wrapped history implementation which emits events.
const { router, history } = initialise(app, createHashHistory);

// Configure the store, react-router-redux needs history as well.
const { store, runSaga } = configureStore(app, router, history);

runSaga(rootSaga);

const Application = () => (
  <Provider store={store}>
    <Router history={history} router={router}>
      <App />
    </Router>
  </Provider>
);

ReactDOM.render(<Application />, document.getElementById('root'));
