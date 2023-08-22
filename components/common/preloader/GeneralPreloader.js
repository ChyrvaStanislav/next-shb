import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Preloader from './Preloader';
import styles from './Preloader.module.scss';

export default function GeneralPreloader(props) {
  const { fit, ...other } = props;

  return (
    <div className={classNames(styles.general, { [styles.fixed]: !fit, [styles.fit]: fit })}>
      <Preloader {...other} />
    </div>
  );
}

GeneralPreloader.propTypes = {
  fit: PropTypes.bool,
};

GeneralPreloader.defaultProps = {
  fit: false,
};
