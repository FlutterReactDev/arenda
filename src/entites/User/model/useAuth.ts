import { useAppSelector } from "@shared/utils/hooks/useAppSelecter";
import { getAuthData, useAuthToken } from "..";

export const useAuth = () => {
  const authData = useAppSelector(getAuthData);
  const { accessToken, refreshToken } = useAuthToken();

  return {
    isLoggin: !!authData != undefined || accessToken || refreshToken,
  };
};
