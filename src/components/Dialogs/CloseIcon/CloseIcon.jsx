import styles from "./CloseIcon.module.scss";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

const CloseModal = (props) => {
  return (
    <div className={styles.IconRight}>
      <CloseIcon type="primary" onClick={props.onClose} />
    </div>
  );
};

export default CloseModal;

CloseModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  addClass: PropTypes.string,
};
