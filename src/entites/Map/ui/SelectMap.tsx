import { Map2GIS } from "@shared/ui/2GIS";
import { CenteredMarker } from "./CenteredMarker";
import { FC, useEffect, useState } from "react";
import {
  useGetCoordinateByAddressQuery,
  useGetRegionByAddressQuery,
} from "../model/api";
import { Box, Center, Spinner } from "@chakra-ui/react";
import { SelectMapFitBounds } from "./SelectMapFitBounds";

import { SelectMapToolbar } from "./SelectMapToolbar";
import { useAppSelector } from "@shared/utils/hooks/useAppSelecter";
import { RegionCenter } from "./RegionCenter";

interface SelectMapProps {
  onChange: (value: number[]) => void;
  value: number[];
  address: string;
}
export const SelectMap: FC<SelectMapProps> = (props) => {
  const { onChange, value, address } = props;
  const { country, region, city } = useAppSelector(
    (state) => state.addObjectForm
  );
  const [clearMarker, setClearMarker] = useState(value ? true : false);
  const { data, isFetching, isSuccess } = useGetCoordinateByAddressQuery(
    address,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const [center, setCenter] = useState<number[]>();

  const { data: notFoundData, isSuccess: notFoundDataIsSuccess } =
    useGetRegionByAddressQuery(
      `${country?.label}, ${region?.label}, ${city?.label}`,
      {
        refetchOnMountOrArgChange: true,
      }
    );

  useEffect(() => {
    if (isSuccess && data.result && data.result.items.length == 1) {
      onChange([
        data.result.items[0].point.lon,
        data.result.items[0].point.lat,
      ]);
    }
  }, [isSuccess, onChange]);

  useEffect(() => {
    if (isSuccess && notFoundDataIsSuccess && data.meta.code == 404) {
      setCenter([
        notFoundData?.result?.items[0].point.lon,
        notFoundData?.result?.items[0].point.lat,
      ]);
    }
  }, [
    data?.meta.code,
    isSuccess,
    notFoundData?.result?.items,
    notFoundDataIsSuccess,
  ]);
  if (isSuccess) {
    return (
      <Box position={"relative"} h={"full"}>
        <Map2GIS
          initialMapOptions={{
            key: _2GIS_KEY_,
            keepCenterWhileUserZoomRotate: false,
            scaleControl: false,
          }}
          onClick={(data) => {
            onChange(data.lngLat);
            setClearMarker(true);
          }}
        >
          {isSuccess && data.meta.code == 404 && center && center.length && (
            <RegionCenter center={center} />
          )}
          <SelectMapFitBounds
            clearMarker={clearMarker}
            setClearMarker={setClearMarker}
            result={data.result}
            onChange={onChange}
            value={value}
          >
            <CenteredMarker coordinates={value} />
          </SelectMapFitBounds>
        </Map2GIS>
        {value && (
          <SelectMapToolbar
            coordinates={value}
            onChange={onChange}
            items={data?.result?.items}
            setClearMarker={setClearMarker}
          />
        )}
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
