import { Box, Center, Spinner } from "@chakra-ui/react";
import { Map2GIS } from "@shared/ui/2GIS";
import { FC, useEffect } from "react";
import { useGetCoordinateByAddressQuery } from "../model/api";
import { SelectMapFitBounds } from "./SelectMapFitBounds";

import { useSelectMap } from "..";

import { MapPointerEvent } from "@2gis/mapgl/types";
import { Marker2GIS } from "@shared/ui/2GIS/Marker2GIS";
import { LatLong } from "../model/types";
import { SelectMapToolbar } from "./SelectMapToolbar";

interface SelectMapProps {
  onChange: (value: LatLong) => void;
  value: LatLong;
  city?: string;
  country?: string;
  region?: string;
  streetName: string;
  house: string;
  viewpoint1: {
    id: number;
    latitude: number;
    longitude: number;
  };
  viewpoint2: {
    id: number;
    latitude: number;
    longitude: number;
  };
}
export const SelectMap: FC<SelectMapProps> = (props) => {
  const {
    onChange,
    value,
    house,
    streetName,
    city,
    region,
    viewpoint1,
    viewpoint2,
  } = props;

  const {
    addMarkers,

    markers,
    selectObject,
    selectedObject,
    markerClear,
    clearSelectedObject,
  } = useSelectMap();

  const { data, isFetching, isSuccess } = useGetCoordinateByAddressQuery(
    {
      address: `${region} ${city} ${streetName} ${house}`,
      viewpoint1,
      viewpoint2,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  useEffect(() => {
    if (isSuccess) {
      addMarkers(data.result.items);
    }
  }, [addMarkers, data, isSuccess]);

  useEffect(() => {
    if (value.latitude && value.longitude) {
      selectObject(value);
    } else {
      clearSelectedObject();
    }
  }, []);

  useEffect(() => {
    if (selectedObject) {
      onChange(selectedObject);
    } else {
      onChange({
        latitude: 0,
        longitude: 0,
      });
    }
  }, [onChange, selectedObject]);

  const onMapClick = (data: MapPointerEvent) => {
    const { lngLat } = data;
    selectObject({
      latitude: lngLat[1],
      longitude: lngLat[0],
    });
  };

  const onMarkerClick = ({ latitude, longitude }: LatLong) => {
    selectObject({
      latitude,
      longitude,
    });
  };

  if (isSuccess) {
    return (
      <Box position={"relative"} h={"full"}>
        <Map2GIS
          initialMapOptions={{
            key: _2GIS_KEY_,
            keepCenterWhileUserZoomRotate: false,
            scaleControl: false,
          }}
          onClick={onMapClick}
        >
          <SelectMapFitBounds />

          {!markerClear &&
            !selectedObject &&
            markers.map(({ point: { lat, lon } }) => {
              return (
                <Marker2GIS
                  key={`${lon}-${lat}`}
                  coordinates={[lon, lat]}
                  interactive
                  onClick={() =>
                    onMarkerClick({ latitude: lat, longitude: lon })
                  }
                />
              );
            })}
          {selectedObject && (
            <Marker2GIS
              key={`${selectedObject.longitude}-${selectedObject.latitude}`}
              coordinates={[selectedObject.longitude, selectedObject.latitude]}
            />
          )}
        </Map2GIS>
        {selectedObject && <SelectMapToolbar />}
      </Box>
    );
  }

  return (
    <>
      {isFetching && (
        <Center>
          <Spinner size="xl"></Spinner>
        </Center>
      )}
    </>
  );
};
