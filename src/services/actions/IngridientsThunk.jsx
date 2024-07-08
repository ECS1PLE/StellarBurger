import { createAsyncThunk } from "@reduxjs/toolkit";

const ingridientsThunk = createAsyncThunk(
  "burgerIngredients/loadList",
  async (orderItems, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/ingredients`
      );
      if (!response.ok) {
        throw new Error("Ошибка получения данных");
      }
      const data = await response.json();
      if (!data?.["success"]) {
        throw new Error("Ошибка получения данных");
      }
      return data?.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export { ingridientsThunk };
