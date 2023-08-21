import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import FieldControl from '../field-control';
import removeHTML from '../../../../../v2_common/utils/removeHTML';
import Counter from '../counter';
import styles from './styles.module.scss';

const InputText = (props) => {
  const {
    field,
    form: { touched, errors, setFieldValue },
    placeholder,
    type,
    formId,
    disabled,
    classNameWrapper,
    customChange,
    inputMode,
    isCounter,
    maxLength,
  } = props;

  const handleBlur = (event) => {
    field.onBlur(event);
    setFieldValue(field.name, removeHTML(event.target.value), true);
  };

  const handleChange = (event) => {
    field.onChange(event);
    const setFieldValueWithName = setFieldValue.bind(null, field.name);
    if (customChange) {
      customChange(event.target.value, setFieldValueWithName);
    }
  };

  return (
    <FieldControl {...props}>
      <div className={classNames(styles.inputWrapper, classNameWrapper, {
        [styles.error]: touched[field.name] && errors[field.name],
      })}
      >
        <input
          type={type}
          inputMode={inputMode}
          className={classNames(styles.input, {
            [styles.disabled]: disabled,
          })}
          placeholder={placeholder}
          autoComplete="off"
          {...field}
          id={`${formId}-${field.name}`}
          disabled={disabled}
          onBlur={handleBlur}
          onChange={handleChange}
          data-testid="input-text"
        />
      </div>

      {isCounter && !!maxLength && <Counter maxLength={maxLength} value={field?.value} />}
    </FieldControl>
  );
};

InputText.propTypes = {
  required: PropTypes.bool,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
  }).isRequired,
  form: PropTypes.shape({
    touched: PropTypes.object,
    errors: PropTypes.object,
    setFieldValue: PropTypes.func,
  }).isRequired,
  formId: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  classNameWrapper: PropTypes.string,
  customChange: PropTypes.func,
  inputMode: PropTypes.string,
  isCounter: PropTypes.bool,
};

InputText.defaultProps = {
  required: false,
  label: '',
  placeholder: '',
  type: 'text',
  disabled: false,
  classNameWrapper: undefined,
  customChange: null,
  inputMode: null,
  isCounter: false,
};

export default InputText;
