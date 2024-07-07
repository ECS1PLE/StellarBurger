import { createContext } from "react";

const constructorReducer = (state, action) => {
  switch (action.type) {
    case "load_ingridients":
      return { ...state, ingredients: [...action.payload] };
    case "add_order_item":
      return { ...state, orderItems: [...state.orderItems, action.payload] };
    case "remove_order_item":
      return { ...state, orderItems: [...state.orderItems, action.payload] };
    case "add_order_from_api":
      return { ...state, order: action.payload };
    default:
      return state;
  }
};

const ConstructorContext = createContext(null);

export { constructorReducer, ConstructorContext };
