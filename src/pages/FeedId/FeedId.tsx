import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../services/hooks/hooks";
import { fetchOrderDetails } from "../../services/actions/UserOrders";
import styles from "./FeedId.module.scss";
import OrderBlock from "../../components/AppMain/OrderBlock/OrderBlock";
import {
  FormattedDate,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { RootState } from "../../services/reducers/store";

interface Ingredient {
  _id: string;
  name: string;
  image: string;
  price: number;
}

interface FeedDetails {
  number: number;
  name: string;
  status: string;
  ingredients: string[];
  createdAt: string;
}

const FeedId: React.FC<FeedDetails> = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const orderDetails = useAppSelector(
    (state: RootState) => state.UserOrders.details
  );
  const ingredients = useAppSelector(
    (state: RootState) => state.burgerIngredients.ingredients
  );

  useEffect(() => {
    dispatch(fetchOrderDetails({ orderId }));
  }, [dispatch, orderId]);

  if (!orderDetails) {
    return <div>Загрузка...</div>;
  }

  const ingredientCount: {
    [key: string]: { count: number; ingredient: Ingredient };
  } = {};

  orderDetails.ingredients.forEach((id) => {
    const ingredient = ingredients.find((ing: Ingredient) => ing._id === id);
    if (ingredient) {
      if (!ingredientCount[id]) {
        ingredientCount[id] = { count: 0, ingredient };
      }
      ingredientCount[id].count++;
    }
  });

  if (Object.values(ingredientCount).length === 0) {
    navigate("/profile/orders");
    return null;
  }

  const totalAmount = Object.values(ingredientCount).reduce(
    (acc, { count, ingredient }) => {
      return acc + ingredient.price * count;
    },
    0
  );

  return (
    <div className={`${styles.mainFeedContent} flex`}>
      <p>{orderDetails.number}</p>
      <h3>{orderDetails.name}</h3>
      <h4 className={styles.doneOrder}>{orderDetails.status}</h4>
      <h2>Состав:</h2>
      <div className={styles.ordersInfo}>
        {Object.values(ingredientCount).map(({ count, ingredient }, index) => (
          <OrderBlock
            key={index}
            image={ingredient.image}
            name={ingredient.name}
            count={count}
            price={ingredient.price}
          />
        ))}
      </div>
      <div className={styles.bottomContent}>
        <FormattedDate date={new Date(orderDetails.createdAt)} />
        <div>
          <p>{totalAmount}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default FeedId;
