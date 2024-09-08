import { createAsyncThunk } from "@reduxjs/toolkit";
import checkResponse from "../utils/CheckResponse.ts";

interface Order {
  id: string;
  name: string;
}

interface FetchOrderDetailsParams {
  orderId: string;
}
type FetchOrderDetailsResponse = Order;

const fetchOrderDetails = createAsyncThunk<
  FetchOrderDetailsResponse, // Тип возвращаемого значения
  FetchOrderDetailsParams // Тип параметров, которые передаются в thunk
>("order/fetchOrderDetails", async ({ orderId }) => {
  const response = await fetch(
    `https://norma.nomoreparties.space/api/orders/${orderId}`
  );

  const orderData = await checkResponse(response);

  if (orderData && orderData.orders) {
    return orderData.orders[0];
  } else {
    console.error("Нет такого заказа", orderData);
    throw new Error("Ошибка получения заказа");
  }
});

export { fetchOrderDetails };
