import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchOrderDetails } from "../actions/UserOrders";

interface OrderDetails {
  id: string;
  items: any[]; // Замените на правильную структуру, если есть
  total: number;
  status: string;
}

interface OrderState {
  details: OrderDetails | null;
  loading: boolean;
  error: string | null;
}

export const initialState: OrderState = {
  details: null,
  loading: false,
  error: null,
};

const UserOrders = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.details = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchOrderDetails.fulfilled,
        (state, action: PayloadAction<OrderDetails>) => {
          state.loading = false;
          state.details = action.payload;
        }
      )
      .addCase(fetchOrderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Ошибка получения заказа";
      });
  },
});

// Экспортируем редьюсер и экшены
export const { clearOrder } = UserOrders.actions;

export default UserOrders.reducer;
