import { configureStore } from "@reduxjs/toolkit";
import burgerIngredientsReducer from "./BurgerIngredientsSlice";
import OrderSlice from "./OrderSlice";

const store = configureStore({
  reducer: {
    burgerIngredients: burgerIngredientsReducer,
    OrderSlice: OrderSlice,
  },
});
export default store;
