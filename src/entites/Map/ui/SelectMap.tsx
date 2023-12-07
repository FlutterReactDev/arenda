import { Box, Center, Spinner } from "@chakra-ui/react";
import { Map2GIS } from "@shared/ui/2GIS";
import { FC, useEffect } from "react";
import {
  useGetCoordinateByAddressQuery,
  useGetObjectByCoordinatesQuery,
} from "../model/api";
import { SelectMapFitBounds } from "./SelectMapFitBounds";

import { MapPointerEvent } from "@2gis/mapgl/types";
import { SelectMapType } from "@entites/Object/model/schemas/selectMapSchema";
import { Marker2GIS } from "@shared/ui/2GIS/Marker2GIS";
import { LatLong } from "../model/types";
import { SelectMapToolbar } from "./SelectMapToolbar";
import { getItemByCoords } from "../model/utils";

interface SelectMapProps {
  onChange: (value: SelectMapType) => void;
  value: SelectMapType;
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
    data: markers,
    isFetching: markersIsFetching,
    isSuccess: markersIsSuccess,
  } = useGetCoordinateByAddressQuery(
    {
      address: `${region} ${city} ${streetName} ${house}`,
      viewpoint1,
      viewpoint2,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const {
    data: objectInfo,
    isFetching: objectInfoIsFetching,
    isSuccess: objectInfoIsSuccess,
  } = useGetObjectByCoordinatesQuery(
    {
      latitude: value.selectMap.coordinates.latitude,
      longitude: value.selectMap.coordinates.longitude,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  useEffect(() => {
    if (markersIsSuccess && markers.result.items.length == 1) {
      onChange({
        selectMap: {
          coordinates: {
            latitude: markers.result.items[0].point.lat,
            longitude: markers.result.items[0].point.lon,
          },
          fullAddress: markers.result.items[0].address_name,
        },
      });
    }
  }, [markers?.result, markersIsSuccess]);
  useEffect(() => {
    const address = getItemByCoords(
      {
        latitude: value.selectMap.coordinates.latitude,
        longitude: value.selectMap.coordinates.longitude,
      },
      markers?.result?.items || []
    );

    if (objectInfo?.result?.items.length && !address) {
      onChange({
        selectMap: {
          coordinates: { ...value.selectMap.coordinates },
          fullAddress: objectInfo?.result.items[0]?.address_name as string,
        },
      });
    }
  }, [objectInfo?.result, objectInfoIsSuccess]);
  const addressInfo =
    (value.selectMap.coordinates.latitude &&
      value.selectMap.coordinates.longitude &&
      markersIsSuccess &&
      getItemByCoords(
        {
          latitude: value.selectMap.coordinates.latitude,
          longitude: value.selectMap.coordinates.longitude,
        },
        markers.result.items
      )?.address_name) ||
    "";

  const onMapClick = ({ lngLat }: MapPointerEvent) => {
    onChange({
      selectMap: {
        coordinates: {
          latitude: lngLat[1],
          longitude: lngLat[0],
        },
        fullAddress:
          addressInfo || objectInfo?.result?.items[0].address_name || "",
      },
    });
  };

  const onMarkerClick = ({ latitude, longitude }: LatLong) => {
    const addressName = getItemByCoords(
      {
        latitude,
        longitude,
      },
      markers?.result?.items || []
    )?.address_name;

    onChange({
      selectMap: {
        coordinates: {
          latitude,
          longitude,
        },
        fullAddress:
          addressName || objectInfo?.result?.items[0].address_name || "",
      },
    });
  };

  const onBack = () => {
    onChange({
      selectMap: {
        coordinates: {
          latitude: 0,
          longitude: 0,
        },
        fullAddress: "",
      },
    });
  };

  const haveValue =
    value.selectMap.coordinates.latitude != 0 &&
    value.selectMap.coordinates.latitude != undefined &&
    value.selectMap.coordinates.longitude != 0 &&
    value.selectMap.coordinates.longitude != undefined &&
    value.selectMap.fullAddress != undefined &&
    value.selectMap.fullAddress.length != 0;

  if (markersIsSuccess) {
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
          <SelectMapFitBounds markers={markers?.result?.items} value={value} />

          {!haveValue &&
            markers?.result?.items.map(({ point: { lat, lon } }) => {
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

          {haveValue && (
            <Marker2GIS
              key={`${value.selectMap.coordinates.longitude}-${value.selectMap.coordinates.latitude}`}
              coordinates={[
                value.selectMap.coordinates.longitude,
                value.selectMap.coordinates.latitude,
              ]}
            />
          )}
        </Map2GIS>
        {haveValue && (
          <SelectMapToolbar
            address={objectInfo?.result?.items[0].address_name}
            onBack={onBack}
            isLoading={objectInfoIsFetching}
          />
        )}
      </Box>
    );
  }

  return (
    <>
      {markersIsFetching && (
        <Center>
          <Spinner size="xl"></Spinner>
        </Center>
      )}
    </>
  );
};
