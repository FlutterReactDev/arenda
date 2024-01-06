import { useAppDispatch } from "@shared/utils/hooks/useAppDispatch";
import { useAppSelector } from "@shared/utils/hooks/useAppSelecter";
import { UserLoginData, userAction } from "..";
import { getIsLoggin } from "./selectors";
import { USER_TOKEN } from "@shared/constants/user";
import { UserData } from "./types/UserType";
export const useAuth = () => {
  const isLoggin = useAppSelector(getIsLoggin);
  const dispatch = useAppDispatch();
  const login = (data: UserLoginData) => {
    dispatch(userAction.setAuthData(data));
    localStorage.setItem(
      USER_TOKEN.REFRESH_TOKEN,
      data.refreshToken.tokenString
    );
  };

  const logout = () => {
    dispatch(userAction.logout());
  };

  const setUserData = (data: UserData) => {
    dispatch(userAction.setUserData(data));
  };

  return {
    login,
    logout,
    isLoggin,
    setUserData,
  };
};
