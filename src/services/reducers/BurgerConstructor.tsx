import { createContext, Dispatch } from "react";

interface Ingredient {
  id: string;
  name: string;
  quantity: number;
}

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
}

interface State {
  ingredients: Ingredient[];
  orderItems: OrderItem[];
  order: any;
}

// Define the initial state
const initialState: State = {
  ingredients: [],
  orderItems: [],
  order: null, // or whatever the initial value should be
};

interface Action {
  type: string;
  payload: any;
}

const constructorReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "load_ingredients":
      return { ...state, ingredients: [...action.payload] }; // Fixed typo: "ingridients" -> "ingredients"
    case "add_order_item":
      return { ...state, orderItems: [...state.orderItems, action.payload] };
    case "remove_order_item":
      return {
        ...state,
        orderItems: state.orderItems.filter(
          (item) => item.id !== action.payload.id
        ),
      };
    case "add_order_from_api":
      return { ...state, order: action.payload };
    default:
      return state;
  }
};

interface ConstructorContextType {
  state: State;
  dispatch: Dispatch<Action>;
}

const ConstructorContext = createContext<ConstructorContextType | null>(null);

export { initialState, constructorReducer, ConstructorContext };
