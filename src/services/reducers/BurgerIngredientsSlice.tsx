import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ingridientsThunk } from "../actions/IngridientsThunk";

interface Ingredient {
  id: string;
  name: string;
  price: number;
  balance?: number;
}

interface BurgerIngredientsState {
  ingredients: Ingredient[];
  ingredientsLoading: boolean;
  ingredientsError: string;
  info?: Partial<Ingredient>;
}

const initialState: BurgerIngredientsState = {
  ingredients: [],
  ingredientsLoading: false,
  ingredientsError: "",
};

const burgerIngredientsSlice = createSlice({
  name: "burgerIngredients",
  initialState,
  reducers: {
    loadIngredients: (state, action: PayloadAction<Ingredient[]>) => {
      state.ingredients = action.payload;
    },
    addIngredient: (state, action: PayloadAction<Ingredient>) => {
      state.ingredients.push(action.payload);
    },
    removeIngredient: (state, action: PayloadAction<Ingredient>) => {
      state.ingredients = state.ingredients.filter(
        (ing) => ing.id !== action.payload.id
      );
    },
    clearIngredients: (state) => {
      state.ingredients = [];
    },
    addInfo: (state, action: PayloadAction<Partial<Ingredient>>) => {
      state.info = { ...state.info, ...action.payload };
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
        state.ingredients = action.payload.map((item) => ({
          ...item,
          balance: item.price,
        }));
      })
      .addCase(ingridientsThunk.rejected, (state, action) => {
        state.ingredientsLoading = false;
        state.ingredientsError = action.payload || "Error fetching ingredients";
      });
  },
});

// Export actions
export const {
  loadIngredients,
  addIngredient,
  removeIngredient,
  clearIngredients,
  addInfo,
  resetError,
} = burgerIngredientsSlice.actions;

// Export reducer
export default burgerIngredientsSlice.reducer;
