import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { newPassword } from "../actions/ResetPasswordThunk";
import { registerAcc } from "../actions/Register";
import { setUserInfo } from "../actions/NewUserInfo";
import { LogOut } from "../actions/LogOut";
import { Enter } from "../actions/Login";
import { resetPassword } from "../actions/ForgotPasswordThunk";
import { getUserInfo } from "../actions/UserInfo";

// Define the structure of the initial state
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
  error: string | null; // error can be a string or null
}

// Initialize the state with the specified types
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

const resetPasswordSlice = createSlice({
  name: "resetPassword",
  initialState,
  reducers: {
    setValue(state, action: PayloadAction<Partial<ResetPasswordState>>) {
      Object.keys(action.payload).forEach((key) => {
        state[key as keyof ResetPasswordState] =
          action.payload[key as keyof ResetPasswordState];
      });
    },
  },
  extraReducers: (builder) => {
    const handleRejected = (state: ResetPasswordState, action: any) => {
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
