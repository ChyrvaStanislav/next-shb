import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Textarea from './index';
import SimpleCheckbox from '../checkbox/SimpleCheckbox';
import styles from './styles.module.scss';

const HiddenTextarea = (props) => {
  const [open, setOpen] = useState(false);
  const { disabled } = props;

  return (
    <section className={styles.hiddenTextareaWrapper}>
      <div className={styles.checkboxWrapper}>
        <SimpleCheckbox
          label="Other Services"
          onClick={() => !disabled && setOpen(!open)}
          disabled={disabled}
        />
      </div>
      {open && !disabled && <Textarea {...props} />}
    </section>
  );
};

HiddenTextarea.propTypes = {
  disabled: PropTypes.bool
};

HiddenTextarea.defaultProps = {
  disabled: false
};

export default HiddenTextarea;
