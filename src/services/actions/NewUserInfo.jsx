import { createAsyncThunk } from "@reduxjs/toolkit";
import { checkResponce } from "../utils/CheckResponse.js";
import { setValue } from "../reducers/ResetPassword.jsx";

const setUserInfo = createAsyncThunk(
  "user/setUserInfo",
  async ({ email }, { getState, dispatch }) => {
    const accessToken = getState().resetPasswordSlice.accessToken;
    const name = getState().resetPasswordSlice.name;
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/user`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
        email: email,
        name: name,
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
