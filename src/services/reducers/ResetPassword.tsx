import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { newPassword } from "../actions/ResetPasswordThunk";
import { registerAcc } from "../actions/Register";
import { setUserInfo } from "../actions/NewUserInfo";
import { LogOut } from "../actions/LogOut";
import { Enter } from "../actions/Login";
import { resetPassword } from "../actions/ForgotPasswordThunk";
import { getUserInfo } from "../actions/UserInfo";

interface ResetPasswordState {
  email: string;
  password: string;
  token: string;
  name: string;
  statusAuth: boolean;
  refreshToken: string;
  accessToken: string;
  resetToken: boolean;
  from: string;
  error: null | string;
}

const initialState: ResetPasswordState = {
  email: "",
  password: "",
  token: "",
  name: "",
  statusAuth: false,
  refreshToken: "",
  accessToken: "",
  resetToken: false,
  from: "",
  error: null,
};

// Define the slice
const resetPasswordSlice = createSlice({
  name: "resetPassword",
  initialState,
  reducers: {
    setValue(state, action: PayloadAction<Partial<ResetPasswordState>>) {
      const updates = action.payload;
      Object.entries(updates).forEach(([key, value]) => {
        if (key in state) {
          // @ts-ignore
          state[key] = value!;
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(newPassword.rejected, (state, action) => {
        state.error = action.error.message ?? "An error occurred";
      })
      .addCase(registerAcc.rejected, (state, action) => {
        state.error = action.error.message ?? "An error occurred";
      })
      .addCase(setUserInfo.rejected, (state, action) => {
        state.error = action.error.message ?? "An error occurred";
      })
      .addCase(LogOut.rejected, (state, action) => {
        state.error = action.error.message ?? "An error occurred";
      })
      .addCase(Enter.rejected, (state, action) => {
        state.error = action.error.message ?? "An error occurred";
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.error = action.error.message ?? "An error occurred";
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.error = action.error.message ?? "An error occurred";
      });
  },
});

export const { setValue } = resetPasswordSlice.actions;

export default resetPasswordSlice.reducer;

// Exporting actions
export {
  getUserInfo,
  newPassword,
  registerAcc,
  setUserInfo,
  LogOut,
  Enter,
  resetPassword,
};
