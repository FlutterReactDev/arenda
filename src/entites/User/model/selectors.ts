import { RootState } from "@app/providers/StoreProvider";

export const getAuthData = (state: RootState) => state.user.userAuthData;

export const getIsLoggin = (state: RootState) => state.user.isLoggin;

export const getCurrency = (state: RootState) => state.user.userCurrency;
export const getUser = (state: RootState) => state.user.userData;
