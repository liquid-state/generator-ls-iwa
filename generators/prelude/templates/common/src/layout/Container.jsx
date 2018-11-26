import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import FixedWidth from './FixedWidth';

const Container = (props) => {
  const {
    children,
    className,
    fixed,
    noPadding,
    lg,
  } = props;
  return (
    <div className={cn('container', className, { lg, 'no-padding': noPadding })}>
      {fixed ? <FixedWidth lg={lg}>{children}</FixedWidth> : children}
    </div>
  );
};

Container.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  fixed: PropTypes.bool,
  lg: PropTypes.bool,
  noPadding: PropTypes.bool,
};

Container.defaultProps = {
  children: null,
  className: '',
  fixed: false,
  lg: false,
  noPadding: false,
};

export default Container;
