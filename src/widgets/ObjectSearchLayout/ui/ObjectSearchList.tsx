import { HStack, Heading, SimpleGrid, useMediaQuery } from "@chakra-ui/react";
import Pagination from "@choc-ui/paginator";
import { useSearchMap } from "@entites/Map";
import {
  ObjectCard,
  ObjectCardSkeleton,
  SimpleObjectCard,
  SimpleObjectCardSkeleton,
  useGet2GISObjectsInfoQuery,
  useGetObjectsImagesQuery,
} from "@entites/Object";
import { FC, memo, useState } from "react";
interface ObjectSearchListProps {
  mapIsLoaded: boolean;
  isMobile?: boolean;
  withGrid?: boolean;
}
export const ObjectSearchList: FC<ObjectSearchListProps> = memo((props) => {
  const { mapIsLoaded, isMobile = false, withGrid } = props;
  const { mapInstance, bounds } = useSearchMap();
  const [isLessThan630] = useMediaQuery("(max-width: 630px)");
  const [isLessThen900] = useMediaQuery("(max-width: 900px)");
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

  if (!objectIsLoading && objectsIsSuccess && objects.meta.code === 404) {
    return <Heading size={""}>Ничего не удалось найти</Heading>;
  }

  if (withGrid) {
    return (
      <>
        <SimpleGrid
          columns={{
            ...(isLessThan630
              ? {
                  base: 1,
                }
              : { base: 1, sm: 2 }),
          }}
          alignItems={"center"}
          justifyContent={"center"}
          spacing={5}
          pt={5}
        >
          {objectsIsSuccess &&
            !objectIsLoading &&
            objects?.result?.items?.map((object) => {
              return (
                <>
                  {!isMobile && (
                    <ObjectCard
                      {...object}
                      key={object.id}
                      images={
                        objectImages?.result.items[object.id.split("_")[0]] ||
                        []
                      }
                    />
                  )}

                  {isMobile && (
                    <SimpleObjectCard
                      {...object}
                      images={
                        objectImages?.result.items[object.id.split("_")[0]] ||
                        []
                      }
                      key={object.id}
                    />
                  )}
                </>
              );
            })}

          {objectIsLoading && (
            <>
              <SimpleObjectCardSkeleton />
              <SimpleObjectCardSkeleton />
              <SimpleObjectCardSkeleton />
              <SimpleObjectCardSkeleton />
              <SimpleObjectCardSkeleton />
              <SimpleObjectCardSkeleton />
            </>
          )}
        </SimpleGrid>
        {objectsIsSuccess && (
          <HStack pt={3} justifyContent={"center"} w="full">
            <Pagination
              pageSize={12}
              current={currentPage}
              total={objects.result?.total}
              onChange={(currentPage) => {
                if (currentPage) {
                  setCurrentPage(currentPage);
                }
              }}
              {...(isLessThen900 && {
                size: "sm",
                pageNeighbours: 2,
              })}
              {...(isLessThan630 && {
                size: "sm",
                pageNeighbours: 0,
              })}
              colorScheme="red"
              paginationProps={{
                display: "flex",
              }}
            />
          </HStack>
        )}
      </>
    );
  }

  return (
    <>
      {objectsIsSuccess &&
        !objectIsLoading &&
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
      {objectIsLoading && !isMobile && (
        <>
          <ObjectCardSkeleton />
          <ObjectCardSkeleton />
          <ObjectCardSkeleton />
          <ObjectCardSkeleton />
        </>
      )}
      {objectIsLoading && isMobile && (
        <>
          <SimpleObjectCardSkeleton />
          <SimpleObjectCardSkeleton />
          <SimpleObjectCardSkeleton />
          <SimpleObjectCardSkeleton />
        </>
      )}
      {objectsIsSuccess && (
        <HStack pt={3} justifyContent={"center"} w="full">
          <Pagination
            pageSize={12}
            current={currentPage}
            total={objects.result?.total}
            onChange={(currentPage) => {
              if (currentPage) {
                setCurrentPage(currentPage);
              }
            }}
            pageNeighbours={2}
            {...(isLessThen900 && {
              size: "sm",
              pageNeighbours: 2,
            })}
            {...(isLessThan630 && {
              size: "sm",
              pageNeighbours: 0,
            })}
            colorScheme="red"
            paginationProps={{
              display: "flex",
            }}
          />
        </HStack>
      )}
    </>
  );
});
