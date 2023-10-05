import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserAuthData, UserLoginData } from "../types/UserType";
import { USER_TOKEN } from "@shared/constants/user";
const initialState = {
  userAuthData: undefined,
} as UserAuthData;
const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setAuthData(state, action: PayloadAction<UserLoginData>) {
      state.userAuthData = action.payload;
      localStorage.setItem(USER_TOKEN.ACCESS_TOKEN, action.payload.accessToken);
      localStorage.setItem(
        USER_TOKEN.REFRESH_TOKEN,
        action.payload.refreshToken.tokenString
      );
    },
    logout(state) {
      state.userAuthData = undefined;
      localStorage.removeItem(USER_TOKEN.ACCESS_TOKEN);
      localStorage.removeItem(USER_TOKEN.REFRESH_TOKEN);
    },
  },
});

export const { actions: userAction, reducer: userReducer } = userSlice;
