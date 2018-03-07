import PropTypes from 'prop-types';
import React, { Component } from 'react';
import initialise from '@liquid-state/iwa-router';
import { Router as ReactRouter } from 'react-router-dom';

// It is useful to rule out multiple components per file in general
// However there are definitely some cases like below where it is cleaner
// So we just disable the rule when needed.

/* eslint-disable react/no-multi-comp */
class IWARouter extends Component {
  static childContextTypes = {
    iwaRouter: PropTypes.object,
  }

  static propTypes = {
    app: PropTypes.object.isRequired,
    historyFactory: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]).isRequired,
  }

  constructor(props) {
    super(props);

    const { router, history } = initialise(this.props.app, this.props.historyFactory);
    this.router = router;
    this.history = history;
  }

  getChildContext() {
    return {
      iwaRouter: this.router,
    };
  }

  render() {
    return (
      <ReactRouter history={this.history}>
        {this.props.children}
      </ReactRouter>
    );
  }
}

const Router = ({ app, historyFactory, ...props }) => (
  app
    ? <IWARouter app={app} historyFactory={historyFactory} {...props} />
    : <ReactRouter history={historyFactory()} {...props} />
);
Router.propTypes = {
  historyFactory: PropTypes.func.isRequired,
  app: PropTypes.object,
};
Router.defaultProps = {
  app: null,
};

export default Router;
