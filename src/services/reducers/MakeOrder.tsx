import { createContext, Dispatch, ReactNode } from "react";

// Define the shape of your application state
interface State {
  // Define your state properties here
  // For example:
  // count: number;
}

// Define the shape of your actions
interface Action {
  type: string;
  payload?: any; // Define a more specific type if needed
}

// Create a reducer function with typed state and action
const MakeReducer = (state: State, action: Action): State => {
  switch (action.type) {
    default:
      return state;
  }
};

// Define the context type
type OrderContextType = [State, Dispatch<Action>];

// Create the context with the defined type
const OrderContext =
  (createContext < OrderContextType) | (undefined > undefined);

export { MakeReducer, OrderContext };
