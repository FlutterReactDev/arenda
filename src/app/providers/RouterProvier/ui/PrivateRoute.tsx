import { useAuth } from "@entites/User";
import { FC, PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { RouteName } from "../config/routeConfig";

export const PrivateRoute: FC<PropsWithChildren> = (props) => {
  const { children } = props;
  const { isLoggin } = useAuth();
  const { pathname } = useLocation();

  if (!isLoggin) {
    const routeState = {
      from: pathname,
    };

    return <Navigate to={RouteName.LOGIN_PAGE} state={routeState} />;
  }

  return <>{children}</>;
};
