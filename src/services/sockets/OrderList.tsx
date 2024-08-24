import { useEffect, useState } from "react";

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

interface ErrorResponse {
  message: string; // сообщение об ошибке
}

const OrderListSocket = (url: string) => {
  const [ordersResponse, setOrdersResponse] = useState<OrdersResponse>({
    total: 0,
    totalToday: 0,
    orders: [],
  });

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log(url);
    const socket = new WebSocket(url);

    socket.onopen = () => {
      console.log("WebSocket connected");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if ("message" in data) {
        setError(data.message);
        setOrdersResponse({
          total: 0,
          totalToday: 0,
          orders: [],
        });
      } else {
        // Успешный ответ
        setOrdersResponse({ ...data });
        setError(null);
      }
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => {
      socket.close();
    };
  }, [url]);
  return {
    orders: ordersResponse?.["orders"],
    total: ordersResponse?.["total"],
    totalToday: ordersResponse?.totalToday,
    error,
  };
};

export default OrderListSocket;
