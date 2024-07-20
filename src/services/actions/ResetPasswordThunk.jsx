import { createAsyncThunk } from "@reduxjs/toolkit";
import { checkResponce } from "../utils/CheckResponse.js";

const newPassword = createAsyncThunk(
  "password/reset",
  async ({ password, token }) => {
    try {
      const response = await fetch(
        "https://norma.nomoreparties.space/api/password-reset/reset",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            password: password,
            token: token,
          }),
        }
      );

      return (await checkResponce(response))?.data;
    } catch (error) {
      throw new Error("Ошибка");
    }
  }
);

export { newPassword };
