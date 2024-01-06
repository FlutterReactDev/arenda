import { FC, PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { RouteName } from "../config/routeConfig";
import { useUser } from "@entites/User/model/useUser";
interface PrivateRouteProps {
  requiredVerify: boolean;
}
export const PrivateRoute: FC<PropsWithChildren<PrivateRouteProps>> = (
  props
) => {
  const { children, requiredVerify } = props;
  const { currentUser } = useUser();

  const { pathname } = useLocation();

  if (!currentUser) {
    const routeState = {
      from: pathname,
    };

    return <Navigate to={RouteName.LOGIN_PAGE} state={routeState} />;
  }

  if (requiredVerify && !currentUser.emaiIsVerified) {
    return <Navigate to={RouteName.VERIFY_PAGE} />;
  }

  return <>{children}</>;
};
