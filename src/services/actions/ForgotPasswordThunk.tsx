import { createAsyncThunk } from "@reduxjs/toolkit";
import checkResponce from "../utils/CheckResponse.ts";

interface ResetPasswordResponse {
  data: any;
}

const resetPassword = createAsyncThunk<
  ResetPasswordResponse | undefined,
  string
>("password/forgotPass", async (email: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/password-reset`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    }
  );

  return (await checkResponce(response))?.data;
});

export { resetPassword };
