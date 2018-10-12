import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Link as ReactLink } from 'react-router-dom';

export default class Link extends PureComponent {
  static propTypes = ReactLink.propTypes;

  static contextTypes = {
    iwaRouter: PropTypes.object,
  }

  render() {
    let {
      to,
      ...props
    } = this.props;
    const { context } = this;

    if (context.iwaRouter) {
      to = context.iwaRouter.resolve(props.to);
    }

    return <ReactLink {...props} to={to} />;
  }
}
