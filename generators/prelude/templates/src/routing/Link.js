import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Link as ReactLink } from 'react-router-dom';

export default class Link extends PureComponent {
  static contextTypes = {
    iwaRouter: PropTypes.object,
  }

  static propTypes = ReactLink.propTypes

  render() {
    let {
      to,
      ...props
    } = this.props;

    if (this.context.iwaRouter) {
      to = this.context.iwaRouter.resolve(this.props.to);
    }

    return <ReactLink {...props} to={to} />;
  }
}
