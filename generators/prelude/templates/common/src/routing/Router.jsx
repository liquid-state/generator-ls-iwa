import PropTypes from 'prop-types';
import React from 'react';
import { Router as ReactRouter } from 'react-router';

export const IWARouterContext = React.createContext(null);

const Router = ({ history, router, children }) => (
  <IWARouterContext.Provider value={router}>
    <ReactRouter history={history}>
      {children}
    </ReactRouter>
  </IWARouterContext.Provider>
);

Router.propTypes = {
  history: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};


export default Router;
