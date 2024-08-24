import { createAsyncThunk } from "@reduxjs/toolkit";
import checkResponce from "../utils/CheckResponse.ts";

interface Ingredient {
  data: any;
}

interface ApiResponse {
  data: Ingredient[];
}

const ingridientsThunk = createAsyncThunk<
  Ingredient[],
  void,
  { rejectValue: string }
>("burgerIngredients/loadList", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/ingredients`);
    const result: ApiResponse = await checkResponce(response);
    return result.data;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export { ingridientsThunk };
