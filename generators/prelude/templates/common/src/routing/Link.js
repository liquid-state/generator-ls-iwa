import React, { PureComponent } from 'react';
import { Link as ReactLink } from 'react-router-dom';
import { IWARouterContext } from './Router';

export default class Link extends PureComponent {
  static propTypes = ReactLink.propTypes;

  static contextType = IWARouterContext;

  render() {
    let {
      props: {
        to,
        ...props
      },
      context,
    } = this;

    if (context) {
      to = context.resolve(to);
    }

    return <ReactLink {...props} to={to} />;
  }
}
