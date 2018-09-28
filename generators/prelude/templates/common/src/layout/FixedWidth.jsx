import React from 'react';
import PropTypes from 'prop-types';

const FixedWidthContainer = ({ lg, children }) => (
  <div className={`fixed-width-container ${lg && 'lg'}`}>
    {children}
  </div>
);

FixedWidthContainer.propTypes = {
  children: PropTypes.node.isRequired,
  lg: PropTypes.bool,
};

FixedWidthContainer.defaultProps = {
  lg: false,
};

export default FixedWidthContainer;
