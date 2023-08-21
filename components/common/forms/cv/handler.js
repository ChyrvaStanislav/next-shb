import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import { getToken } from 'v2_common/utils/cookieHelper';
import Form from './index';

export const CVFormContext = createContext({ openForm: false, setOpenForm: () => { } });

const CVFormHandler = ({ children, solution }) => {
  const [open, setOpen] = useState(false);
  const { accessToken } = getToken();

  return (
    <CVFormContext.Provider value={{ openForm: open, setOpenForm: setOpen }}>
      <Form
        formId="cv"
        open={open}
        setOpen={setOpen}
        solution={solution}
        mode={accessToken ? 'internal' : 'external'}
      />
      {children}
    </CVFormContext.Provider>
  );
};

CVFormHandler.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.object,
    PropTypes.func,
  ]).isRequired,
  solution: PropTypes.shape({
    name: PropTypes.string,
    cvEmails: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default CVFormHandler;
