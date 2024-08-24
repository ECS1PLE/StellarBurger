import styles from "./ProfileOrders.module.scss";
import ProfileMenu from "../../components/AppMain/ProfileMenu/ProfileMenu";
import BlockOfStoryOrders from "../../components/AppMain/BlockOfStoryOrders/BlockOfStoryOrders";
import { Link } from "react-router-dom";
import OrderListSocket from "../../services/sockets/OrderList";
import Cookies from "js-cookie";

const ProfileOrders = () => {
  const accessToken = Cookies.get("accessToken");

  const tokenForSocket = accessToken ? accessToken.split(" ")[1] : null;
  // console.log(`wss://norma.nomoreparties.space/orders?token=${accessToken}`);

  const { orders } = OrderListSocket(
    `wss://norma.nomoreparties.space/orders?token=${tokenForSocket}`
  );

  return (
    <div className={styles.ProfileContentMain}>
      <div className={styles.LeftProfileContrent}>
        <ProfileMenu />
      </div>
      <div className={styles.RightProfileContrent}>
        {orders.map((order) => (
          <Link key={order.number} to={`/profile/orders/${order.number}`}>
            <BlockOfStoryOrders order={order} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProfileOrders;
