import { createAsyncThunk } from "@reduxjs/toolkit";
import checkResponce from "../utils/CheckResponse.ts";

interface ResetPasswordSliceState {
  password: string;
  email: string;
  name: string;
}

interface RegisterResponse {
  data: any;
}

const registerAcc = createAsyncThunk<
  RegisterResponse,
  void,
  { state: { resetPasswordSlice: ResetPasswordSliceState } }
>("User/Register", async (_, { getState }) => {
  const { password, email, name } = getState().resetPasswordSlice;
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/auth/register`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    }
  );

  return (await checkResponce(response))?.data;
});

export { registerAcc };
