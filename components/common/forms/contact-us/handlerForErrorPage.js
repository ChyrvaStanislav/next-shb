import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import { getToken } from 'v2_common/utils/cookieHelper';
import { Button } from 'v2_main/components/html';
import sortingQueriesConstants from 'v2_common/constants/sortingQueries';
import Form from './index';
import styles from './styles.module.scss';

export const ContuctUsFormContext = createContext({ openForm: false, setOpenForm: () => { } });

const ContactUsFormHandler = ({ children }) => {
  const [open, setOpen] = useState(false);
  const { accessToken } = getToken();

  return (
    <ContuctUsFormContext.Provider value={{ openForm: open, setOpenForm: setOpen }}>
      <Form
        formId="contuct-us-error-page"
        open={open}
        setOpen={setOpen}
        mode={accessToken ? 'internal' : 'external'}
        successScreenRenderButton={() => (
          <Button
            href={`/search?sort=${sortingQueriesConstants.default}`}
            className={styles.btn}
          >
            Go To Solutions
          </Button>
        )}
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
