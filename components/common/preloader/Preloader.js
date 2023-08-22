import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Preloader.module.scss';

export default function Preloader({ color, className, size }) {
  return (
    <div
      className={classNames(styles.container, styles[`${size}`], className)}
    >
      <div className={classNames(styles.circle, styles[`${color}`])} />
      <div className={classNames(styles.circle, styles[`${color}`])} />
      <div className={classNames(styles.circle, styles[`${color}`])} />
    </div>
  );
}

Preloader.propTypes = {
  color: PropTypes.oneOf(['white', 'green', 'grey']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  className: PropTypes.string,
};

Preloader.defaultProps = {
  color: 'white',
  size: 'large',
  className: '',
};
