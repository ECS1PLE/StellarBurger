import styles from "./ModalOverlay.module.scss";
import PropTypes from "prop-types";

const Overlay = (props) => {
  return <div className={styles.backdrop} onClick={props.onClose}></div>;
};

export default Overlay;

Overlay.propTypes = {
  onClose: PropTypes.func.isRequired,
};
