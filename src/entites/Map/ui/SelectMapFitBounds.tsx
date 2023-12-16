import { useMapContext } from "@shared/ui/2GIS/Map2GIS";
import { FC, useEffect } from "react";
import { getBoundsOfCoords } from "../model/utils";
import { Item } from "../model/types";
import { SelectMapType } from "@entites/Object/model/schemas/selectMapSchema";
interface SelectMapFitBoundsProps {
  markers: Item[];
  value: SelectMapType | undefined;
}
export const SelectMapFitBounds: FC<SelectMapFitBoundsProps> = (props) => {
  const { markers, value } = props;
  const { mapInstance } = useMapContext();

  useEffect(() => {
    if (
      value?.selectMap.coordinates.latitude &&
      value?.selectMap.coordinates.longitude &&
      mapInstance
    ) {
      const { latitude, longitude } = value.selectMap.coordinates;

      mapInstance.fitBounds(
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

    if (markers.length && mapInstance) {
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
  }, [mapInstance, markers, value]);
  return <></>;
};
