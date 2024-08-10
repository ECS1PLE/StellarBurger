import styles from "./ModalOverlay.module.scss";
import React from "react";

interface OverlayProps {
  onClose: () => void;
}

const Overlay: React.FC<OverlayProps> = (props) => {
  return <div className={styles.backdrop} onClick={props.onClose}></div>;
};

export default Overlay;
