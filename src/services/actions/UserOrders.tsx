import { createAsyncThunk } from "@reduxjs/toolkit";
import checkResponse from "../utils/CheckResponse";

// Интерфейсы
interface Order {
  id: string;
  name: string;
  items: any[]; // Убедитесь, что это соответствует структуре OrderDetails
  total: number;
  status: string;
}

interface FetchOrderDetailsParams {
  orderId: string;
}

// Интерфейс для ответа API
interface ApiResponse {
  data: Order[];
}

// Создание асинхронного thunk
export const fetchOrderDetails = createAsyncThunk<
  Order, // Тип данных, которые будут возвращены
  FetchOrderDetailsParams // Тип параметров
>("order/fetchOrderDetails", async ({ orderId }, { rejectWithValue }) => {
  try {
    const response = await fetch(
      `https://norma.nomoreparties.space/api/orders/${orderId}`
    );

    // Проверьте, соответствует ли тип возвращаемого значения ApiResponse
    const orderData: ApiResponse = await checkResponse(response);

    if (orderData && orderData.data && orderData.data.length > 0) {
      return orderData.data[0]; // Возвращаем первый заказ из массива
    } else {
      throw new Error("Order not found");
    }
  } catch (error: any) {
    return rejectWithValue(error.message || "Error fetching order details");
  }
});
