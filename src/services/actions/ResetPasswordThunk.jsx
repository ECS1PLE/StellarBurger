import { createAsyncThunk } from "@reduxjs/toolkit";
import { checkResponce } from "../utils/CheckResponse.js";

const newPassword = createAsyncThunk(
  "password/newPass",
  async ({ password, token }) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/password-reset/reset`,
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
  }
);

export { newPassword };
