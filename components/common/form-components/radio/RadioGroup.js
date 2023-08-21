import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ErrorMessage } from 'formik';
import HintIcon from 'v2_main/components/common/form-components/hint-icon';
import RadioInput from 'v2_main/components/common/form-components/radio';
import { Typography } from 'v2_main/components/html';
import styles from './RadioGroup.module.scss';

const RadioGroup = (props) => {
  const {
    data, name, label, selectedNoLabel, toShowNoLabel, required, formId, icon, selectedValue, form, ...otherProps
  } = props;

  return (
    <section className={styles.radioGroupContainer}>
      <div>
        <label
          className={classNames(styles.label, {
            [styles.required]: required
          })}
        >
          {label}
        </label>
        {icon && <HintIcon />}
      </div>
      <div className={styles.radioContainer}>
        {
          data.map(item => (
            <RadioInput
              {...otherProps}
              name={name}
              id={item}
              value={item}
              key={item}
              label={item}
              formId={formId}
              selectedvalue={selectedValue}
              error={form?.errors?.[name] && form?.touched?.[name]}
            />
          ))
        }
      </div>
      {toShowNoLabel && selectedValue === 'No' && (
        <div className={classNames(styles.label, styles.checkedNoLabel)}>
          <div
            className={styles.iconWrapper}
          >
            <div className={styles.icon}>
              !
            </div>
          </div>
          <span>
            {selectedNoLabel}
          </span>
        </div>
      )}
      <Typography
        type="span"
        variant="small_forms"
      >
        <ErrorMessage name={name} component="span" className={styles.error} />
      </Typography>
    </section>
  );
};

RadioGroup.propTypes = {
  formId: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  selectedNoLabel: PropTypes.string,
  required: PropTypes.bool,
  icon: PropTypes.bool,
  selectedValue: PropTypes.string,
  toShowNoLabel: PropTypes.bool,
  form: PropTypes.shape({
    errors: PropTypes.object,
    touched: PropTypes.object,
  })
};

RadioGroup.defaultProps = {
  label: '',
  selectedNoLabel: '',
  required: false,
  icon: false,
  selectedValue: '',
  toShowNoLabel: false,
  form: {
    errors: {},
    touched: {},
  }
};

export default RadioGroup;
