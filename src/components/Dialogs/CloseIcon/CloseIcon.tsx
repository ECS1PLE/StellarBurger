import styles from "./CloseIcon.module.scss";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";

interface CloseModalProps {
  onClose: () => void;
  onClick: () => void;
  addClass?: string;
}

const CloseModal: React.FC<CloseModalProps> = ({ onClose, addClass }) => {
  const handleClose = (event: React.SyntheticEvent) => {
    onClose();
  };

  return (
    <div className={`${styles.IconRight} ${addClass || ""}`} id="iconRight">
      <CloseIcon type="primary" onClick={handleClose} id="iconRight" />
    </div>
  );
};

export default CloseModal;
