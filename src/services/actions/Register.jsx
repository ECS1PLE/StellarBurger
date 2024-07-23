import { createAsyncThunk } from "@reduxjs/toolkit";
import { checkResponce } from "../utils/CheckResponse.js";

const registerAcc = createAsyncThunk(
  "User/Register",
  async (_, { getState }) => {
    const password = getState().resetPasswordSlice.password;
    const email = getState().resetPasswordSlice.email;
    const name = getState().resetPasswordSlice.name;
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/auth/register`,
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
  }
);

export { registerAcc };
