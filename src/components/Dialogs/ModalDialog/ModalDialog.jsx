import { createPortal } from "react-dom";
import styles from "./ModalDialog.module.scss";
import PropTypes from "prop-types";
import Overlay from "../ModalOverlay/ModalOverlay";
import CloseModal from "../CloseIcon/CloseIcon";

const modalRoot = document.querySelector("#modal");

const ModalDialog = (props) => {
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
  children: PropTypes.array.isRequired,
  onClose: PropTypes.func,
};

export default ModalDialog;
