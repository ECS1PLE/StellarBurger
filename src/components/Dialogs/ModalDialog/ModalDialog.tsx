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

const ModalDialog: React.FC<ModalDialogProps> = ({ children, onClose }) => {
  console.log("MODAL");

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && onClose) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleOverlayClick = (event: React.SyntheticEvent<HTMLDivElement>) => {
    if (onClose) {
      onClose();
    }
  };

  const handleCloseClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onClose) {
      onClose();
    }
  };

  return createPortal(
    <>
      <Overlay onClose={handleOverlayClick} />
      <div className={`${styles.modal} ${styles.centerModel}`} id="modalDialog">
        <CloseModal onClose={handleCloseClick} />
        {children}
      </div>
    </>,
    modalRoot
  );
};

export default ModalDialog;
