import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import FormController from 'v2_main/components/common/form-components';
import { SUBMIT_ASSET, getConfig } from 'v2_main/components/common/forms/config';
import Form from './form';

const config = getConfig(SUBMIT_ASSET);

const SubmitAssetForm = ({
  formId,
  open,
  setOpen,
  ccList
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
      successScreenClassGA="SubmitAssetSuccessScreenGA"
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
            ccList={ccList}
          />
        )
      )}
    />
  );
};

SubmitAssetForm.propTypes = {
  formId: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  ccList: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default SubmitAssetForm;
