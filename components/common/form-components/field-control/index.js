import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Typography } from '../../../html';
import styles from './styles.module.scss';

const FieldControl = (props) => {
  const {
    field,
    form: { touched, errors },
    required,
    label,
    children,
    formId,
    className,
    animatedError,
  } = props;

  return (
    <section className={classNames(styles.textareaContainer, className)}>
      {label.length > 1 && (
        <Typography
          type="label"
          variant="small_filters"
          className={classNames(styles.label, {
            [styles.required]: required
          })}
          htmlFor={`${formId}-${field.name}`}
        >
          {label}
        </Typography>
      )}
      {children}
      {touched[field.name]
        && errors[field.name] && (
          <Typography
            type="span"
            variant="small_forms"
            className={classNames(styles.error, {
              [styles.emailError]: field.name === 'email',
              [styles.animatedError]: animatedError,
            })}
          >
            {errors[field.name]}
          </Typography>
      )}
    </section>
  );
};

FieldControl.propTypes = {
  formId: PropTypes.string.isRequired,
  required: PropTypes.bool,
  label: PropTypes.string,
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  form: PropTypes.shape({
    touched: PropTypes.object,
    errors: PropTypes.object
  }).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.object,
    PropTypes.func,
  ]).isRequired,
  className: PropTypes.string,
  animatedError: PropTypes.bool,
};

FieldControl.defaultProps = {
  required: false,
  label: '',
  className: '',
  animatedError: false,
};

export default FieldControl;
