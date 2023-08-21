import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './CheckboxField.module.scss';

const SimpleCheckbox = ({
  label, className, disabled, ...otherProps
}) => (
  <section className={styles.checkboxContainer}>
    <label className={classNames(styles.label, { [styles.disabled]: disabled })}>
      <input
        type="checkbox"
        className={classNames(styles.input, className, {
          [styles.inputDisabled]: disabled
        })}
        {...otherProps}
        disabled={disabled}
      />
      <span className={classNames(styles.checkboxInput, {
        [styles.checkboxInputDisabled]: disabled
      })}
      />
      {label}
    </label>
  </section>
);

SimpleCheckbox.propTypes = {
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

SimpleCheckbox.defaultProps = {
  className: '',
  disabled: false
};

export default SimpleCheckbox;
