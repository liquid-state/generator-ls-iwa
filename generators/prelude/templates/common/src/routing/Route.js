import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Route as ReactRoute } from 'react-router-dom';

export default class Route extends PureComponent {
  static propTypes = ReactRoute.propTypes;

  static contextTypes = {
    iwaRouter: PropTypes.object,
  }

  render() {
    let {
      path,
      ...props
    } = this.props;
    const { context } = this;

    if (context.iwaRouter) {
      path = context.iwaRouter.resolve(path);
    }

    return <ReactRoute {...props} path={path} />;
  }
}
