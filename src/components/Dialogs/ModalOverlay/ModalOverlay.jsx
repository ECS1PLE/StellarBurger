import styles from "./ModalOverlay.module.scss";
import PropTypes from "prop-types";
import { useEffect } from "react";

const Overlay = (props) => {
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
  }, []);
  return <div className={styles.backdrop} onClick={props.onClose}></div>;
};

export default Overlay;

Overlay.propTypes = {
  onClose: PropTypes.func.isRequired,
};
