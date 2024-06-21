import PropTypes from "prop-types";
import styles from "./IngridientDetails.module.scss";
import InfoBlock from "../InfoBlock/InfoBLock";
import Overlay from "../ModalOverlay/ModalOverlay";
import CloseModal from "../CloseIcon/CloseIcon";
import ModalDialog from "../ModalDialog/ModalDialog";

const IngridientDetails = (props) => {
  return (
    <>
      <ModalDialog onClose={props.onClose}>
        <div className={`${styles.modalTitle} mt-10 ml-10 mr-10`}>
          <p>Детали ингредиента</p>
          {/* <CloseModal onClose={props.onClose} /> */}
        </div>
        <div className={`${styles.modalBody} mb-15`}>
          <img src={props.image} alt="Фотография ингредиента"></img>
          <h3 className="mt-4 mb-8">{props.name}</h3>
          <div className={`${styles.infoIngredient} ${styles.flex}`}>
            {Object.keys(props.info || {}).map((key, index) => (
              <InfoBlock key={index} {...props.info[key]} />
            ))}
          </div>
        </div>
      </ModalDialog>
    </>
  );
};

IngridientDetails.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  image: PropTypes.string,
  name: PropTypes.string,
  info: PropTypes.exact({
    calories: PropTypes.exact({
      name: PropTypes.string,
      value: PropTypes.number,
    }),
    proteins: PropTypes.exact({
      name: PropTypes.string,
      value: PropTypes.number,
    }),
    fat: PropTypes.exact({
      name: PropTypes.string,
      value: PropTypes.number,
    }),
    carbohydrates: PropTypes.exact({
      name: PropTypes.string,
      value: PropTypes.number,
    }),
  }),
  // imgSrc: PropTypes.string.isRequired,
};

export { IngridientDetails };
