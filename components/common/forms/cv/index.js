import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import FormController from 'v2_main/components/common/form-components';
import { SUBMIT_CV, getConfig } from 'v2_main/components/common/forms/config';
import Form from './form';

const config = getConfig(SUBMIT_CV);

const CVForm = ({
  formId,
  open,
  setOpen,
  solution,
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
      successScreenClassGA="CVFormSuccessScreenGA"

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
          solution={solution}
          loading={loading}
          setLoading={setLoading}
        />
        )
      )}
    />
  );
};

CVForm.propTypes = {
  formId: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  solution: PropTypes.shape({}).isRequired,
};

export default CVForm;
