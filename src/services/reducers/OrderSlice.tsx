import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { makeOrderThunk } from "../actions/MakeOrderThunk";

interface OrderItem {
  orderItemId: string;
  orderItemNo: number;
}

interface OrderState {
  orderItems: OrderItem[];
  order: Record<string, any>;
  orderLoading: boolean;
  orderError: string;
  info?: Record<string, any>;
}

const initialState: OrderState = {
  orderItems: [],
  order: {},
  orderLoading: false,
  orderError: "",
};

export const OrderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addToOrder: (state, action: PayloadAction<OrderItem>) => {
      state.orderItems.push(action.payload);
    },
    removeFromOrder: (state, action: PayloadAction<string>) => {
      state.orderItems = state.orderItems.filter(
        (item) => item.orderItemId !== action.payload
      );
    },
    moveItem: (
      state,
      action: PayloadAction<{ from: OrderItem; to: OrderItem }>
    ) => {
      const currentState = current(state.orderItems);
      const from = currentState.find(
        (item) => item.orderItemId === action.payload.from.orderItemId
      );
      const to = currentState.find(
        (item) => item.orderItemId === action.payload.to.orderItemId
      );

      if (from && to) {
        state.orderItems = state.orderItems.map((item) =>
          item.orderItemId === from.orderItemId
            ? { ...item, orderItemNo: to.orderItemNo - 1 }
            : item
        );
      }
    },
    makeOrder: (state, action: PayloadAction<Record<string, any>>) => {
      state.order = { ...action.payload };
    },
    addInfo: (state, action: PayloadAction<Record<string, any>>) => {
      state.info = { ...action.payload };
    },
    clearOrder: (state) => {
      state.orderItems = [];
      state.order = {};
    },
    resetOrderError: (state) => {
      state.orderError = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(makeOrderThunk.pending, (state) => {
        state.orderLoading = true;
      })
      .addCase(
        makeOrderThunk.fulfilled,
        (state, action: PayloadAction<Record<string, any>>) => {
          state.orderLoading = false;
          state.order = { ...action.payload };
        }
      )
      .addCase(makeOrderThunk.rejected, (state, action) => {
        state.orderLoading = false;
        state.orderError = action.payload
          ? (action.payload as string)
          : "Error occurred";
      });
  },
});

// Action exports
export const {
  addToOrder,
  makeOrder,
  addInfo,
  clearOrder,
  removeFromOrder,
  moveItem,
  resetOrderError,
} = OrderSlice.actions;

// Reducer export
export default OrderSlice.reducer;
