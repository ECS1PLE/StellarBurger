import { createAsyncThunk } from "@reduxjs/toolkit";
import checkResponce from "../utils/CheckResponse";

// Define the structure of the parameters for newPassword thunk
interface NewPasswordParams {
  password: string;
  token: string;
}

// Define the newPassword thunk
const newPassword = createAsyncThunk<any, NewPasswordParams>(
  "password/newPass",
  async ({ password, token }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `$https://norma.nomoreparties.space/api/orders/password-reset/reset`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            password,
            token,
          }),
        }
      );

      const result = await checkResponce(response);

      if (result && result.data) {
        return result.data;
      } else {
        return rejectWithValue("Unexpected response structure");
      }
    } catch (error: any) {
      return rejectWithValue(error.message); // Ensure error message is passed to rejectWithValue
    }
  }
);

export { newPassword };
