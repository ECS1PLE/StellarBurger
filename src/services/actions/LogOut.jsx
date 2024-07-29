import { createAsyncThunk } from "@reduxjs/toolkit";
import { checkResponce } from "../utils/CheckResponse.js";

const LogOut = createAsyncThunk("User/LogOut", async (_, { getState }) => {
  const refreshToken = getState().resetPasswordSlice.refreshToken;
  const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      token: refreshToken,
    }),
  });

  return (await checkResponce(response))?.data;
});

export { LogOut };
