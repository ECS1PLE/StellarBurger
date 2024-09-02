import React, { useEffect, useState } from "react";
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
import { ingridientsThunk } from "../../services/actions/IngridientsThunk";

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
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const orderDetails = useAppSelector(
    (state: RootState) => state.UserOrders.details
  );
  const ingredients = useAppSelector(
    (state: RootState) => state.burgerIngredients.ingredients
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      if (orderId) {
        setLoading(true);
        const result = await dispatch(fetchOrderDetails({ orderId }));
        if (result.error) {
          setError("Ошибка при загрузке заказа");
          navigate("/profile/orders");
        } else {
          setError(null);
        }
        setLoading(false);
      } else {
        navigate("/profile/orders");
      }
    };

    fetchDetails();
  }, [dispatch, orderId, navigate]);

  useEffect(() => {
    dispatch(ingridientsThunk());
    if (!orderId) {
      navigate("/profile/orders");
    }
  }, [dispatch, orderId, navigate]);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!orderDetails || orderDetails.ingredients.length === 0) {
    return <div>Нет данных о заказе</div>;
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

  const totalAmount = Object.values(ingredientCount).reduce(
    (acc, { count, ingredient }) => acc + ingredient.price * count,
    0
  );

  return (
    <div className={styles.mainFeedContent}>
      <p>{orderDetails.number}</p>
      <h3>{orderDetails.name}</h3>
      <h4 className={styles.doneOrder}>{orderDetails.status}</h4>
      <h2>Состав:</h2>
      <div className={styles.ordersInfo}>
        {Object.values(ingredientCount).map(({ count, ingredient }) => (
          <OrderBlock
            key={ingredient._id} // Используем _id как уникальный ключ
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
