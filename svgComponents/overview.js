
import React from 'react';
import PropTypes from 'prop-types';
/* eslint-disable max-len, react/jsx-boolean-value */

export default function OverviewIcon(props) {
  const { fill, ...other } = props;

  return (
    <svg viewBox="0 0 32 32" {...other}>
      <g fill="none" fillRule="evenodd">
        <rect fill={fill} width="32" height="32" rx="2" />
        <path d="M13.192 8.366v6.826H6.364V8.366h6.827M14.556 7H5v9.558h9.558L14.556 7zm12.288 0h-9.556v1.366h9.558L26.844 7zm0 4.096h-9.556v1.366h9.558l-.002-1.366zm0 4.096h-9.556v1.366h9.558l-.002-1.366zm0 4.096H5v1.366h21.844v-1.366zm0 4.096H5v1.366h21.844v-1.366z" fill="#FFF" fillRule="nonzero" />
      </g>
    </svg>
  );
}

OverviewIcon.propTypes = {
  fill: PropTypes.string,
};

OverviewIcon.defaultProps = {
  fill: '#C44441',
};
