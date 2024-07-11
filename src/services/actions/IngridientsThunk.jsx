import { createAsyncThunk } from "@reduxjs/toolkit";
import { checkResponce } from "../utils/CheckResponse.js";

const ingridientsThunk = createAsyncThunk(
  "burgerIngredients/loadList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/ingredients`
      );
      return (await checkResponce(response))?.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export { ingridientsThunk };
