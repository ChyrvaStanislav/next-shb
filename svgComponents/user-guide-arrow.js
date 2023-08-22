/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';

const UserGuideArrow = ({ direction }) => {
  if (direction === 'left') {
    return (
      <svg width="9" height="8" viewBox="0 0 9 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M3.80474 7.60947L4.74755 6.66667L2.55267 4.47147L8.94281 4.4714V3.13807L2.55267 3.13814L4.74755 0.942807L3.80474 -1.43051e-06L0 3.80474L3.80474 7.60947Z" fill="white" />
      </svg>
    );
  }

  return (
    <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M5.66194 0.200195L4.71913 1.143L6.91401 3.3382L0.523866 3.33827L0.523866 4.6716L6.91401 4.67153L4.71913 6.86686L5.66194 7.80967L9.46667 4.00493L5.66194 0.200195Z" fill="white" />
    </svg>
  );
};

UserGuideArrow.propTypes = {
  direction: PropTypes.oneOf(['left', 'right'])
};

UserGuideArrow.defaultProps = {
  direction: 'right'
};

export default UserGuideArrow;
