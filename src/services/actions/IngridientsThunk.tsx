import { createAsyncThunk } from "@reduxjs/toolkit";
import checkResponce from "../utils/CheckResponse";

interface Ingredient {
  id: string;
  name: string;
  price: number;
}

interface ApiResponse {
  data: Ingredient[];
}

const apiUrl = "https://norma.nomoreparties.space/api";

const ingridientsThunk = createAsyncThunk<
  Ingredient[],
  void,
  { rejectValue: string }
>("burgerIngredients/loadList", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(`${apiUrl}/ingredients`);
    const result: ApiResponse = await checkResponce(response);
    return result.data;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export { ingridientsThunk };
