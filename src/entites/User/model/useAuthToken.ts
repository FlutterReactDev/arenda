import { USER_TOKEN } from "@shared/constants/user";

export const useAuthToken = () => {
  const accessToken = localStorage.getItem(USER_TOKEN.ACCESS_TOKEN);
  const refreshToken = localStorage.getItem(USER_TOKEN.REFRESH_TOKEN);
  return {
    accessToken,
    refreshToken,
  };
};
