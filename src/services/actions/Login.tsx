import { createAsyncThunk } from "@reduxjs/toolkit";
import checkResponse from "../utils/CheckResponse";
import { setValue } from "../reducers/ResetPassword";
import Cookies from "js-cookie";

interface RootState {
  resetPasswordSlice: {
    password: string;
    email: string;
  };
}

// Define a type for the response data structure
interface LoginResponse {
  success: boolean;
  accessToken?: string;
  refreshToken?: string;
  user?: {
    name: string;
  };
}

const Enter = createAsyncThunk<any, void, { state: RootState }>(
  "User/Login",
  async (_, { getState, dispatch }) => {
    const { password, email } = getState().resetPasswordSlice;

    const response = await fetch(
      `https://norma.nomoreparties.space/api/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );

    const responseData: LoginResponse = await checkResponse(response); // Cast to LoginResponse here

    // Use optional chaining to safely access properties
    if (responseData?.success) {
      const accessToken = responseData.accessToken;
      const refreshToken = responseData.refreshToken;
      const userName = responseData.user?.name;

      const cookiesData = {
        accessToken,
        refreshToken,
        email,
        password,
        name: userName,
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
          refreshToken,
          accessToken,
          email,
          password,
          name: userName,
        })
      );
    } else {
      dispatch(setValue({ statusAuth: false }));
    }

    return responseData; // Ensure responseData is returned correctly
  }
);

export { Enter };
