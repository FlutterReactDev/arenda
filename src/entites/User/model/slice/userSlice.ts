import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserLoginData, UserState } from "../types/UserType";
import { USER_TOKEN } from "@shared/constants/user";
const initialState = {
  userAuthData: undefined,
  userAuthModal: {
    isOpen: false,
  },
  isLoggin: false,
} as UserState;
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

    setOnOpen(state) {
      state.userAuthModal.isOpen = true;
    },

    setOnClose(state) {
      state.userAuthModal.isOpen = false;
    },

    setIsLoggin(state, action) {
      state.isLoggin = action.payload;
    },
  },
});

export const { actions: userAction, reducer: userReducer } = userSlice;
