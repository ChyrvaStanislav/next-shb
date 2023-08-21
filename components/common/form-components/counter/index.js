import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './styles.module.scss';

const Counter = (props) => {
  const { value, maxLength, className } = props;

  return useMemo(() => (
    <span className={classNames(styles.counter, className)}>
      {`${value ? value?.length : 0}/${maxLength}`}
    </span>
  ), [value, maxLength]);
};

Counter.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  maxLength: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  className: PropTypes.string,
};

Counter.defaultProps = {
  className: '',
};

export default Counter;
