import React, { useEffect, useRef } from 'react';
import isEmpty from 'lodash.isempty';
import PropTypes from 'prop-types';
import ReCAPTCHA from 'react-google-recaptcha';
import FieldControl from '../field-control';

const Recaptcha = (props) => {
  const { field, form, recaptchaReload } = props;
  const { setFieldValue } = form;
  const { name, value } = field;
  const recaptchaRef = useRef(null);

  useEffect(() => {
    if (isEmpty(value) && !isEmpty(recaptchaRef.current?.getValue())) {
      recaptchaRef.current?.reset();
    }
  }, [value]);

  useEffect(() => {
    recaptchaRef.current?.reset();
  }, [recaptchaReload]);

  return (
    <FieldControl {...props}>
      <ReCAPTCHA
        render="explicit"
        ref={recaptchaRef}
        onChange={response => setFieldValue(name, response)}
        onExpired={() => setFieldValue(name, '')}
        sitekey={process.env.RECAPTCHA_KEY}
        data-testid="recaptcha"
      />
    </FieldControl>
  );
};

Recaptcha.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }).isRequired,
  form: PropTypes.shape({
    touched: PropTypes.object,
    errors: PropTypes.object,
    setFieldValue: PropTypes.func,
  }).isRequired,
  recaptchaReload: PropTypes.bool,
};

Recaptcha.defaultProps = {
  recaptchaReload: false,
};

export default Recaptcha;
