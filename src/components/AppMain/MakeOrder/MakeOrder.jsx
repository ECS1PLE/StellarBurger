import styles from "./MakeOrder.module.scss";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import OrderDetails from "../../Dialogs/OrderDetails/OrderDetails";
import { useEffect, useState } from "react";
import ModalDialog from "../../Dialogs/ModalDialog/ModalDialog";
import { useSelector } from "react-redux";
// import { useReducer } from "react";
import { useDispatch } from "react-redux";
import {
  clearOrder,
  resetOrderError,
} from "../../../services/reducers/OrderSlice";
import { makeOrderThunk } from "../../../services/actions/MakeOrderThunk";

const MakeOrder = () => {
  const [isOpen, setIsOpen] = useState(false);

  const dispatcher = useDispatch();

  const orderItems = useSelector((state) => state.OrderSlice.orderItems);
  const orderError = useSelector((state) => state.OrderSlice.orderError);
  const orderNumber = useSelector(
    (state) => state.OrderSlice.order?.order?.number
  );

  const handleOrder = () => {
    if (orderItems?.length) {
      dispatcher(makeOrderThunk());
    }
  };

  useEffect(() => {
    if (orderNumber) {
      setIsOpen(true);
    }
  }, [orderNumber]);

  return (
    <>
      {orderError?.length > 0 && (
        <ModalDialog onClose={() => dispatcher(resetOrderError())}>
          <div>{orderError}</div>
        </ModalDialog>
      )}
      {isOpen && !orderError && (
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
          <p>
            {orderItems.reduce((acc, curr) => acc + curr.count * curr.price, 0)}
          </p>
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
