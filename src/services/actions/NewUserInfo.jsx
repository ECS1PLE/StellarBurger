import { createAsyncThunk } from "@reduxjs/toolkit";
import { checkResponce } from "../utils/CheckResponse.js";
import { setValue } from "../reducers/ResetPassword.jsx";

const setUserInfo = createAsyncThunk(
  "user/setUserInfo",
  async ({ email }, { getState, dispatch }) => {
    const accessToken = getState().resetPasswordSlice.accessToken;
    const name = getState().resetPasswordSlice.name;
    try {
      const response = await fetch(
        "https://norma.nomoreparties.space/api/auth/user",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: accessToken,
            email: email,
            name: name,
          },
          body: JSON.stringify({ name, email }),
        }
      );
      const responseData = await checkResponce(response);
      if (responseData) {
        dispatch(
          setValue({
            name: responseData.user.name,
            email: responseData.user.email,
          })
        );
        return responseData;
      } else {
        throw new Error("Ошибка при сохранении данных");
      }
    } catch (error) {
      throw new Error("Ошибка");
    }
  }
);

export { setUserInfo };
