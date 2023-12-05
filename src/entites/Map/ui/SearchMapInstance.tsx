import { useMapContext } from "@shared/ui/2GIS/Map2GIS";
import { useEffect } from "react";
import { useSearchMap } from "..";

export const SearchMapInstance = () => {
  const { zoom, center, isMoving, setBounds } = useSearchMap();
  const { mapInstance } = useMapContext();
  useEffect(() => {
    mapInstance?.setLanguage("ru");
  }, [mapInstance]);

  useEffect(() => {
    mapInstance?.setZoom(zoom);
  }, [mapInstance, zoom]);

  useEffect(() => {
    mapInstance?.setCenter(center);
  }, [mapInstance, center]);

  useEffect(() => {
    if (isMoving && mapInstance) {
      setBounds(mapInstance?.getBounds());
    }
  }, [isMoving]);

  return <></>;
};
