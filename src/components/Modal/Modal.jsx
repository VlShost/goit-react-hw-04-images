import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ toggleModal, children }) {
  useEffect(() => {
    window.addEventListener('keydown', clickEsc);
    return () => {
      window.addEventListener('keydown', clickEsc);
    };
  });

  const clickBackdrop = e => {
    if (e.target === e.currentTarget) {
      toggleModal();
    }
  };

  const clickEsc = e => {
    if (e.code === 'Escape') {
      toggleModal();
    }
  };

  return createPortal(
    <div className={css.overlay} onClick={clickBackdrop}>
      <div className={css.modal}>{children}</div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};
