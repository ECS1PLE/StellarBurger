import { createAsyncThunk } from "@reduxjs/toolkit";
import checkResponse from "../utils/CheckResponse";

interface ResetPasswordSliceState {
  password: string;
  email: string;
  name: string;
}

interface RegisterResponse {
  data: any; // Измените тип на более конкретный, если возможно
}

const registerAcc = createAsyncThunk<
  RegisterResponse,
  void,
  {
    state: { resetPasswordSlice: ResetPasswordSliceState };
    rejectValue: unknown;
  }
>("User/Register", async (_, { getState, rejectWithValue }) => {
  const { password, email, name } = getState().resetPasswordSlice;
  const response = await fetch(
    `https://norma.nomoreparties.space/api/orders/auth/register`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    }
  );

  try {
    const data = await checkResponse(response); // Проверьте, что это возвращает RegisterResponse
    return data; // Предполагается, что checkResponce возвращает RegisterResponse
  } catch (error) {
    return rejectWithValue(error); // Если произошла ошибка, возвращаем RejectWithValue
  }
});

export { registerAcc };
