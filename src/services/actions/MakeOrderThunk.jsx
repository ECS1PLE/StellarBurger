import { createAsyncThunk } from "@reduxjs/toolkit";
import { loadIngridients } from "../reducers/BurgerIngredientsSlice";

export const postOrder = createAsyncThunk(
  "orders/postOrder",
  async (orderItems, { dispatch }) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ingredients: orderItems.map((item) => item.id),
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        return errorData;
      }

      const data = await response.json();

      if (data.success) {
        dispatch(loadIngridients(data));
        return data;
      } else {
        return { error: "Ошибка при размещении заказа" };
      }
    } catch (error) {
      return { error: error.message };
    }
  }
);

export default postOrder;
