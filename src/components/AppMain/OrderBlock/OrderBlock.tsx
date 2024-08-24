import styles from "./OrderBlock.module.scss";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const OrderBlock = (props) => {
  return (
    <>
      <div className={styles.mainBlock}>
        <div className={styles.borderImg}>
          <img src={props.image}></img>
        </div>
        <p>{props.name}</p>
        <div className={styles.rightPriceBlock}>
          <p>{props.count}</p>
          <p>x</p>
          <p>{props.price}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </>
  );
};

export default OrderBlock;
