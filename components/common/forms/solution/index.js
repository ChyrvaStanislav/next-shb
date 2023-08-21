import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import FormController from 'v2_main/components/common/form-components';
import { REQUEST_SOLUTION, getConfig } from 'v2_main/components/common/forms/config';
import Form from 'v2_main/components/common/forms/solution/form';

const config = getConfig(REQUEST_SOLUTION);

const SolutionForm = ({
  formId,
  open,
  setOpen,
  solution,
  packageSolutions,
  handleFormOpenCloseWithParams,
}) => {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    if (open) {
      setOpened(true);
    }
  }, [open]);

  // Different classes for "request solution" form and "request package" form
  const gaClasses = {
    solution: 'RequestSolutionSuccessScreenGA',
    packageSolution: 'RequestPackageSuccessScreenGA',
  };

  return (
    <FormController
      open={open}
      setOpen={setOpen}
      title={config.title}
      successScreenConfig={config.successScreenConfig}
      successScreenClassGA={gaClasses[formId]}
      handleFormOpenCloseWithParams={handleFormOpenCloseWithParams}
      render={({
        setOpen: onOpen,
        setFormSent,
        loading,
        setLoading
      }) => (
        opened && (
        <Form
          open={open}
          setOpen={onOpen}
          setFormSent={setFormSent}
          formId={formId}
          solution={solution}
          packageSolutions={packageSolutions}
          loading={loading}
          setLoading={setLoading}
          handleFormOpenCloseWithParams={handleFormOpenCloseWithParams}
        />
        ))}
    />
  );
};

SolutionForm.propTypes = {
  formId: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  solution: PropTypes.shape({}).isRequired,
  packageSolutions: PropTypes.arrayOf(PropTypes.shape({})),
  handleFormOpenCloseWithParams: PropTypes.func,
};

SolutionForm.defaultProps = {
  packageSolutions: undefined,
  handleFormOpenCloseWithParams: null,
};

export default SolutionForm;
