import { createAsyncThunk } from "@reduxjs/toolkit";
import checkResponse from "../utils/CheckResponse";
import { setValue } from "../reducers/ResetPassword";

// Определяем интерфейс состояния
interface RootState {
  resetPasswordSlice: {
    accessToken?: string;
    name?: string;
  };
}

interface UserInfo {
  email: string;
}

interface UserResponse {
  user: {
    name: string;
    email: string;
  };
}

// Уточняем ApiResponse чтобы соответствовал фактическому ответу
interface ApiResponse {
  user?: {
    name: string;
    email: string;
  };
}

// Указываем тип состояния в createAsyncThunk
const setUserInfo = createAsyncThunk<UserResponse, UserInfo>(
  "user/setUserInfo",
  async ({ email }, { getState, dispatch }) => {
    const state: RootState = getState() as RootState;
    const { accessToken, name } = state.resetPasswordSlice || {};

    if (!accessToken || !name) {
      return Promise.reject(new Error("Access token or name is missing"));
    }

    const response = await fetch(
      `https://norma.nomoreparties.space/api/auth/user`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
        body: JSON.stringify({ name, email }),
      }
    );

    // Здесь ожидаем, что checkResponse вернет ApiResponse
    const responseData = (await checkResponse(response)) as ApiResponse; // Явное указание типа

    // Проверяем наличие user в responseData
    if (responseData && responseData.user) {
      const userData: UserResponse = {
        user: {
          name: responseData.user.name,
          email: responseData.user.email,
        },
      };

      dispatch(
        setValue({
          name: userData.user.name,
          email: userData.user.email,
        })
      );
      return userData;
    }

    return Promise.reject(new Error("Response data is invalid"));
  }
);

export { setUserInfo };
