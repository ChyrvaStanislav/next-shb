import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Typography } from '../../../html';
import styles from './styles.module.scss';

const Checkbox = ({
  field,
  form,
  id,
  label,
  disabled,
  needValidate,
  text,
  formId,
  classNameWrapper,
  onChange,
  required,
}) => {
  const { touched, errors } = form;
  const {
    value,
    onChange: onChangeFormik,
    onBlur,
    name,
  } = field;

  useEffect(() => {
    onChange(value);
  }, [value]);

  return (
    <div>
      <section className={styles.row}>
        <label className={classNames(styles.checkboxContainer, classNameWrapper, { [styles.disabled]: disabled })}>
          <input
            id={`${formId}-${id}`}
            data-testid="checkbox"
            type="checkbox"
            value={value}
            checked={value}
            disabled={disabled}
            onChange={(event) => {
              onChangeFormik(event);
              form.setFieldTouched(name, true);
              setTimeout(() => {
                form.validateField(name);
              }, 0);
            }}
            onBlur={onBlur}
            className={styles.checkboxHidden}
            name={name}
          />
          <span
            htmlFor={`${formId}-${id}`}
            className={classNames(styles.checkbox, {
              [styles.checkboxError]: touched[name] && needValidate && errors[name]
            })}
          />
          <span className={classNames(styles.inputLabel, { [styles.required]: required })}>{label}</span>
        </label>
        {text && (
          <Typography
            type="span"
            variant="small_forms"
            className={styles.text}
          >
            {text}
          </Typography>
        )}
      </section>
      {touched[name] && needValidate
        && errors[name] && (
          <Typography
            type="span"
            variant="small_forms"
            className={classNames(styles.error)}
          >
            {errors[name]}
          </Typography>
      )}
    </div>
  );
};


Checkbox.propTypes = {
  field: PropTypes.shape({
    value: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  form: PropTypes.shape({
    touched: PropTypes.object,
    errors: PropTypes.object,
    setFieldTouched: PropTypes.func,
  }).isRequired,
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  needValidate: PropTypes.bool,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  formId: PropTypes.string.isRequired,
  classNameWrapper: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
};

Checkbox.defaultProps = {
  needValidate: false,
  disabled: false,
  text: '',
  label: '',
  classNameWrapper: undefined,
  onChange: () => {},
  required: false,
};

export default Checkbox;
