import { useAppSelector } from "@shared/utils/hooks/useAppSelecter";
import { FC, PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

export const ProtectAddObjectRoute: FC<PropsWithChildren> = (props) => {
  const { children } = props;

  const { city, country, objectTypeProperty, region, objectType } =
    useAppSelector((state) => state.addObjectForm);

  if (
    city != undefined &&
    country != undefined &&
    objectType != undefined &&
    region != undefined &&
    objectTypeProperty != undefined
  ) {
    return <>{children}</>;
  }
  return <Navigate to={"/add-object"} />;
};
