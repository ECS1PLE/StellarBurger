import "./OrderInfo.scss";
import PropTypes from "prop-types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const OrderInfo = (props) => {
  return (
    <>
      <div className="backdrop" onClick={props.onClose}></div>
      <div className="modal modalIcon centerModel">
        <div className="IconRight">
          <CloseIcon type="primary" onClick={props.onClose} />
        </div>
        <div className="mainConent mt-30 mb-30 ml-25 mr-25">
          <div className="id__order">
            <h2>034536</h2>
            <h3 className="mt-8">идентификатор заказа</h3>
          </div>
          <img src="/src/images/done.svg" className="done mt-15 mb-15" />
          <div className="order__info">
            <h4>Ваш заказ начали готовить</h4>
            <p>Дождитесь готовности на орбитальной станции</p>
          </div>
        </div>
      </div>
    </>
  );
};

OrderInfo.propTypes = {
  onClose: PropTypes.func.isRequired,
  // imgSrc: PropTypes.string.isRequired,
};

export default OrderInfo;
