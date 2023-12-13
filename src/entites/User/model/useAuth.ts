import { USER_TOKEN } from "@shared/constants/user";
import { useAppDispatch } from "@shared/utils/hooks/useAppDispatch";
import { useEffect, useState } from "react";
import { UserLoginData, userAction } from "..";
import { useAppSelector } from "@shared/utils/hooks/useAppSelecter";
import { getIsLoggin } from "./selectors";

export const useAuth = () => {
  const isLoggin = useAppSelector(getIsLoggin);
  const dispatch = useAppDispatch();

  const [accessToken, setAccessToken_] = useState(
    localStorage.getItem(USER_TOKEN.ACCESS_TOKEN) || ""
  );

  const [refreshToken, setRefreshToken_] = useState(
    localStorage.getItem(USER_TOKEN.REFRESH_TOKEN) || ""
  );

  const setAccessToken = (token: string) => {
    setAccessToken_(token);
  };

  const setRefreshToken = (token: string) => {
    setRefreshToken_(token);
  };

  const login = (data: UserLoginData) => {
    dispatch(userAction.setAuthData(data));
    setAccessToken_(data.accessToken);
    setRefreshToken_(data.refreshToken.tokenString);
    dispatch(userAction.setIsLoggin(true));
  };

  const logout = () => {
    dispatch(userAction.logout());
    setAccessToken_("");
    setRefreshToken_("");
    dispatch(userAction.setIsLoggin(false));
  };

  useEffect(() => {
    if (accessToken.length > 0 && refreshToken.length > 0) {
      dispatch(userAction.setIsLoggin(true));
    }
  }, []);

  return {
    login,
    logout,
    isLoggin,
    setAccessToken,
    setRefreshToken,
    accessToken,
    refreshToken,
  };
};
