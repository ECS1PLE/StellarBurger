import styles from "./OrderDetails.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../services/reducers/store";
import React, { SyntheticEvent } from "react";

const OrderDetails: React.FC = () => {
  const orderNumber = useSelector(
    (state: RootState) => state.OrderSlice.order?.order?.number || ""
  );

  const handleButtonClick = (event: SyntheticEvent<HTMLButtonElement>) => {
    console.log("Button clicked:", event);
  };

  return (
    <div className={`${styles.mainConent} mt-30 mb-30 ml-25 mr-25`}>
      <div className={styles.id__order}>
        <h2>{orderNumber}</h2>
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
  );
};

export default OrderDetails;
