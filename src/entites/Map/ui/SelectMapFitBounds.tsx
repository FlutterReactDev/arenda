import { useMapContext } from "@shared/ui/2GIS/Map2GIS";
import { FC, useEffect } from "react";
import { useSelectMap } from "..";
import { getBoundsOfCoords } from "../model/utils";

export const SelectMapFitBounds: FC = () => {
  const { markers, selectedObject } = useSelectMap();
  const { mapInstance } = useMapContext();

  useEffect(() => {
    if (selectedObject) {
      const { latitude, longitude } = selectedObject;

      mapInstance?.fitBounds(
        {
          northEast: [longitude, latitude],
          southWest: [longitude, latitude],
        },
        {
          padding: { top: 40, left: 60, bottom: 40, right: 60 },
        }
      );

      return;
    }

    if (markers.length) {
      const coords = markers
        .map((item) => {
          return item.point;
        })
        .map((coords) => {
          return [coords.lat, coords.lon];
        });

      const { northEast, southWest } = getBoundsOfCoords(coords);

      mapInstance?.fitBounds(
        {
          northEast: [
            markers[northEast[1]].point.lon,
            markers[northEast[0]].point.lat,
          ],
          southWest: [
            markers[southWest[1]].point.lon,
            markers[southWest[0]].point.lat,
          ],
        },
        {
          padding: { top: 40, left: 60, bottom: 40, right: 60 },
        }
      );
      return;
    }
  }, [mapInstance, markers, selectedObject]);
  return <></>;
};
