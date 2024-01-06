import { useMapContext } from "@shared/ui/2GIS/Map2GIS";
import { useEffect } from "react";
import { useSearchMap } from "..";

export const SearchMapInstance = () => {
  const { setMapInstance, setMapGlBundle } = useSearchMap();
  const { mapInstance, mapGLBundle } = useMapContext();

  useEffect(() => {
    if (mapInstance) {
      setMapInstance(mapInstance);
    }
    if (mapGLBundle) {
      setMapGlBundle(mapGLBundle);
    }
  }, [mapInstance]);

  return <></>;
};
