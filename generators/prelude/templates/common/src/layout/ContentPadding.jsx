import React from 'react';
import PropTypes from 'prop-types';

const ContentPadding = ({ children, vertical }) => (
  <div className={`content-padding ${vertical && 'vertical'}`}>
    {children}
  </div>
);

ContentPadding.propTypes = {
  children: PropTypes.node.isRequired,
  vertical: PropTypes.bool,
};

ContentPadding.defaultProps = {
  vertical: true,
};

export default ContentPadding;
