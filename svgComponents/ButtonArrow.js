import React from 'react';
import PropTypes from 'prop-types';
/* eslint-disable max-len, react/jsx-boolean-value */

export default function ButtonArrow(props) {
  const { direction, ...other } = props;

  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      width={20}
      height={20}
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transform: `rotate(${direction === 'right' ? '0' : '180deg'})`
      }}
      {...other}
    >
      <g clipPath="url(#clip0_846_3520)">
        <path fillRule="evenodd" clipRule="evenodd" d="M10.8276 5.25L9.64906 6.42851L12.3927 9.1725L4.40499 9.17259V10.8393L12.3927 10.8392L9.64906 13.5833L10.8276 14.7618L15.5835 10.0059L10.8276 5.25Z" fill="#1DA488" />
      </g>
      <defs>
        <clipPath id="clip0_846_3520">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>

  );
}

ButtonArrow.propTypes = {
  direction: PropTypes.oneOf(['left', 'right']),
};

ButtonArrow.defaultProps = {
  direction: 'right',
};
