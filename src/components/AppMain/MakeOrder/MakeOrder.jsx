import styles from "./MakeOrder.module.scss";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import OrderDetails from "../../Dialogs/OrderDetails/OrderDetails";
import { useState } from "react";

const MakeOrder = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {isOpen && (
        <OrderDetails open={isOpen} onClose={() => setIsOpen(false)} />
      )}
      <div className={`${styles.MakeOrder} mt-10`}>
        <div className={styles.totalPrice}>
          <p>610</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={() => setIsOpen(true)}
        >
          Оформить заказ
        </Button>
      </div>
    </>
  );
};

export default MakeOrder;
