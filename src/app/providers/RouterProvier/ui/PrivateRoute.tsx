import { getAuthData, useAuthToken } from "@entites/User";
import { FC, PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { RouteName } from "../config/routeConfig";
import { useAppSelector } from "@shared/utils/hooks/useAppSelecter";

export const PrivateRoute: FC<PropsWithChildren> = (props) => {
  const { children } = props;
  const { accessToken } = useAuthToken();
  const userData = useAppSelector(getAuthData);
  const { pathname } = useLocation();
  if (accessToken == undefined || userData == undefined) {
    const routeState = {
      from: pathname,
    };

    return <Navigate to={RouteName.LOGIN_PAGE} state={routeState} />;
  }
  return <>{children}</>;
};
