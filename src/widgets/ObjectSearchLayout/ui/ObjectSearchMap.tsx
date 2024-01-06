import { SearchMap, useGetMarkersQuery, useSearchMap } from "@entites/Map";
import { FC, memo } from "react";
interface ObjectSearchMapProps {
  mapIsLoaded: boolean;
}
export const ObjectSearchMap: FC<ObjectSearchMapProps> = memo((props) => {
  const { mapIsLoaded } = props;
  const { mapInstance, bounds } = useSearchMap();

  const { data } = useGetMarkersQuery(
    {
      viewpoint1: `${
        bounds ? bounds.southWest[0] : mapInstance?.getBounds().southWest[0]
      },${
        bounds ? bounds.northEast[1] : mapInstance?.getBounds().northEast[1]
      }`,
      viewpoint2: `${
        bounds ? bounds.northEast[0] : mapInstance?.getBounds().northEast[0]
      },${
        bounds ? bounds.southWest[1] : mapInstance?.getBounds().southWest[1]
      }`,
      map_width: mapInstance?.getSize()[0],
      map_height: mapInstance?.getSize()[1],
    },
    {
      skip: !mapIsLoaded,
      refetchOnMountOrArgChange: true,
    }
  );

  return <SearchMap markers={data?.result?.items || []} />;
});
