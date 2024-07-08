import { createAsyncThunk } from "@reduxjs/toolkit";

const makeOrderThunk = createAsyncThunk(
  "order/make",
  async (_, { rejectWithValue, getState }) => {
    const state = getState();
    try {
      const ingridients = state.OrderSlice.orderItems.reduce((prev, cur) => {
        if (cur.count === 1) {
          prev.push(cur.id);
        } else if (cur.count > 1) {
          for (let i = 0; i < cur.count; i++) {
            prev.push(cur.id);
          }
        }
        return prev;
      }, []);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ingredients: ingridients,
        }),
      });
      if (!response.ok) {
        throw new Error("Ошибка получения данных");
      }

      const data = await response.json();

      if (!data?.["success"]) {
        throw new Error("Ошибка получения данных");
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export { makeOrderThunk };
