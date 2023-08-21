import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import FieldControl from 'v2_main/components/common/form-components/field-control';

const SelectComponent = (props) => {
  const {
    options,
    field,
    form: { setFieldValue },
    customPlaceholder
  } = props;

  const selectedValue = () => (options ? options.find(option => option.value === field.value) : '');

  return (
    <FieldControl {...props}>
      <div className="react-select">
        <Select
          name={field.name}
          placeholder={customPlaceholder}
          onBlur={field.onBlur}
          onChange={option => setFieldValue(field.name, option.value)}
          options={options}
          value={field.value && selectedValue()}
          classNamePrefix="react-select"
        />
      </div>
    </FieldControl>
  );
};

SelectComponent.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object),
  field: PropTypes.objectOf(PropTypes.any),
  form: PropTypes.objectOf(PropTypes.any),
  customPlaceholder: PropTypes.string
};

SelectComponent.defaultProps = {
  options: [],
  field: {},
  form: {},
  customPlaceholder: ''
};

export default SelectComponent;
