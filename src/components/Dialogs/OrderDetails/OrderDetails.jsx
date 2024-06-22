import styles from "./OrderDetails.module.scss";
import PropTypes from "prop-types";
import ModalDialog from "../ModalDialog/ModalDialog";

const OrderDetails = (props) => {
  return (
    <ModalDialog onClose={props.onClose}>
      <>
        <div className={`${styles.mainConent} mt-30 mb-30 ml-25 mr-25`}>
          <div className={styles.id__order}>
            <h2>034536</h2>
            <h3 className="mt-8">идентификатор заказа</h3>
          </div>
          <img
            src="/src/images/done.svg"
            className={`${styles.done} mt-15 mb-15`}
            alt="Иконка состояния заказа"
          />
          <div className={styles.order__info}>
            <h4>Ваш заказ начали готовить</h4>
            <p>Дождитесь готовности на орбитальной станции</p>
          </div>
        </div>
      </>
    </ModalDialog>
  );
};

OrderDetails.propTypes = {
  onClose: PropTypes.func.isRequired,
  // imgSrc: PropTypes.string.isRequired,
};

export default OrderDetails;
