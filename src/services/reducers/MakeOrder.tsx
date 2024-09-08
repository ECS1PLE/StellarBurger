import { createContext, Dispatch } from "react";

// Определите форму состояния вашего приложения
interface State {
  count: number;
}

// Определите форму ваших действий
interface Action {
  type: string;
  payload?: any; // Определите более конкретный тип, если нужно
}

// Создайте функцию редюсера с типизированным состоянием и действиями
// reducers/MakeOrder.js

const MakeReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case "INCREMENT":
      return {
        ...state,
        count: state.count + (action.payload || 1), // If payload is provided, increment by it; otherwise, increment by 1.
      };
    default:
      return state; // Return the initial state for unknown actions
  }
};

// Определите тип контекста
type OrderContextType = [State, Dispatch<Action>];

// Создайте контекст с определенным типом
const OrderContext = createContext<OrderContextType | undefined>(undefined);

export { MakeReducer, OrderContext };
