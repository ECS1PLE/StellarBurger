import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  orderItems: [],
  order: {},
};

export const OrderSlice = createSlice({
  name: "burgerIngredients",
  initialState,
  reducers: {
    addToOrder: (state, action) => {
      state.orderItems = [...state.orderItems, action.payload];
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
      console.log(action.payload["from"]);
      console.log("TO");
      console.log(action.payload["to"]);

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
  },
});

export const {
  addToOrder,
  makeOrder,
  addInfo,
  clearOrder,
  removeFromOrder,
  moveItem,
} = OrderSlice.actions;

export default OrderSlice.reducer;
