import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import "./IngridientInfo.scss";
import InfoBlock from "../InfoBlock/InfoBLock";

const IngridientModal = (props) => {
  return (
    <>
      <div className="backdrop" onClick={props.onClose}></div>
      <div className="modal">
        <div className="modal-title mt-10 ml-10 mr-10">
          <p>Детали ингредиента</p>
          <CloseIcon type="primary" onClick={props.onClose} />
        </div>
        <div className="modal-body mb-15">
          <img src={props.image}></img>
          <h3 className="mt-4 mb-8">{props.name}</h3>
          <div className="infoIngredient flex">
            {Object.keys(props.info || {}).map((key, index) => (
              <InfoBlock key={index} {...props.info[key]} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

IngridientModal.propTypes = {
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

export { IngridientModal };
