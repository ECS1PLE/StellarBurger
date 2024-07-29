import { configureStore } from "@reduxjs/toolkit";
import burgerIngredientsReducer from "./BurgerIngredientsSlice";
import OrderSlice from "./OrderSlice";
import resetPasswordSlice from "./ResetPassword";

const store = configureStore({
  reducer: {
    burgerIngredients: burgerIngredientsReducer,
    OrderSlice: OrderSlice,
    resetPasswordSlice: resetPasswordSlice,
  },
});
export default store;
