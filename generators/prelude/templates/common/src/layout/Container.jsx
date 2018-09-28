import React from 'react';
import PropTypes from 'prop-types';
import FixedWidth from './FixedWidth';

const Container = (props) => {
  const {
    children, className, fixed, lg,
  } = props;
  return (
    <div className={`container ${className} ${lg && 'lg'}`}>
      { fixed ? <FixedWidth lg={lg}>{children}</FixedWidth> : children }
    </div>
  );
};

Container.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  fixed: PropTypes.bool,
  lg: PropTypes.bool,
};

Container.defaultProps = {
  children: null,
  className: '',
  fixed: false,
  lg: false,
};

export default Container;
