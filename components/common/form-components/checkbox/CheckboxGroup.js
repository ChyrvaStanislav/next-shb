import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { ErrorMessage } from 'formik';
import CheckboxField from 'v2_main/components/common/form-components/checkbox/CheckboxField';
import styles from './CheckboxGroup.module.scss';

const CheckboxGroup = ({
  data, name, label, required, disabled, onChangeSelectPackage, page
}) => (
  <section className={styles.checkboxGroupContainer}>
    <label
      className={classNames(styles.label, {
        [styles.required]: required,
      })}
    >
      {label}
    </label>
    <div className={styles.checkboxContainer}>
      {
        data.map(item => (
          <CheckboxField
            name={name}
            value={item.label}
            key={item.label}
            label={item.label}
            logo={item.logo}
            types={item?.type}
            disabled={disabled}
            onChangeSelectPackage={() => onChangeSelectPackage(item.label)}
            page={page}
          />
        ))
      }
    </div>
    <ErrorMessage name={name} component="span" className={styles.error} />
  </section>
);

CheckboxGroup.propTypes = {
  data: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  onChangeSelectPackage: PropTypes.func,
  page: PropTypes.string,
};

CheckboxGroup.defaultProps = {
  label: '',
  required: false,
  disabled: false,
  onChangeSelectPackage: () => { },
  page: '',
};

export default CheckboxGroup;
