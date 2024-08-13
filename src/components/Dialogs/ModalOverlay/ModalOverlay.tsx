import styles from "./ModalOverlay.module.scss";
import React, { MouseEvent } from "react";

interface OverlayProps {
  onClose: () => void;
}

const Overlay: React.FC<OverlayProps> = (props) => {
  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    props.onClose();
  };

  return <div className={styles.backdrop} onClick={handleClick}></div>;
};

export default Overlay;
