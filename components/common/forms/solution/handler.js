import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { openFormAfterAuth } from 'v2_common/utils/solutions';
import Form from './index';

export const SolutionFormContext = createContext({ openForm: false, setOpenForm: () => { } });

const SolutionFormHandler = ({ children, solution, handleFormOpenClose }) => {
  const [open, setOpen] = useState(false);
  const { search } = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(search);
    if (query.get('form') === 'solution') {
      setOpen(true);
    } else if (!query.get('digest-solution')) {
      setOpen(false);
    }

    openFormAfterAuth(setOpen);
  }, [search]);

  const handleFormOpenCloseWithParams = () => {
    handleFormOpenClose(false, solution?._meta?.deliveryKey);
  };

  return (
    <SolutionFormContext.Provider value={{ openForm: open, setOpenForm: setOpen }}>
      <Form formId="solution" open={open} setOpen={setOpen} solution={solution} handleFormOpenCloseWithParams={handleFormOpenCloseWithParams} />
      {children}
    </SolutionFormContext.Provider>
  );
};

SolutionFormHandler.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.object,
    PropTypes.func,
  ]).isRequired,
  solution: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  handleFormOpenClose: PropTypes.func,
};

SolutionFormHandler.defaultProps = {
  handleFormOpenClose: () => {},
};


export default SolutionFormHandler;
