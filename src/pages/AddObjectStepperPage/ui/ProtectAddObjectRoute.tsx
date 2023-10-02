import { useAppSelector } from "@shared/utils/hooks/useAppSelecter";
import { FC, PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

export const ProtectAddObjectRoute: FC<PropsWithChildren> = (props) => {
  const { children } = props;

  const { city, country, object, region, objectType } = useAppSelector(
    (state) => state.addObjectForm
  );

  if (
    city != undefined &&
    country != undefined &&
    object != undefined &&
    region != undefined &&
    objectType != undefined
  ) {
    return <>{children}</>;
  }
  return <Navigate to={"/add-object"} />;
};
