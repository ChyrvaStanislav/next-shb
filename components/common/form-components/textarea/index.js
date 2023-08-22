import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import FieldControl from '../field-control';
import removeHTML from '@/utils/removeHTML';
import styles from './styles.module.scss';
import Counter from '../counter';

const Textarea = (props) => {
  const {
    field,
    form: { touched, errors, setFieldValue },
    placeholder,
    type,
    formId,
    classNameWrapper,
    classNameTextarea,
    isCounter,
    maxLength,
  } = props;

  const handleBlur = (event) => {
    field.onBlur(event);
    setFieldValue(field.name, removeHTML(event.target.value), true);
  };

  return (
    <FieldControl {...props}>
      <div className={classNames(styles.textareaWrapper, classNameWrapper, {
        [styles.error]: touched[field.name] && errors[field.name]
      })}
      >
        <textarea
          type={type}
          className={classNames(styles.textarea, classNameTextarea)}
          placeholder={placeholder}
          autoComplete="off"
          maxLength={maxLength}
          {...field}
          id={`${formId}-${field.name}`}
          onBlur={handleBlur}
          data-testid="textarea"
        />

        {isCounter && !!maxLength && <Counter maxLength={maxLength} value={field?.value} />}
      </div>
    </FieldControl>
  );
};

Textarea.propTypes = {
  required: PropTypes.bool,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    onBlur: PropTypes.func,
  }).isRequired,
  form: PropTypes.shape({
    touched: PropTypes.object,
    errors: PropTypes.object,
    setFieldValue: PropTypes.func,
  }).isRequired,
  formId: PropTypes.string.isRequired,
  classNameWrapper: PropTypes.string,
  classNameTextarea: PropTypes.string,
  isCounter: PropTypes.bool,
  maxLength: PropTypes.number,
};

Textarea.defaultProps = {
  required: false,
  label: '',
  placeholder: '',
  type: 'text',
  classNameWrapper: undefined,
  classNameTextarea: undefined,
  isCounter: false,
  maxLength: null,
};

export default Textarea;
