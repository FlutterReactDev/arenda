import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserLoginData, UserState } from "../types/UserType";
import { USER_TOKEN } from "@shared/constants/user";
import { USER_CURRENCY } from "../../constant/user";

const defaultCurrency = {
  id: 417,
  symbol: "KGS",
  name: "Сом",
};
const initialState = {
  userAuthData: undefined,
  userAuthModal: {
    isOpen: false,
  },
  userCurrency:
    JSON.parse(localStorage.getItem(USER_CURRENCY) as string) ||
    defaultCurrency,
  isLoaded: false,
} as UserState;

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setAuthData(state, action: PayloadAction<UserLoginData>) {
      state.userAuthData = action.payload;
    },
    setUserData(state, action) {
      state.userData = action.payload;
      state.isLoaded = true;
    },

    logout(state) {
      state.userAuthData = undefined;
      state.userData = undefined;
      localStorage.removeItem(USER_TOKEN.REFRESH_TOKEN);
    },

    setOnOpen(state) {
      state.userAuthModal.isOpen = true;
    },

    setOnClose(state) {
      state.userAuthModal.isOpen = false;
    },

    setCurrency(state, action) {
      state.userCurrency = action.payload;
    },
  },
});

export const { actions: userAction, reducer: userReducer } = userSlice;
