import { FC, PropsWithChildren, useEffect } from "react";
import { getBoundsOfCoords } from "../model/utils";
import { useMapContext } from "@shared/ui/2GIS/Map2GIS";
import { Marker2GIS } from "@shared/ui/2GIS/Marker2GIS";
import { Item } from "../model/types";

interface SelectMapFitBoundsProps {
  result: {
    items: Item[];
    total: number;
  };
  clearMarker: boolean;
  onChange: (value: number[]) => void;
  setClearMarker: (value: boolean) => void;
  value: number[];
}
export const SelectMapFitBounds: FC<
  PropsWithChildren<SelectMapFitBoundsProps>
> = (props) => {
  const { children, result, clearMarker, onChange, setClearMarker, value } =
    props;

  const { mapInstance } = useMapContext();
  useEffect(() => {
    if (value) {
      mapInstance?.fitBounds(
        {
          northEast: [...value],
          southWest: [...value],
        },
        {
          padding: { top: 40, left: 60, bottom: 40, right: 60 },
        }
      );
    } else if (result) {
      const coords = result.items
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
            result.items[northEast[1]].point.lon,
            result.items[northEast[0]].point.lat,
          ],
          southWest: [
            result.items[southWest[1]].point.lon,
            result.items[southWest[0]].point.lat,
          ],
        },
        {
          padding: { top: 40, left: 60, bottom: 40, right: 60 },
        }
      );
    }
  }, [mapInstance, result, value, clearMarker]);
  return (
    <>
      {children}
      {!clearMarker &&
        result?.items?.map((item) => {
          return (
            <Marker2GIS
              key={`${(item.point.lon, item.point.lat)}`}
              coordinates={[item.point.lon, item.point.lat]}
              interactive
              onClick={() => {
                onChange([item.point.lon, item.point.lat]);
                setClearMarker(true);
              }}
            />
          );
        })}
    </>
  );
};
