// burgerIngredientsSlice.test.ts
import { configureStore } from "@reduxjs/toolkit";
import burgerIngredientsReducer, {
  loadIngredients,
  addIngredient,
  removeIngredient,
  clearIngredients,
  addInfo,
  resetError,
} from "../reducers/BurgerIngredientsSlice";
import { ingridientsThunk } from "../actions/IngridientsThunk";

// Mock data
const mockIngredients = [
  { id: "1", name: "Lettuce", price: 1.0 },
  { id: "2", name: "Tomato", price: 0.5 },
];

describe("burgerIngredientsSlice", () => {
  let store: any;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        burgerIngredients: burgerIngredientsReducer,
      },
    });
  });

  it("should handle initial state", () => {
    const state = store.getState().burgerIngredients;
    expect(state.ingredients).toEqual([]);
    expect(state.ingredientsLoading).toBe(false);
    expect(state.ingredientsError).toBe("");
  });

  it("should handle loadIngredients", () => {
    store.dispatch(loadIngredients(mockIngredients));
    const state = store.getState().burgerIngredients;
    expect(state.ingredients).toEqual(mockIngredients);
  });

  it("should handle addIngredient", () => {
    const newIngredient = { id: "3", name: "Cheese", price: 2.0 };
    store.dispatch(addIngredient(newIngredient));
    const state = store.getState().burgerIngredients;
    expect(state.ingredients).toContainEqual(newIngredient);
  });

  it("should handle removeIngredient", () => {
    store.dispatch(loadIngredients(mockIngredients));
    store.dispatch(removeIngredient(mockIngredients[0]));
    const state = store.getState().burgerIngredients;
    expect(state.ingredients).not.toContainEqual(mockIngredients[0]);
  });

  it("should handle clearIngredients", () => {
    store.dispatch(loadIngredients(mockIngredients));
    store.dispatch(clearIngredients());
    const state = store.getState().burgerIngredients;
    expect(state.ingredients).toEqual([]);
  });

  it("should handle addInfo", () => {
    const info = { balance: 5 };
    store.dispatch(addInfo(info));
    const state = store.getState().burgerIngredients;
    expect(state.info).toEqual(info);
  });

  it("should handle resetError", () => {
    store.dispatch(resetError());
    const state = store.getState().burgerIngredients;
    expect(state.ingredientsError).toBe("");
  });

  it("should handle ingridientsThunk pending", () => {
    const action = { type: ingridientsThunk.pending.type };
    store.dispatch(action);
    const state = store.getState().burgerIngredients;
    expect(state.ingredientsLoading).toBe(true);
  });

  it("should handle ingridientsThunk fulfilled", async () => {
    const action = {
      type: ingridientsThunk.fulfilled.type,
      payload: mockIngredients,
    };
    await store.dispatch(action);
    const state = store.getState().burgerIngredients;
    expect(state.ingredients).toEqual(
      mockIngredients.map((item) => ({
        ...item,
        balance: item.price,
      }))
    );
    expect(state.ingredientsLoading).toBe(false);
  });

  it("should handle ingridientsThunk rejected", async () => {
    const action = {
      type: ingridientsThunk.rejected.type,
      payload: "Failed to fetch ingredients",
    };
    await store.dispatch(action);
    const state = store.getState().burgerIngredients;
    expect(state.ingredientsError).toBe("Failed to fetch ingredients");
    expect(state.ingredientsLoading).toBe(false);
  });
});
