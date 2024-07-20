import { createAsyncThunk } from "@reduxjs/toolkit";
import { checkResponce } from "../utils/CheckResponse.js";
import { setValue } from "../reducers/ResetPassword.jsx";

const getUserInfo = createAsyncThunk(
  "user/getUserInfo",
  async (_, { getState, dispatch }) => {
    const accessToken = getState().resetPasswordSlice.accessToken;
    try {
      const response = await fetch(
        "https://norma.nomoreparties.space/api/auth/user",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: accessToken,
          },
        }
      );
      const responseData = await checkResponce(response);
      const data = responseData?.data;
      if (responseData) {
        console.log(responseData);

        dispatch(
          setValue({
            name: responseData.user.name,
          })
        );
      }
      return data;
    } catch (error) {
      throw new Error("Ошибка");
    }
  }
);

export { getUserInfo };
