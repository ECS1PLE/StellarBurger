import { createAsyncThunk } from "@reduxjs/toolkit";
import { checkResponce } from "../utils/CheckResponse.js";

const registerAcc = createAsyncThunk(
  "password/reset",
  async (_, { getState }) => {
    const password = getState().resetPasswordSlice.password;
    const email = getState().resetPasswordSlice.email;
    const name = getState().resetPasswordSlice.name;
    try {
      const response = await fetch(
        "https://norma.nomoreparties.space/api/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email,
            password: password,
            name: name,
          }),
        }
      );

      return (await checkResponce(response))?.data;
    } catch (error) {
      throw new Error("Ошибка");
    }
  }
);

export { registerAcc };
