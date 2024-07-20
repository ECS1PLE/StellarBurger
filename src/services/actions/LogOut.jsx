import { createAsyncThunk } from "@reduxjs/toolkit";
import { checkResponce } from "../utils/CheckResponse.js";

const LogOut = createAsyncThunk("password/reset", async (_, { getState }) => {
  const refreshToken = getState().resetPasswordSlice.refreshToken;
  try {
    const response = await fetch(
      "https://norma.nomoreparties.space/api/auth/logout",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: refreshToken,
        }),
      }
    );

    return (await checkResponce(response))?.data;
  } catch (error) {
    throw new Error("Ошибка");
  }
});

export { LogOut };
