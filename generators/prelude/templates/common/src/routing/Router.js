import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { ConnectedRouter as ReactRouter } from 'react-router-redux';

class Router extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
  };

  static childContextTypes = {
    iwaRouter: PropTypes.object,
  };

  getChildContext() {
    const { router } = this.props;
    return {
      iwaRouter: router,
    };
  }

  render() {
    const { children, history } = this.props;
    return (
      <ReactRouter history={history}>
        {children}
      </ReactRouter>
    );
  }
}

export default Router;
