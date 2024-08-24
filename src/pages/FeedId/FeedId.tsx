import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./FeedId.module.scss";
import OrderBlock from "../../components/AppMain/OrderBlock/OrderBlock";
import {
  FormattedDate,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

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

const FeedId: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [orderDetails, setOrderDetails] = useState<FeedDetails | null>(null);

  const ingredients = useSelector(
    (state: any) => state.burgerIngredients.ingredients
  );

  useEffect(() => {
    const fetchOrderDetails = async () => {
      const response = await fetch(
        `https://norma.nomoreparties.space/api/orders/${orderId}`
      );
      const orderData = await response.json();

      if (orderData && orderData.orders) {
        setOrderDetails(orderData.orders[0]);
      } else {
        console.error("Нет такого заказа", orderData);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

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

  // Вычисление общей суммы заказа
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
        {Object.values(ingredientCount).length > 0 ? (
          Object.values(ingredientCount).map(({ count, ingredient }, index) => (
            <OrderBlock
              key={ingredient._id}
              image={ingredient.image}
              name={ingredient.name}
              count={count}
              price={ingredient.price}
            />
          ))
        ) : (
          <p>Ингредиенты отсутствуют</p>
        )}
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
