import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import FieldControl from 'v2_main/components/common/form-components/field-control';
import CountrySelect from 'v2_main/components/common/form-components/country-select';
import styles from './styles.module.scss';

const CountrySelectGroup = (props) => {
  const {
    field,
    form: { touched, errors },
  } = props;

  return (
    <FieldControl {...props}>
      <div className={classNames(styles.inputWrapper, {
        [styles.error]: touched[field.name] && errors[field.name]
      })}
      >
        <CountrySelect field={field} id={field.name} />
      </div>
    </FieldControl>
  );
};

CountrySelectGroup.propTypes = {
  required: PropTypes.bool,
  label: PropTypes.string,
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  form: PropTypes.shape({
    touched: PropTypes.object,
    errors: PropTypes.object
  }).isRequired,
};

CountrySelectGroup.defaultProps = {
  required: false,
  label: '',
};

export default CountrySelectGroup;
