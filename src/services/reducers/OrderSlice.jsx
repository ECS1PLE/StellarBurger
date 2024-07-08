import { createSlice, current } from "@reduxjs/toolkit";
import { makeOrderThunk } from "../actions/MakeOrderThunk";

const initialState = {
  orderItems: [],
  order: {},
  orderLoading: false,
  orderError: "",
};

export const OrderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addToOrder: (state, action) => {
      const oldItem = state.orderItems.find(
        (item) => item.id == action.payload["id"]
      );
      if (oldItem) {
        oldItem["count"]++;
      } else {
        state.orderItems = [...state.orderItems, action.payload];
      }
    },
    removeFromOrder: (state, action) => {
      state.orderItems = state.orderItems.filter(
        (item) => item.orderItemId != action.payload
      );
    },
    moveItem: (state, action) => {
      const currentState = current(state.orderItems);
      const from = currentState.find(
        (item) => item.orderItemId == action.payload["from"]?.orderItemId
      );
      const to = currentState.find(
        (item) => item.orderItemId == action.payload["to"]?.orderItemId
      );

      state.orderItems = [
        ...state.orderItems.map((item) =>
          item.orderItemId == from.orderItemId
            ? { ...item, orderItemNo: to.orderItemNo - 1 }
            : item
        ),
      ];
    },
    makeOrder: (state, action) => {
      state.order = { ...action.payload };
    },
    addInfo: (state, action) => {
      state.info = { ...action.payload };
    },
    clearOrder(state) {
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
      .addCase(makeOrderThunk.fulfilled, (state, action) => {
        state.orderLoading = false;
        state.order = { ...action.payload };
        // state.ingredientsLoading = false;
        // state.ingredients = action.payload?.map((item) => ({
        //   ...item,
        //   balance: item.price,
        // }));
      })
      .addCase(makeOrderThunk.rejected, (state, action) => {
        state.orderLoading = false;
        state.orderError = action.payload;
      });
  },
});

export const {
  addToOrder,
  makeOrder,
  addInfo,
  clearOrder,
  removeFromOrder,
  moveItem,
  resetOrderError,
} = OrderSlice.actions;

export default OrderSlice.reducer;
