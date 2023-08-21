import React from 'react';
import PropTypes from 'prop-types';
import FieldControl from 'v2_main/components/common/form-components/field-control';
import Checkbox from 'v2_main/components/common/form-components/checkbox';

const InputText = props => (
  <FieldControl {...props}>
    <Checkbox {...props} />
  </FieldControl>
);

InputText.propTypes = {
  required: PropTypes.bool,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  form: PropTypes.shape({
    touched: PropTypes.object,
    errors: PropTypes.object
  }).isRequired,
};

InputText.defaultProps = {
  required: false,
  label: '',
  placeholder: '',
  type: 'text',
};

export default InputText;
