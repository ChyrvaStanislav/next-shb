import React from 'react';
import PropTypes from 'prop-types';
/* eslint-disable max-len, react/jsx-boolean-value */

export default function SmallArrow(props) {
  const { direction, ...other } = props;

  return (
    <svg
      style={{
        transform: `rotate(${direction === 'right' ? '0' : '180deg'})`
      }}
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      {...other}
    >
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <rect id="bounds" x="0" y="0" width="24" height="24" />
        <g id="Group" transform="translate(12.000000, 12.000000) scale(-1, 1) rotate(-360.000000) translate(-12.000000, -12.000000) translate(5.000000, 6.000000)" fill="#202025">
          <polygon data-fill id="Path" points="5.70710678 3.55271368e-15 7.12132034 1.41421356 3.829 4.707 13.4142136 4.70710678 13.4142136 6.70710678 3.829 6.707 7.12132034 10 5.70710678 11.4142136 -1.59872116e-13 5.70710678" />
        </g>
      </g>
    </svg>
  );
}

SmallArrow.propTypes = {
  direction: PropTypes.oneOf(['left', 'right']),
};

SmallArrow.defaultProps = {
  direction: 'right',
};
