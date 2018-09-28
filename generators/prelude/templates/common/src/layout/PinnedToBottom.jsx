import React from 'react';
import PropTypes from 'prop-types';

const PinnedToBottom = (props) => {
  const { children, className } = props;

  return (
    <div className={`bottom-container ${className}`}>
      { children }
    </div>
  );
};

PinnedToBottom.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

PinnedToBottom.defaultProps = {
  className: '',
};

export default PinnedToBottom;
