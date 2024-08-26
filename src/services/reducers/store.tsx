import { configureStore } from "@reduxjs/toolkit";
import burgerIngredientsReducer from "./BurgerIngredientsSlice";
import OrderSlice from "./OrderSlice";
import resetPasswordSlice from "./ResetPassword";
import UserOrders from "./UserOrders";

export type RootState = ReturnType<typeof store.getState>;

const store = configureStore({
  reducer: {
    burgerIngredients: burgerIngredientsReducer,
    OrderSlice: OrderSlice,
    resetPasswordSlice: resetPasswordSlice,
    UserOrders: UserOrders,
  },
});
export default store;
