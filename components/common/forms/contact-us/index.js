import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import FormController from '../../form-components';
import { CONTACT_US, getConfig } from '../config';
import Form from './form';

const config = getConfig(CONTACT_US);

const ContactUsForm = ({
  formId,
  open,
  setOpen,
  mode,
  successScreenRenderButton,
}) => {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    if (open) {
      setOpened(true);
    }
  }, [open]);

  return (
    <FormController
      open={open}
      setOpen={setOpen}
      title={config.title}
      successScreenConfig={config.successScreenConfig}
      successScreenRenderButton={successScreenRenderButton}
      successScreenClassGA="ContactUsSuccessScreenGA"
      render={({
        setOpen: onOpen,
        setFormSent,
        loading,
        setLoading
      }) => (
        opened && (
          <Form
            setOpen={onOpen}
            setFormSent={setFormSent}
            formId={formId}
            loading={loading}
            setLoading={setLoading}
            mode={mode}
          />
        )
      )}
    />
  );
};

ContactUsForm.propTypes = {
  formId: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  mode: PropTypes.oneOf(['internal', 'external']),
  successScreenRenderButton: PropTypes.func,
};

ContactUsForm.defaultProps = {
  mode: 'external',
  successScreenRenderButton: undefined,
};

export default ContactUsForm;
