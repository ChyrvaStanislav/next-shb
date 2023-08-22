import React from 'react';
import PropTypes from 'prop-types';
/* eslint-disable max-len, react/jsx-boolean-value */

export default function PaginationArrow(props) {
  const { direction, className } = props;

  return (
    <svg
      style={{
        transform: `rotate(${direction === 'right' ? '0' : '180deg'})`
      }}
      className={className}
      width="8"
      height="12"
      viewBox="0 0 8 12"
      fill="none"
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M-6.16331e-08 1.41L4.59 6L-4.62904e-07 10.59L1.42 12L7.42 6L1.42 6.20702e-08L-6.16331e-08 1.41Z" data-fill fill="#1DA488" />
    </svg>
  );
}

PaginationArrow.propTypes = {
  direction: PropTypes.oneOf(['left', 'right']),
  className: PropTypes.string,
};

PaginationArrow.defaultProps = {
  direction: 'right',
  className: '',
};
