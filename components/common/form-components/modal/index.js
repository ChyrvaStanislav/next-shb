/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import { enableBody, disableBody } from './utils';
import styles from './styles.module.scss';
// import './animation.scss';

const Modal = ({
  children, open, setOpen, onClose
}) => {
  useEffect(() => {
    if (open) {
      disableBody();
    }

    return () => enableBody();
  }, [open]);

  const handleClose = ({ target, currentTarget }) => {
    if (target === currentTarget) {
      setOpen(false);
      onClose();
      enableBody();
    }
  };

  return (
    <CSSTransition in={open} timeout={500} classNames="modal">
      <section
        className={cn(styles.componentContainer, {
          [styles.close]: !open
        })}
        onMouseDown={handleClose}
        data-testid="section"
      >
        <div
          className={cn(styles.slider, {
            [styles.open]: open
          })}
        >
          {children}
        </div>
      </section>
    </CSSTransition>
  );
};

Modal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.object,
    PropTypes.func,
  ]).isRequired,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  onClose: PropTypes.func,
};

Modal.defaultProps = {
  open: false,
  setOpen: () => { },
  onClose: () => { },
};

export default Modal;
