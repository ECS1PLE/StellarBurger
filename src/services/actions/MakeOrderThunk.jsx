import { createAsyncThunk } from "@reduxjs/toolkit";
import { checkResponce } from "../utils/CheckResponse.js";

const makeOrderThunk = createAsyncThunk(
  "order/make",
  async (_, { rejectWithValue, getState }) => {
    const state = getState();
    try {
      const ingridients = state.OrderSlice.orderItems.map(({ id }) => id);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ingredients: ingridients,
        }),
      });
      return await checkResponce(response);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export { makeOrderThunk };
