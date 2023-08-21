import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import classNames from 'classnames';
import styles from './RadioInput.module.scss';

const RadioInput = ({
  label,
  id,
  formId,
  error,
  ...other
}) => {
  const radioId = `${formId}-${id}`;

  return (
    <section className={styles.radioInputContainer}>
      <label htmlFor={radioId} className={styles.label}>
        <Field
          type="radio"
          id={radioId}
          checked={other.selectedvalue === label}
          className={styles.input}
          {...other}
        />
        <span className={classNames(styles.radioInput, { [styles.error]: error })} />
        { label }
      </label>
    </section>
  );
};

RadioInput.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  formId: PropTypes.string.isRequired,
  error: PropTypes.bool,
};

RadioInput.defaultProps = {
  label: '',
  id: '',
  error: false,
};

export default RadioInput;
