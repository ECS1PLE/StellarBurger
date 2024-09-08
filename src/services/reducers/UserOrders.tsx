import { createSlice } from "@reduxjs/toolkit";
import { fetchOrderDetails } from "../actions/UserOrders";

const UserOrdres = createSlice({
  name: "order",
  initialState: {
    details: null,
    loading: false,
    error: null,
  },
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
      .addCase(fetchOrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.details = action.payload; // Исправлено
      })
      .addCase(fetchOrderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Экспортируем редьюсер и экшены
export const { clearOrder } = UserOrdres.actions;

export default UserOrdres.reducer;
