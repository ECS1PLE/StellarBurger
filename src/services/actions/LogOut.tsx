import { createAsyncThunk } from "@reduxjs/toolkit";
import checkResponce from "../utils/CheckResponse";

interface LogoutResponse {
  data?: any;
}

interface RootState {
  resetPasswordSlice: {
    refreshToken: string;
  };
}

const LogOut = createAsyncThunk<
  LogoutResponse | undefined,
  void,
  { state: RootState }
>("User/LogOut", async (_, { getState }) => {
  const refreshToken = getState().resetPasswordSlice.refreshToken;
  const response = await fetch(
    `https://norma.nomoreparties.space/api/auth/logout`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: refreshToken,
      }),
    }
  );

  return (await checkResponce(response))?.data;
});

export { LogOut };
