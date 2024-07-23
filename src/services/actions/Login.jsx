import { createAsyncThunk } from "@reduxjs/toolkit";
import { checkResponce } from "../utils/CheckResponse.js";
import { setValue } from "../reducers/ResetPassword.jsx";
import Cookies from "js-cookie";

const Enter = createAsyncThunk(
  "User/Login",
  async (_, { getState, dispatch }) => {
    const { password, email } = getState().resetPasswordSlice;

    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
    });

    const responseData = await checkResponce(response);
    const data = responseData?.data;

    if (responseData) {
      console.log(responseData);
      const cookiesData = {
        accessToken: responseData.accessToken,
        refreshToken: responseData.refreshToken,
        email: email,
        password: password,
        name: responseData.user.name,
        statusAuth: true,
      };

      for (const [key, value] of Object.entries(cookiesData)) {
        Cookies.set(key, value, {
          expires: key === "accessToken" ? 20 / (24 * 60) : undefined,
        });
      }

      dispatch(
        setValue({
          statusAuth: responseData.success,
          refreshToken: responseData.refreshToken,
          accessToken: responseData.accessToken,
          email: email,
          password: password,
          name: responseData.user.name,
        })
      );
    } else {
      dispatch(setValue({ statusAuth: false }));
    }

    return data;
  }
);

export { Enter };
