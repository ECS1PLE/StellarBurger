import { createSlice } from "@reduxjs/toolkit";
import { newPassword } from "../actions/ResetPasswordThunk";
import { registerAcc } from "../actions/Register";
import { setUserInfo } from "../actions/NewUserInfo";
import { LogOut } from "../actions/LogOut";
import { Enter } from "../actions/Login";
import { resetPassword } from "../actions/ForgotPasswordThunk";
import { getUserInfo } from "../actions/UserInfo";

const initialState = {
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

const resetPasswordSlice = createSlice({
  name: "resetPassword",
  initialState,
  reducers: {
    setValue(state, action) {
      Object.keys(action.payload).forEach((key) => {
        state[key] = action.payload[key];
      });
    },
  },
  extraReducers: (builder) => {
    const handleRejected = (state, action) => {
      state.error = action.error.message;
    };

    builder
      .addCase(newPassword.rejected, handleRejected)
      .addCase(registerAcc.rejected, handleRejected)
      .addCase(setUserInfo.rejected, handleRejected)
      .addCase(LogOut.rejected, handleRejected)
      .addCase(Enter.rejected, handleRejected)
      .addCase(resetPassword.rejected, handleRejected)
      .addCase(getUserInfo.rejected, handleRejected);
  },
});

export const { setValue } = resetPasswordSlice.actions;
export default resetPasswordSlice.reducer;

export {
  getUserInfo,
  newPassword,
  registerAcc,
  setUserInfo,
  LogOut,
  Enter,
  resetPassword,
};
