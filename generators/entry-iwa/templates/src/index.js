import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createHashHistory } from 'history';
import { I18nextProvider } from 'react-i18next';
import createApp from '@liquid-state/iwa-core';
import initialise from '@liquid-state/iwa-router';
import Desktop, { middleware } from '@liquid-state/iwa-desktop';
import KeyValuePlugin from '@liquid-state/iwa-keyvalue';
import IdentityPlugin from '@liquid-state/iwa-identity';
import UbiquityPlugin from '@liquid-state/ubiquity-client/dist/plugin';
import {
  DevTools,
  Router,
  Settings,
  initialisation
} from '@project/common';

import definition from './webapp.json';
import configureStore from './redux/store';
import rootSaga from './redux/sagas';
import initialiseI18N from './i18n';

import Index from './pages';

const createDevApp = () => {
  const app = createApp(definition, Desktop.createNoopCommunicator());
  Desktop.injectDefaultMiddleware(app.communicator);
  app.communicator.addOnSendMiddleware(middleware.config(Settings));
  return app;
};

const instanciateApp = () => {
  const app = process.env.NODE_ENV === 'production'
    ? createApp(definition)
    : createDevApp();
  app.plugin(KeyValuePlugin.configure());
  app.plugin(IdentityPlugin.configure());
  app.plugin(UbiquityPlugin.configure());
  return app;
};

const app = instanciateApp();
// Create a wrapped history implementation which emits events.
const { router, history } = initialise(app, createHashHistory);

// Configure the store, react-router-redux needs history as well.
const { store, runSaga } = configureStore(app, router, history);
const i18n = initialiseI18N();

const Application = () => (
  <Provider store={store}>
    <Fragment>
      <Router history={history} router={router}>
        <I18nextProvider i18n={i18n}>
          <Index />
        </I18nextProvider>
      </Router>
      { Settings.REDUX_DEBUG && Settings.REDUX_INLINE ? <DevTools /> : null }
    </Fragment>
  </Provider>
);

initialisation.sendSetReadyAndWait(app).then(() => {
  runSaga(rootSaga);
  ReactDOM.render(<Application />, document.getElementById('root'));
});
