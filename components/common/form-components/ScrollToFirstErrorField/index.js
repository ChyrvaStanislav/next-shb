import React, { useEffect, useRef, memo } from 'react';
import { useField, useFormikContext, Field } from 'formik';
import PropTypes from 'prop-types';
import RadioGroup from 'v2_main/components/common/form-components/radio/RadioGroup';

const ScrollToFirstErrorField = ({ radioGroup, ...props }) => {
  const ref = useRef(null);
  const formikContext = useFormikContext();
  const [field, meta] = useField(props);

  useEffect(() => {
    const firstError = Object.keys(formikContext.errors)[0];
    if (formikContext.isSubmitting && firstError === field.name) {
      ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [meta.error, formikContext.isSubmitting]);

  if (radioGroup) {
    return (
      <div ref={ref}>
        <RadioGroup
          {...props}
          form={formikContext}
        />
      </div>
    );
  }

  return (
    <div ref={ref}>
      <Field
        {...props}

      />
    </div>
  );
};

export default memo(ScrollToFirstErrorField);


ScrollToFirstErrorField.propTypes = {
  radioGroup: PropTypes.bool,
};

ScrollToFirstErrorField.defaultProps = {
  radioGroup: false,
};
