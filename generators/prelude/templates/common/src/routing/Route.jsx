import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Route as ReactRoute } from 'react-router-dom';
import { IWARouterContext } from './Router';

export default class Route extends PureComponent {
  // Extracted from react-router.
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    component: PropTypes.node,
    exact: PropTypes.bool,
    location: PropTypes.object,
    path: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]),
    render: PropTypes.func,
    sensitive: PropTypes.bool,
    strict: PropTypes.bool,
  };

  static defaultProps = {
    children: undefined,
    component: undefined,
    exact: false,
    location: undefined,
    path: undefined,
    render: undefined,
    sensitive: false,
    strict: false,
  };

  render() {
    return (
      <IWARouterContext.Consumer>
        {(router) => {
          let { path, ...props } = this.props;
          if (router) {
            if (Array.isArray(path)) {
              path = path.map(router.resolve);
            } else {
              path = router.resolve(path);
            }
          }
          return <ReactRoute {...props} path={path} />;
        }}
      </IWARouterContext.Consumer>
    );
  }
}
