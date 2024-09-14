import resetPasswordReducer, { setValue } from "../reducers/ResetPassword";
import {
  newPassword,
  registerAcc,
  setUserInfo,
  LogOut,
  Enter,
  resetPassword,
  getUserInfo,
  initialState,
} from "../reducers/ResetPassword";

describe("resetPasswordSlice", () => {
  it("should return the initial state when called with an undefined state", () => {
    const result = resetPasswordReducer(undefined, { type: "" });
    expect(result).toEqual(initialState);
  });

  it("should handle setValue", () => {
    const previousState = { ...initialState, email: "test@example.com" };
    const action = setValue({
      email: "new-email@example.com",
      name: "New Name",
    });
    const result = resetPasswordReducer(previousState, action);
    expect(result.email).toBe("new-email@example.com");
    expect(result.name).toBe("New Name");
  });

  it("should handle newPassword.rejected", () => {
    const errorAction = {
      type: newPassword.rejected.type,
      error: { message: "Failed to reset password" },
    };
    const result = resetPasswordReducer(initialState, errorAction);
    expect(result.error).toBe("Failed to reset password");
  });

  it("should handle registerAcc.rejected", () => {
    const errorAction = {
      type: registerAcc.rejected.type,
      error: { message: "Registration failed" },
    };
    const result = resetPasswordReducer(initialState, errorAction);
    expect(result.error).toBe("Registration failed");
  });

  it("should handle setUserInfo.rejected", () => {
    const errorAction = {
      type: setUserInfo.rejected.type,
      error: { message: "Failed to set user info" },
    };
    const result = resetPasswordReducer(initialState, errorAction);
    expect(result.error).toBe("Failed to set user info");
  });

  it("should handle LogOut.rejected", () => {
    const errorAction = {
      type: LogOut.rejected.type,
      error: { message: "Log out failed" },
    };
    const result = resetPasswordReducer(initialState, errorAction);
    expect(result.error).toBe("Log out failed");
  });

  it("should handle Enter.rejected", () => {
    const errorAction = {
      type: Enter.rejected.type,
      error: { message: "Login failed" },
    };
    const result = resetPasswordReducer(initialState, errorAction);
    expect(result.error).toBe("Login failed");
  });

  it("should handle resetPassword.rejected", () => {
    const errorAction = {
      type: resetPassword.rejected.type,
      error: { message: "Password reset failed" },
    };
    const result = resetPasswordReducer(initialState, errorAction);
    expect(result.error).toBe("Password reset failed");
  });

  it("should handle getUserInfo.rejected", () => {
    const errorAction = {
      type: getUserInfo.rejected.type,
      error: { message: "Failed to get user info" },
    };
    const result = resetPasswordReducer(initialState, errorAction);
    expect(result.error).toBe("Failed to get user info");
  });
});
