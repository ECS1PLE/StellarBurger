import { createAsyncThunk } from "@reduxjs/toolkit";
import checkResponce from "../utils/CheckResponse.ts";
import { setValue } from "../reducers/ResetPassword.js";

interface UserInfo {
  email: string;
}

interface UserResponse {
  user: {
    name: string;
    email: string;
  };
}

const setUserInfo = createAsyncThunk<UserResponse, UserInfo>(
  "user/setUserInfo",
  async ({ email }, { getState, dispatch }) => {
    const { accessToken, name } = getState().resetPasswordSlice;

    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/user`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify({ name, email }),
    });

    const responseData = await checkResponce(response);
    if (responseData) {
      dispatch(
        setValue({
          name: responseData.user.name,
          email: responseData.user.email,
        })
      );
      return responseData;
    }
  }
);

export { setUserInfo };
