import React from 'react';
import createApp from '@liquid-state/iwa-core';
import { createHashHistory } from 'history';
import definition from './webapp.json';
import { Router } from './routing';

import IndexPage from './pages/Index';

const instanciateApp = () => (
  process.env.NODE_ENV === 'production'
    ? createApp(definition)
    : null
);

/* eslint-disable react/prefer-stateless-function */
export default class App extends React.Component {
  /**
     * This class is where you should compose your apps data providers
     * such as routing, i18n and redux.
     *
     * We have included a minimal version with IWA and routing support.
     */
  render() {
    return (
      <Router app={instanciateApp()} historyFactory={createHashHistory}>
        <IndexPage />
      </Router>
    );
  }
}
