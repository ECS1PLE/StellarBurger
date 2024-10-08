import styles from "./BlockOfStotyOrders.module.scss";
import {
  FormattedDate,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../services/hooks/hooks";
import { ingridientsThunk } from "../../../services/actions/IngridientsThunk";

const BlockOfStoryOrders: React.FC = ({ order }) => {
  const dispatcher = useAppDispatch();

  const burgerIngridients = useAppSelector(
    (state) => state.burgerIngredients.ingredients
  );

  useEffect(() => {
    if (!burgerIngridients?.length) {
      dispatcher(ingridientsThunk());
    }
  }, [burgerIngridients, dispatcher]);

  const calculateTotalPrice = () => {
    return order.ingredients.reduce((total, ingredientId) => {
      const ingredient = burgerIngridients.find(
        (item) => item._id === ingredientId
      );
      return ingredient ? total + ingredient.price : total;
    }, 0);
  };

  const totalPrice = calculateTotalPrice();

  return (
    <div className={styles.BlockOfStoryOrders}>
      <div className={styles.TopContent}>
        <p>{order.number}</p>
        <FormattedDate date={new Date(order.createdAt)} />
      </div>
      <div className={styles.infoBurger}>
        <h2>{order.name}</h2>
        <p>{order.status}</p>
      </div>
      <div className={styles.IngrediensPhoto}>
        {order.ingredients.map((ingredientId, index) => {
          const ingredient = burgerIngridients.find(
            (item) => item._id === ingredientId
          );
          return (
            ingredient && (
              <div className={styles.borderImg} key={index}>
                <img src={ingredient.image} alt={ingredient.name} />
              </div>
            )
          );
        })}
        <div className={styles.balanceOrder}>
          <p>{totalPrice}</p> {/* Общая сумма заказа */}
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default BlockOfStoryOrders;
