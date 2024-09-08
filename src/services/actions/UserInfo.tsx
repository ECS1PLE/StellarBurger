import { createAsyncThunk } from "@reduxjs/toolkit";
import checkResponce from "../utils/CheckResponse.ts";
import { setValue } from "../reducers/ResetPassword";

interface UserResponse {
  user: {
    name: string;
  };
  data: any;
}

const getUserInfo = createAsyncThunk<UserResponse | undefined, void>(
  "user/getUserInfo",
  async (_, { getState, dispatch }) => {
    const accessToken = getState().resetPasswordSlice.accessToken;

    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: accessToken || "",
      },
    });

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
  }
);

export { getUserInfo };
