import { HtmlMarker2GIS, Map2GIS } from "@shared/ui/2GIS";

import { FC, PropsWithChildren, memo } from "react";

import { Box } from "@chakra-ui/react";
import { MarkerItem } from "../model/types";
import { useSearchMap } from "../model/useSearchMap";
import { ObjectMarker } from "./ObjectMarker";
import { SearchMapInstance } from "./SearchMapInstance";

interface SearchMapProps {
  onMove?: () => void;
  markers: MarkerItem[];
}

export const SearchMap: FC<PropsWithChildren<SearchMapProps>> = memo(
  (props) => {
    const { onMove, children, markers } = props;
    console.log(markers);

    const { isHoveredMarker, userGeolocation, mapInstance, setBounds } =
      useSearchMap();

    return (
      <Map2GIS
        initialMapOptions={{
          key: _2GIS_KEY_,
          scaleControl: true,
          trafficControl: true,
          zoomControl: true,
          floorControl: true,
          lang: "ru",
          center: [77.057089, 42.649861],
          zoom: 10,
        }}
        onMousedown={() => {
          onMove && onMove();
        }}
        onMoveend={() => {
          if (mapInstance) {
            setBounds(mapInstance.getBounds());
          }
        }}
      >
        <SearchMapInstance />
        {markers.map((marker) => {
          return (
            <HtmlMarker2GIS
              coordinates={[...[marker.lon, marker.lat]]}
              userData={{ ...marker }}
              interactive={true}
              key={marker.id}
              zIndex={
                (isHoveredMarker({
                  longitude: marker.lon,
                  latitude: marker.lat,
                }) &&
                  100) ||
                undefined
              }
            >
              <ObjectMarker
                {...marker}
                isHovered={isHoveredMarker({
                  longitude: marker.lon,
                  latitude: marker.lat,
                })}
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

        {children}
      </Map2GIS>
    );
  }
);
