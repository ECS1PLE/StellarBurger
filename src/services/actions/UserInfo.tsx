import { createAsyncThunk } from "@reduxjs/toolkit";
import checkResponse from "../utils/CheckResponse";
import { setValue } from "../reducers/ResetPassword";

// Define the UserResponse interface
interface UserResponse {
  user: {
    name: string;
  };
  data: any; // You can define a more precise type here if you know the expected structure.
}

// Define the state interface of your resetPasswordSlice
interface RootState {
  resetPasswordSlice: {
    accessToken: string;
    // other properties in your slice if needed
  };
}

const getUserInfo = createAsyncThunk<UserResponse | undefined, void>(
  "user/getUserInfo",
  async (_, { getState, dispatch }) => {
    // Cast the state to your defined type
    const accessToken = (getState() as RootState).resetPasswordSlice
      .accessToken;

    const response = await fetch(
      `https://norma.nomoreparties.space/api/auth/user`, // Use the correct URL without extra `$`
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: accessToken || "",
        },
      }
    );

    // Use checkResponse to handle the response
    const responseData = await checkResponse(response);

    // Type Guard to ensure responseData is of type UserResponse
    if (isUserResponse(responseData)) {
      console.log(responseData);
      dispatch(setValue({ name: responseData.user.name }));
      return responseData;
    }

    // Return undefined if the structure doesn't match
    return undefined;
  }
);

// Type guard function
function isUserResponse(data: any): data is UserResponse {
  return (
    data && typeof data.user === "object" && typeof data.user.name === "string"
  );
}

export { getUserInfo };
