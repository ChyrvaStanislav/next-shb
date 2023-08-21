import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import SuccessScreen from './success-screen';
import Modal from './modal';

const GeneralFormComponent = ({
  successScreenConfig, title, render, open, setOpen, successScreenRenderButton, successScreenClassGA, handleFormOpenCloseWithParams
}) => {
  const [formSent, setFormSent] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open && formSent) {
      setTimeout(() => {
        setFormSent(false);
      }, 1000);
    }
  }, [open]);

  return (
    <div>
      <Modal
        title={title}
        open={open}
        setOpen={setOpen}
        onClose={() => {
          handleFormOpenCloseWithParams();
          setTimeout(() => {
            setFormSent(false);
          }, 500);
        }}
      >
        {
          formSent ? (
            <SuccessScreen
              formType={successScreenConfig?.formType}
              title={successScreenConfig?.title}
              subDescription1={successScreenConfig?.subDescriptionFirst}
              subDescription2={successScreenConfig?.subDescriptionSecond}
              successScreenRenderButton={successScreenRenderButton}
              successScreenClassGA={successScreenClassGA}
              onFormClose={() => {
                setOpen(false);
                handleFormOpenCloseWithParams();
                setTimeout(() => {
                  setFormSent(false);
                }, 500);
              }}
              goToSolutions={true}
            />
          ) : (
            render({
              setOpen, setFormSent, loading, setLoading
            })
          )
        }
      </Modal>
    </div>
  );
};

GeneralFormComponent.propTypes = {
  successScreenConfig: PropTypes.shape({
    formType: PropTypes.string,
    title: PropTypes.string,
    subDescriptionFirst: PropTypes.string,
    subDescriptionSecond: PropTypes.string,
  }),
  title: PropTypes.string,
  render: PropTypes.func,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  successScreenRenderButton: PropTypes.func,
  successScreenClassGA: PropTypes.string,
  handleFormOpenCloseWithParams: PropTypes.func,
};

GeneralFormComponent.defaultProps = {
  title: '',
  render: () => {},
  successScreenConfig: {
    formType: '',
    title: '',
    subDescriptionFirst: '',
    subDescriptionSecond: '',
  },
  successScreenRenderButton: undefined,
  successScreenClassGA: '',
  handleFormOpenCloseWithParams: () => {},
};

export default GeneralFormComponent;
