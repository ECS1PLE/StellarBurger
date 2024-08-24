import { createAsyncThunk } from "@reduxjs/toolkit";
import checkResponce from "../utils/CheckResponse.ts";

interface NewPasswordParams {
  password: string;
  token: string;
}

const newPassword = createAsyncThunk<any, NewPasswordParams>(
  "password/newPass",
  async ({ password, token }) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/password-reset/reset`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password,
          token,
        }),
      }
    );

    return (await checkResponce(response))?.data;
  }
);

export { newPassword };
