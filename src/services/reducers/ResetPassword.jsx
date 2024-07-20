import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  password: "",
  token: "",
  name: "",
  statusAuth: false,
  refreshToken: "",
  accessToken: "",
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
});

export const { setValue } = resetPasswordSlice.actions;

export default resetPasswordSlice.reducer;
