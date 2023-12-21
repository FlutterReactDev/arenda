import { USER_TOKEN } from "@shared/constants/user";
import { useAppDispatch } from "@shared/utils/hooks/useAppDispatch";
import { useAppSelector } from "@shared/utils/hooks/useAppSelecter";
import { parseISO } from "date-fns";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { UserLoginData, userAction } from "..";
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
    Cookies.set("accessToken", data.accessToken, {
      expires: parseISO(data.accessTokenExpireAt),
    });

    Cookies.set("refreshToken", data.refreshToken.tokenString, {
      expires: parseISO(data.refreshToken.expireAt),
    });

    setAccessToken_(data.accessToken);
    setRefreshToken_(data.refreshToken.tokenString);

    dispatch(userAction.setIsLoggin(true));
    dispatch(userAction.setAuthData(data));
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
