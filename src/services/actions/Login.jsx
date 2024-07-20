import { createAsyncThunk } from "@reduxjs/toolkit";
import { checkResponce } from "../utils/CheckResponse.js";
import { setValue } from "../reducers/ResetPassword.jsx";

const Enter = createAsyncThunk(
  "password/reset",
  async (_, { getState, dispatch }) => {
    const password = getState().resetPasswordSlice.password;
    const email = getState().resetPasswordSlice.email;
    try {
      const response = await fetch(
        "https://norma.nomoreparties.space/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email, password: password }),
        }
      );
      const responseData = await checkResponce(response);
      const data = responseData?.data;
      if (responseData) {
        console.log(responseData);

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
    } catch (error) {
      throw new Error("Ошибка");
    }
  }
);

export { Enter };
