import React from 'react';
import PropTypes from 'prop-types';
/* eslint-disable max-len, react/jsx-boolean-value */

export default function Arrow(props) {
  const { direction, ...other } = props;

  return (
    <svg
      style={{
        transform: `rotate(${direction === 'right' ? '0' : '180deg'})`
      }}
      viewBox="0 0 24 24"
      {...other}
    >
      <g fill="none" fillRule="evenodd">
        <path d="M0 0h24v24H0z" />
        <path data-fill fillRule="nonzero" d="M4 11v2h12l-5.5 5.5 1.42 1.42L19.84 12l-7.92-7.92L10.5 5.5 16 11z" />
      </g>
    </svg>
  );
}

Arrow.propTypes = {
  direction: PropTypes.oneOf(['left', 'right']),
};

Arrow.defaultProps = {
  direction: 'right',
};
