import React from 'react';
import PropTypes from 'prop-types';

export default function Checkmark({
  color,
  ...other
}) {
  return (
    <svg viewBox="0 0 16 16" {...other}>
      <g fill="none" fillRule="evenodd">
        <path d="M.5.5h15v15H.5z" />
        <path stroke={color} strokeWidth="1" d="M3.033 6.967l4 4 7-7" />
      </g>
    </svg>
  );
}

Checkmark.propTypes = {
  color: PropTypes.string,
};

Checkmark.defaultProps = {
  color: '#202025',
};
