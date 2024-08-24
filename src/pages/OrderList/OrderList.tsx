import { Link } from "react-router-dom";
import OrderListSocket from "../../services/sockets/OrderList";
import styles from "./OrderList.module.scss";
import BlockOfStoryOrders from "../../components/AppMain/BlockOfStoryOrders/BlockOfStoryOrders";

const OrderList = () => {
  const { orders, total, totalToday } = OrderListSocket(
    "wss://norma.nomoreparties.space/orders/all"
  );

  return (
    <div className={styles.mainOrderContent}>
      <div className={styles.leftContent}>
        <p>Лента заказов</p>
        <div className={styles.ListOfOrders}>
          {orders.map((order) => (
            <Link to={`/feed/${order.number}`} key={order.number}>
              <BlockOfStoryOrders order={order} />
            </Link>
          ))}
        </div>
      </div>
      <div className={styles.rightContent}>
        <div className={styles.OrderStatus}>
          <div className={styles.OrderStatusInfo}>
            <h3>Готовы:</h3>
            <div className={styles.statusList}>
              {orders
                .filter((order) => order.status === "done")
                .map((doneOrder) => (
                  <p key={doneOrder.number} className={styles.done}>
                    {/* Используем doneOrder.number как уникальный ключ */}
                    {doneOrder.number}
                  </p>
                ))}
            </div>
          </div>
          <div className={styles.OrderStatusInfo}>
            <h3>В работе:</h3>
            <div className={styles.statusList}>
              {orders
                .filter((order) => order.status === "in_progress")
                .map((inProgressOrder) => (
                  <p key={inProgressOrder.number}>{inProgressOrder.number}</p>
                ))}
            </div>
          </div>
        </div>
        <div className={styles.CountOrders}>
          <p>Выполнено за все время:</p>
          <h3>{total}</h3>
        </div>
        <div className={styles.CountOrders}>
          <p>Выполнено за сегодня:</p>
          <h3>{totalToday}</h3>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
