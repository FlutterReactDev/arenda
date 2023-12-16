import { HtmlMarker2GIS, Map2GIS } from "@shared/ui/2GIS";

import { FC, memo, useEffect } from "react";

import { Box } from "@chakra-ui/react";
import { useSearchMap } from "../model/useSearchMap";
import { ObjectMarker } from "./ObjectMarker";
import { SearchMapInstance } from "./SearchMapInstance";

interface SearchMapProps {
  onMove?: () => void;
}

export const SearchMap: FC<SearchMapProps> = memo((props) => {
  const { onMove } = props;
  const {
    markers,
    isHoveredMarker,
    zoom,
    center,
    setIsMoving,
    setIsStopMovin,
    userGeolocation,
    setUserGeolocation,
  } = useSearchMap();

  useEffect(() => {
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
  }, []);
  return (
    <Map2GIS
      initialMapOptions={{
        center,
        zoom,
        key: _2GIS_KEY_,
        scaleControl: true,
        minZoom: 5,
      }}
      onMousedown={() => {
        onMove && onMove();
      }}
      onMovestart={setIsMoving}
      onMove={setIsMoving}
      onMoveend={setIsStopMovin}
    >
      <SearchMapInstance />
      {markers.map((marker) => {
        return (
          <HtmlMarker2GIS
            coordinates={[marker.longitude, marker.latitude]}
            zIndex={
              (isHoveredMarker({
                longitude: marker.longitude,
                latitude: marker.latitude,
              }) &&
                100) ||
              undefined
            }
          >
            <ObjectMarker
              coordinates={[marker.longitude, marker.latitude]}
              text={marker.price}
            />
          </HtmlMarker2GIS>
        );
      })}

      {userGeolocation && (
        <HtmlMarker2GIS
          coordinates={[
            ...[userGeolocation.longitude, userGeolocation.latitude],
          ]}
        >
          <Box
            w={5}
            h={5}
            bgColor={"blue.300"}
            border={"4px solid "}
            borderColor={"white"}
            rounded={"full"}
            boxShadow={"0px 0px 5px 8px rgba(0, 120, 212, 0.2)"}
          ></Box>
        </HtmlMarker2GIS>
      )}
    </Map2GIS>
  );
});
