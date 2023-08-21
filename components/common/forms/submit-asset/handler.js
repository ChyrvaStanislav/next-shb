import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import SubmitAssetForm from './index';

export const SubmitAssetFormContext = createContext({ openForm: false, setOpenForm: () => { } });

const SubmitAssetFormHandler = ({ children, ccList }) => {
  const [open, setOpen] = useState(false);

  return (
    <SubmitAssetFormContext.Provider value={{ openForm: open, setOpenForm: setOpen }}>
      <SubmitAssetForm formId="submit-asset" open={open} setOpen={setOpen} ccList={ccList} />
      {children}
    </SubmitAssetFormContext.Provider>
  );
};

SubmitAssetFormHandler.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.object,
    PropTypes.func,
  ]).isRequired,
  ccList: PropTypes.arrayOf(PropTypes.object)
};

SubmitAssetFormHandler.defaultProps = {
  ccList: []
};

export default SubmitAssetFormHandler;
