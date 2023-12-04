import { useAddObject } from "@features/SelectLocationForm";
import { FC, PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { RouteName } from "../config/routeConfig";

export const ObjectSecureRoute: FC<PropsWithChildren> = (props) => {
  const { children } = props;
  const { isFilled } = useAddObject();

  if (isFilled) {
    return <>{children}</>;
  }

  return <Navigate to={RouteName.ADD_OBJECT} />;
};
