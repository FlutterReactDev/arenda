import { HStack, IconButton, Icon, Button, Box } from "@chakra-ui/react";
import {
  MapLoader,
  SearchMap,
  useGetMarkersQuery,
  useSearchMap,
} from "@entites/Map";
import { addQueryParams } from "@shared/utils/addQueryParams";
import { FC, memo, useCallback, useEffect } from "react";
import { BiExpand, BiCollapse } from "react-icons/bi";
import { BsGeoAlt } from "react-icons/bs";
import { useSearchParams } from "react-router-dom";
interface ObjectSearchMapProps {
  mapIsLoaded: boolean;
  mapOnToggle: () => void;
  mapIsOpen: boolean;
}
export const ObjectSearchMap: FC<ObjectSearchMapProps> = memo((props) => {
  const { mapIsLoaded, mapIsOpen, mapOnToggle } = props;
  const {
    mapInstance,
    bounds,
    setBounds,
    setUserGeolocation,
    setCenter,
    setZoom,
    userGeolocation,
  } = useSearchMap();
  const [searchParams] = useSearchParams();
  const onMapMove = () => {
    addQueryParams({
      NE: mapInstance?.getBounds().northEast.join(","),
      SW: mapInstance?.getBounds().southWest.join(","),
    });
  };

  useEffect(() => {
    const northEast = searchParams
      .get("NE")
      ?.split(",")
      .map((cord) => Number(cord)) as number[];
    const southWest = searchParams
      .get("SW")
      ?.split(",")
      .map((cord) => Number(cord)) as number[];
    if (northEast && southWest) {
      setBounds({
        northEast,
        southWest,
      });
      mapInstance?.fitBounds({
        northEast,
        southWest,
      });
    }
  }, [mapInstance]);

  const findMe = useCallback(() => {
    navigator.geolocation.watchPosition(
      function (position) {
        // Successfully obtained the current position
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        setUserGeolocation({
          latitude,
          longitude,
        });
      },
      function (error) {
        // Handle any errors that occurred while getting the position
        switch (error.code) {
          case error.PERMISSION_DENIED:
            console.error("User denied the request for geolocation.");
            break;
          case error.POSITION_UNAVAILABLE:
            console.error("Location information is unavailable.");
            break;
          case error.TIMEOUT:
            console.error("The request to get user location timed out.");
            break;
        }
      }
    );

    navigator.geolocation.getCurrentPosition(
      function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setCenter([longitude, latitude]);
        setZoom(18);
      },
      function (error) {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            console.error("User denied the request for geolocation.");
            break;
          case error.POSITION_UNAVAILABLE:
            console.error("Location information is unavailable.");
            break;
          case error.TIMEOUT:
            console.error("The request to get user location timed out.");
            break;
        }
      }
    );

    if (userGeolocation) {
      const { latitude, longitude } = userGeolocation;
      setCenter([longitude, latitude]);
      setZoom(18);
    }
  }, [setCenter, setUserGeolocation, setZoom, userGeolocation]);

  const { data, isFetching } = useGetMarkersQuery(
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
    }
  );

  return (
    <>
      <SearchMap
        center={[74.603605, 42.876452]}
        onMapMove={onMapMove}
        markers={data?.result?.items || []}
      />
      <HStack position={"absolute"} top={2} left={2} zIndex={"9"}>
        <IconButton
          rounded={"full"}
          colorScheme="red"
          aria-label="asdas"
          size={"lg"}
          onClick={mapOnToggle}
          display={{
            md: "block",
            sm: "none",
            base: "none",
          }}
          icon={
            <>
              {!mapIsOpen && <Icon as={BiExpand} h={6} w={6} />}
              {mapIsOpen && <Icon as={BiCollapse} h={6} w={6} />}
            </>
          }
        />

        <Button colorScheme="blue" onClick={findMe}>
          <Icon as={BsGeoAlt} />
        </Button>
      </HStack>
      {isFetching && (
        <Box
          pos={"absolute"}
          top={"5%"}
          left={"50%"}
          transform={"translateX(-50%)"}
        >
          <MapLoader />
        </Box>
      )}
    </>
  );
});
