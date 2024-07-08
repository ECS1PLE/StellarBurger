import { createSlice } from "@reduxjs/toolkit";
import { ingridientsThunk } from "../actions/IngridientsThunk";
//import postOrder from "../actions/MakeOrderThunk";

const initialState = {
  ingredients: [],
  ingredientsLoading: false,
  ingredientsError: "",
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
    resetError: (state) => {
      state.ingredientsError = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(ingridientsThunk.pending, (state) => {
        state.ingredientsLoading = true;
      })
      .addCase(ingridientsThunk.fulfilled, (state, action) => {
        state.ingredientsLoading = false;
        state.ingredients = action.payload?.map((item) => ({
          ...item,
          balance: item.price,
        }));
      })
      .addCase(ingridientsThunk.rejected, (state, action) => {
        state.ingredientsLoading = false;
        state.ingredientsError = action.payload;
      });
  },
});

export const {
  addIngredient,
  removeIngredient,
  clearIngredients,
  loadIngridients,
  addInfo,
  resetError,
} = burgerIngredientsSlice.actions;

export default burgerIngredientsSlice.reducer;
