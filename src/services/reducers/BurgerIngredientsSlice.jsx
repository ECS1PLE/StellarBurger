import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ingredients: [],
};

export const burgerIngredientsSlice = createSlice({
  name: "burgerIngredients",
  initialState,
  reducers: {
    loadIngridients: (state, action) => {
      state.ingredients = [...action.payload];
    },
    addIngredient: (state, action) => {
      state.ingredients.push(action.payload);
    },
    removeIngredient: (state, action) => {
      state.ingredients = state.ingredients.filter(
        (ing) => ing !== action.payload
      );
    },
    clearIngredients: (state) => {
      state.ingredients = [];
    },
    addInfo: (state, action) => {
      state.info = { ...action.payload };
    },
  },
});

export const {
  addIngredient,
  removeIngredient,
  clearIngredients,
  loadIngridients,
  addInfo,
} = burgerIngredientsSlice.actions;

export default burgerIngredientsSlice.reducer;
