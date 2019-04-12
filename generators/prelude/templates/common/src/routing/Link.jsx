import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { IWARouterContext } from './Router';

/** A link component similar to the one from react-router except specifically designed
 * for working with IWAs and supporting the style of navigation iwa-router provides.
 */
export default class Link extends PureComponent {
  static propTypes = {
    to: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    app: PropTypes.string,
    tab: PropTypes.string,
    replace: PropTypes.bool,
    data: PropTypes.object,
  }

  static defaultProps = {
    app: undefined,
    tab: undefined,
    replace: false,
    data: undefined,
  };

  onClick = (e, router) => {
    e.preventDefault();
    e.stopPropagation();
    const {
      to, app, tab, replace, data,
    } = this.props;
    const target = router.resolve(to, app);
    router.navigate(target, {
      app, tab, replace, additionalData: data,
    });
  }

  render() {
    return (
      <IWARouterContext.Consumer>
        {(router) => {
          const { children } = this.props;
          return (
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <a onClick={e => this.onClick(e, router)} href="#">{children}</a>
          );
        }}
      </IWARouterContext.Consumer>
    );
  }
}
