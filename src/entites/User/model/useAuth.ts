import { USER_TOKEN } from "@shared/constants/user";
import { useAppDispatch } from "@shared/utils/hooks/useAppDispatch";
import { useState } from "react";
import { UserLoginData, userAction } from "..";

export const useAuth = () => {
  const dispatch = useAppDispatch();

  const [accessToken, setAccessToken_] = useState(
    localStorage.getItem(USER_TOKEN.ACCESS_TOKEN)
  );

  const [refreshToken, setRefreshToken_] = useState(
    localStorage.getItem(USER_TOKEN.REFRESH_TOKEN)
  );

  const login = (data: UserLoginData) => {
    dispatch(userAction.setAuthData(data));
    setAccessToken_(data.accessToken);
    setRefreshToken_(data.refreshToken.tokenString);
  };

  const logout = () => {
    dispatch(userAction.logout());
    setAccessToken_("");
    setRefreshToken_("");
  };

  const setAccessToken = (token: string) => {
    setAccessToken_(token);
  };

  const setRefreshToken = (token: string) => {
    setRefreshToken_(token);
  };

  return {
    login,
    logout,
    isLoggin: accessToken || refreshToken,
    setAccessToken,
    setRefreshToken,
    accessToken,
    refreshToken,
  };
};
