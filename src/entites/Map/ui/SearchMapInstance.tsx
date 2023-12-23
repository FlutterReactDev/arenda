import { useMapContext } from "@shared/ui/2GIS/Map2GIS";
import { useEffect } from "react";
import { useSearchMap } from "..";

export const SearchMapInstance = () => {
  const { setMapInstance } = useSearchMap();
  const { mapInstance } = useMapContext();

  useEffect(() => {
    if (mapInstance) {
      setMapInstance(mapInstance);
    }
  }, [mapInstance]);

  return <></>;
};
