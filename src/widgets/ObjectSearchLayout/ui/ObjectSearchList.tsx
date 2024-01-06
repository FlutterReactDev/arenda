import Pagination from "@choc-ui/paginator";
import { useSearchMap } from "@entites/Map";
import {
  ObjectCard,
  SimpleObjectCard,
  useGet2GISObjectsInfoQuery,
  useGetObjectsImagesQuery,
} from "@entites/Object";
import { Loader } from "@shared/ui/Loader";
import { FC, memo, useState } from "react";
interface ObjectSearchListProps {
  mapIsLoaded: boolean;
  isMobile?: boolean;
}
export const ObjectSearchList: FC<ObjectSearchListProps> = memo((props) => {
  const { mapIsLoaded, isMobile = false } = props;
  const { mapInstance, bounds, onHover, clearHover } = useSearchMap();
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: objects,
    isSuccess: objectsIsSuccess,
    isFetching: objectIsLoading,
  } = useGet2GISObjectsInfoQuery(
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
      page: currentPage,
      pageSize: 12,
      map_width: mapInstance?.getSize()[0],
      map_height: mapInstance?.getSize()[1],
    },
    {
      skip: !mapIsLoaded,
      refetchOnReconnect: true,
    }
  );

  const { data: objectImages } = useGetObjectsImagesQuery(
    objects?.result?.items?.map(({ id }) => id.split("_")[0]) as string[],
    {
      skip: !objects?.result?.items?.length && !objectsIsSuccess,
    }
  );

  return (
    <>
      {objectsIsSuccess &&
        objects?.result?.items?.map((object) => {
          return (
            <>
              {!isMobile && (
                <ObjectCard
                  {...object}
                  key={object.id}
                  images={
                    objectImages?.result.items[object.id.split("_")[0]] || []
                  }
                  onHover={(objectId) => {
                    const point = objects.result.items.filter(
                      ({ id }) => id == objectId
                    )[0].point;
                    onHover({
                      latitude: point.lat,
                      longitude: point.lon,
                    });
                  }}
                  onHoverOut={clearHover}
                />
              )}

              {isMobile && (
                <SimpleObjectCard
                  {...object}
                  images={
                    objectImages?.result.items[object.id.split("_")[0]] || []
                  }
                  key={object.id}
                />
              )}
            </>
          );
        })}
      {objectsIsSuccess && (
        <Pagination
          pageSize={12}
          current={currentPage}
          total={objects.result.total}
          onChange={(currentPage) => {
            console.log(currentPage);

            if (currentPage) {
              setCurrentPage(currentPage);
            }
          }}
          pageNeighbours={2}
          colorScheme="red"
          paginationProps={{
            display: "flex",
          }}
        />
      )}
      {objectIsLoading && <Loader />}
    </>
  );
});
