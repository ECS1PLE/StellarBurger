import { createPortal } from "react-dom";
import styles from "./ModalDialog.module.scss";
import PropTypes from "prop-types";
import Overlay from "../ModalOverlay/ModalOverlay";
import CloseModal from "../CloseIcon/CloseIcon";
import { useEffect } from "react";

const modalRoot = document.querySelector("#modal");

const ModalDialog = (props) => {
  useEffect(() => {
    const close = (event) => {
      if (event.key === "Escape") {
        if (props?.onClose) {
          props.onClose();
        }
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [props]);

  return createPortal(
    <>
      <Overlay onClose={props.onClose} />
      <div className={`${styles.modal} ${styles.centerModel}`}>
        <CloseModal onClose={props.onClose} />
        {props.children}
      </div>
    </>,
    modalRoot
  );
};

ModalDialog.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func,
};

export default ModalDialog;
