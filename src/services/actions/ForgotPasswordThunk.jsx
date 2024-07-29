import { createAsyncThunk } from "@reduxjs/toolkit";
import { checkResponce } from "../utils/CheckResponse.js";

const resetPassword = createAsyncThunk("password/forgotPass", async (email) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/password-reset`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email }),
    }
  );

  return (await checkResponce(response))?.data;
});

export { resetPassword };
