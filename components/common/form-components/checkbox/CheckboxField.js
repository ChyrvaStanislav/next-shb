import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import { Typography } from 'v2_main/components/html';
import SolutionLogo from 'v2_main/components/common/cards/SolutionLogo';
import styles from './CheckboxField.module.scss';

const CheckboxField = ({
  label, logo, name, value, disabled, onChangeSelectPackage, types, page, ...propsOther
}) => (
  <section className={styles.checkboxContainer}>
    <label className={classNames(styles.label, {
      [styles.disabled]: disabled,
      [styles.active]: !disabled
    })}
    >
      <Field name={name}>
        {({ field, form }) => (
          <input
            type="checkbox"
            disabled={disabled}
            {...propsOther}
            checked={field.value?.includes(value)}
            onChange={() => {
              onChangeSelectPackage();
              if (field.value?.includes(value)) {
                const nextValue = field.value?.filter(
                  newValue => newValue !== value
                );
                form.setFieldValue(name, nextValue);
              } else {
                const val = field.value !== undefined ? field.value : [];
                const nextValue = val.concat(value);
                form.setFieldValue(name, nextValue);
              }
            }}
            className={classNames(styles.input, {
              [styles.inputDisabled]: disabled
            })}
          />
        )}
      </Field>
      <span className={classNames(styles.checkboxInput, {
        [styles.checkboxInputDisabled]: disabled
      })}
      />
      {
      (page === 'solution' || logo)
        && (
        <SolutionLogo
          className={styles.solutionIcon}
          types={types}
          logo={logo}
          page={page}
        />
        )}
      <Typography type="h4" className={styles.solutionName}>
        {label}
      </Typography>
    </label>

  </section>
);

CheckboxField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  logo: PropTypes.objectOf(PropTypes.any),
  types: PropTypes.arrayOf(PropTypes.object),
  onChangeSelectPackage: PropTypes.func,
  page: PropTypes.string,
};

CheckboxField.defaultProps = {
  label: '',
  disabled: false,
  logo: null,
  types: [],
  onChangeSelectPackage: () => { },
  page: '',
};

export default CheckboxField;
