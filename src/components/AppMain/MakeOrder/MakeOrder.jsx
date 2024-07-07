import styles from "./MakeOrder.module.scss";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import OrderDetails from "../../Dialogs/OrderDetails/OrderDetails";
import { useState } from "react";
import ModalDialog from "../../Dialogs/ModalDialog/ModalDialog";

const MakeOrder = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {isOpen && (
        <ModalDialog open={isOpen} onClose={() => setIsOpen(false)}>
          <OrderDetails />
        </ModalDialog>
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

// MakeOrder.propTypes = {
//   // onClose: PropTypes.func.isRequired,
//   // imgSrc: PropTypes.string.isRequired,
// };
