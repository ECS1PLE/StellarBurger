import { useEffect, useState } from "react";
import socketMiddleware from "../socketMiddleware/socketMiddleware";

interface Order {
  id: number;
  number: number; // номер заказа
  name: string; // название заказа
  status: string; // статус заказа
  createdAt: string; // время создания
  ingredients: string[]; // массив идентификаторов ингредиентов
}

interface OrdersResponse {
  orders: Array<Order>;
  total: number;
  totalToday: number;
}

const OrderListSocket = (url: string) => {
  const [ordersResponse, setOrdersResponse] = useState<OrdersResponse>({
    total: 0,
    totalToday: 0,
    orders: [],
  });

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const actions = {
      onMessage: (data: OrdersResponse) => {
        setOrdersResponse(data);
        setError(null);
      },
      onError: (error: string) => {
        setError(error);
        setOrdersResponse({
          total: 0,
          totalToday: 0,
          orders: [],
        });
      },
    };

    const middleware = socketMiddleware({ url, actions });

    return () => {
      middleware.close();
    };
  }, [url]);

  return {
    orders: ordersResponse.orders,
    total: ordersResponse.total,
    totalToday: ordersResponse.totalToday,
    error,
  };
};

export default OrderListSocket;
