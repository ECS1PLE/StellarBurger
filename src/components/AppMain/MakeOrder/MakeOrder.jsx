import styles from "./MakeOrder.module.scss";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import OrderDetails from "../../Dialogs/OrderDetails/OrderDetails";
import { useState } from "react";
import ModalDialog from "../../Dialogs/ModalDialog/ModalDialog";
import { useSelector } from "react-redux";
// import { useReducer } from "react";
import { useDispatch } from "react-redux";
import { makeOrder } from "../../../services/reducers/OrderSlice";
import { clearOrder } from "../../../services/reducers/OrderSlice";

const MakeOrder = () => {
  const [isOpen, setIsOpen] = useState(false);
  const orderItems = useSelector((state) => state.OrderSlice.orderItems);

  const dispatcher = useDispatch();

  const handleOrder = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ingredients: orderItems.map((item) => item.id),
        }),
      });

      if (!response.ok) {
        console.log("Ошибка");
      }

      const data = await response.json();

      if (data.success) {
        console.log("making orcder");
        dispatcher(makeOrder(data));
        setIsOpen(true);
        //
      } else {
        console.log("ошибка");
      }
    } catch (error) {
      console.error("Ошибка: ", error);
    }
  };

  return (
    <>
      {isOpen && (
        <ModalDialog
          open={isOpen}
          onClose={() => {
            setIsOpen(false);
            dispatcher(clearOrder());
          }}
        >
          <OrderDetails />
        </ModalDialog>
      )}
      <div className={`${styles.MakeOrder} mt-10`}>
        <div className={styles.totalPrice}>
          <p>{orderItems.reduce((acc, curr) => acc + curr.price, 0)}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={handleOrder}
        >
          Оформить заказ
        </Button>
      </div>
    </>
  );
};

export default MakeOrder;

// MakeOrder.propTypes = {
//   //   // onClose: PropTypes.func.isRequired,
//   //   // imgSrc: PropTypes.string.isRequired,
//   price: PropTypes.number.isRequired,
// };
