import React from 'react';
import PropTypes from 'prop-types';

export default function Checked({
  width,
  height,
  color,
  fillOpacity,
  ...other
}) {
  return (
    <svg
      width={`${width}px`}
      height={`${height}px`}
      viewBox="0 0 12 9"
      version="1.1"
      {...other}
    >
      <g id="Final-Desktop" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="-2.0.1-Category-Page---Card-Hover" transform="translate(-172.000000, -451.000000)">
          <g id="Badges-/-Trial-Copy" transform="translate(41.000000, 437.000000)">
            <g id="Tags-/-Badge">
              <g id="Icons-/-Actions-/-Chevron-Down" transform="translate(125.000000, 6.000000)">
                <rect id="bounds" x="0" y="0" width="24" height="24" />
                <polygon
                  id="Path"
                  fillOpacity={fillOpacity}
                  fill={color}
                  fillRule="nonzero"
                  points="7.41 8.858 12 13.448 16.59 8.858 18 10.278 12 16.278 6 10.278"
                />
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

Checked.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string,
  fillOpacity: PropTypes.string,
};

Checked.defaultProps = {
  width: 12,
  height: 9,
  color: '#202025',
  fillOpacity: '0.45',
};
