import "./MakeOrder.scss";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import OrderInfo from "../../Dialogs/OrderInfo/OrderInfo";
import { useState } from "react";

const MakeOrder = () => {
  const [showModal, setShowModaL] = useState(false);
  return (
    <>
      {showModal && (
        <OrderInfo open={showModal} onClose={() => setShowModaL(false)} />
      )}
      <div className="MakeOrder mt-10">
        <div className="totalPrice">
          <p>610</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={() => setShowModaL(true)}
        >
          Оформить заказ
        </Button>
      </div>
    </>
  );
};

export default MakeOrder;
