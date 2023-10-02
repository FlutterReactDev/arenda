import { useMapContext } from "@shared/ui/2GIS/Map2GIS";
import { FC, useEffect } from "react";
interface RegionCenterProps {
  center: number[];
}
export const RegionCenter: FC<RegionCenterProps> = (props) => {
  const { center } = props;
  const { mapInstance } = useMapContext();

  useEffect(() => {
    mapInstance?.setZoom(15);
    mapInstance?.setCenter(center);
  }, [center, mapInstance]);

  return <></>;
};
