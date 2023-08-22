import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import { getToken } from '@/utils/cookieHelper';
import Form from './index';

export const ContuctUsFormContext = createContext({ openForm: false, setOpenForm: () => { } });

const ContactUsFormHandler = ({ children }) => {
  const [open, setOpen] = useState(false);
  const { accessToken } = getToken();

  return (
    <ContuctUsFormContext.Provider value={{ openForm: open, setOpenForm: setOpen }}>
      <Form
        formId="contuct-us"
        open={open}
        setOpen={setOpen}
        mode={accessToken ? 'internal' : 'external'}
      />
      {children}
    </ContuctUsFormContext.Provider>
  );
};

ContactUsFormHandler.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.object,
    PropTypes.func,
  ]).isRequired,
};

export default ContactUsFormHandler;
