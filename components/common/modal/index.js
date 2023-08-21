import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

const Modal = ({ children, type, id }) => {
  const el = useRef(document.createElement('div'));
  const modalRoot = document.getElementById(id);
  if (id === 'modal') { modalRoot.setAttribute('type', type); }

  useEffect(() => {
    modalRoot.appendChild(el.current);

    return () => modalRoot.removeChild(el.current);
  }, []);

  return ReactDOM.createPortal(
    children,
    el.current,
  );
};

Modal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func
  ]).isRequired,
  type: PropTypes.string,
  id: PropTypes.string,
};

Modal.defaultProps = {
  type: 'external',
  id: 'modal'
};

export default Modal;
