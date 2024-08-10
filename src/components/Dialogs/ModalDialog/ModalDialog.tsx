import { createPortal } from "react-dom";
import styles from "./ModalDialog.module.scss";
import React, { useEffect } from "react";
import Overlay from "../ModalOverlay/ModalOverlay";
import CloseModal from "../CloseIcon/CloseIcon";

interface ModalDialogProps {
  children: React.ReactNode;
  onClose?: () => void;
}

const modalRoot = document.querySelector("#modal") as HTMLElement;

const ModalDialog: React.FC<ModalDialogProps> = (props) => {
  console.log("MODAL");

  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (props.onClose) {
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

export default ModalDialog;
