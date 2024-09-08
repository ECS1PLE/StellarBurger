import { createAsyncThunk } from "@reduxjs/toolkit";
import checkResponce from "../utils/CheckResponse.ts";
import Cookies from "js-cookie";

interface OrderState {
  orderItems: Array<{ id: string }>;
}

interface RootState {
  OrderSlice: OrderState;
}
interface OrderResponse {
  success: boolean;
}

const makeOrderThunk = createAsyncThunk<
  OrderResponse,
  void,
  { state: RootState }
>("order/make", async (_, { rejectWithValue, getState }) => {
  const accessToken = Cookies.get("accessToken");
  const state = getState();
  try {
    const ingredients = state.OrderSlice.orderItems.map(({ id }) => id);
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/orders?token=${accessToken}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
        body: JSON.stringify({
          ingredients: ingredients,
        }),
      }
    );
    return await checkResponce(response);
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Unknown error"
    );
  }
});

export { makeOrderThunk };
