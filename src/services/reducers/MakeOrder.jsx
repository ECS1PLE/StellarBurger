import { createContext } from "react";

const MakeReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const OrderContext = createContext([null]);
export { MakeReducer, OrderContext };
