import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { uuid } from '@/utils/common';
import styles from './style.module.scss';

/**
 * ContentLoader component
 */
export default function ContentLoader(props) {
  const idClip = uuid();
  const idGradient = uuid();

  const {
    color = 'grey',
    duration,
    className,
    height,
    width,
    children,
    noViewBox,
    withoutGradient,
    ...other
  } = props;

  return (
    <svg
      data-component="content-loader"
      viewBox={noViewBox ? null : `0 0 ${width} ${height}`}
      className={classNames(
        'content_loader',
        className,
      )}
      height={noViewBox ? height : null}
      width={noViewBox ? width : null}
      {...other}
    >
      <rect
        style={{ fill: `url(#${idGradient})` }}
        clipPath={`url(#${idClip})`}
        x="0"
        y="0"
        width={width}
        height={height}
      />

      { withoutGradient }

      <defs>
        <clipPath id={idClip}>
          {children}
        </clipPath>

        <linearGradient id={idGradient}>
          <stop offset="0%" className={styles[`content_loader_color_${color}`]}>
            <animate
              attributeName="offset"
              values="-2; 1"
              dur={`${duration}s`}
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="50%" className={styles[`content_loader_color_${color}_flow`]}>
            <animate
              attributeName="offset"
              values="-1.5; 1.5"
              dur={`${duration}s`}
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="100%" className={styles[`content_loader_color_${color}`]}>
            <animate
              attributeName="offset"
              values="-1; 2"
              dur={`${duration}s`}
              repeatCount="indefinite"
            />
          </stop>
        </linearGradient>
      </defs>
    </svg>
  );
}

ContentLoader.propTypes = {
  /**
   * Color from theme
   */
  color: PropTypes.string,
  /**
   * Animation duration
   */
  duration: PropTypes.number,
  /**
   * The CSS class name of the root element
   */
  className: PropTypes.string,
  /**
   * Height of component in px
   */
  height: PropTypes.number,
  /**
   * Width of component in px
   */
  width: PropTypes.number,
  /**
   * The content of the component
   */
  children: PropTypes.node.isRequired,
  noViewBox: PropTypes.bool,
  // react component prop types
  withoutGradient: PropTypes.oneOf([PropTypes.node, PropTypes.arrayOf(PropTypes.node), null]),
};

ContentLoader.defaultProps = {
  color: 'grey',
  duration: 2,
  className: '',
  height: 300,
  width: 300,
  noViewBox: false,
  withoutGradient: null,
};
