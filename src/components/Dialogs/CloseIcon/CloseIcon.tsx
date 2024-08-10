import styles from "./CloseIcon.module.scss";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";

interface CloseModalProps {
  onClose: () => void;
  addClass?: string;
}

const CloseModal: React.FC<CloseModalProps> = ({ onClose, addClass }) => {
  return (
    <div className={`${styles.IconRight} ${addClass || ""}`}>
      <CloseIcon type="primary" onClick={onClose} />
    </div>
  );
};

export default CloseModal;
