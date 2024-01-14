import { HtmlMarker2GIS, Map2GIS } from "@shared/ui/2GIS";

import { FC, PropsWithChildren, memo } from "react";

import { Box } from "@chakra-ui/react";
import { MarkerItem } from "../model/types";
import { useSearchMap } from "../model/useSearchMap";

import { SearchMapInstance } from "./SearchMapInstance";
import { Marker2GIS } from "@shared/ui/2GIS/Marker2GIS";
import pricePopover from "@assets/pricePopover.svg";
interface SearchMapProps {
  onMove?: () => void;
  markers: MarkerItem[];
  onMapMove?: () => void;
  center?: number[];
}

export const SearchMap: FC<PropsWithChildren<SearchMapProps>> = memo(
  (props) => {
    const { onMove, children, markers, onMapMove, center } = props;

    const { userGeolocation, mapInstance, setBounds } = useSearchMap();

    return (
      <Map2GIS
        initialMapOptions={{
          key: _2GIS_KEY_,
          scaleControl: true,
          trafficControl: true,
          zoomControl: true,
          floorControl: true,
          lang: "ru",
          ...(center && {
            center,
          }),
          zoom: 9,
          style: "26015706-6204-4b41-bae9-c84dcd126160",
        }}
        onMousedown={() => {
          onMove && onMove();
        }}
        onMoveend={() => {
          if (mapInstance) {
            setBounds(mapInstance.getBounds());
            onMapMove && onMapMove();
          }
        }}
      >
        <SearchMapInstance />
        {markers.map((marker) => {
          return (
            <Marker2GIS
              coordinates={[marker.lon, marker.lat]}
              key={marker.id}
              size={[0, 0]}
              label={{
                offset: [0, -15],
                text: `${
                  marker.context?.stop_factors &&
                  marker.context.stop_factors[0].name.match(/\d/g)?.join("")
                } сом`,
                fontSize: 12,
                color: "#fff",
                image: {
                  url: pricePopover,
                  size: [100, 100],
                  padding: [5, 10, 5, 10],
                  pixelRatio: 20,
                },
              }}
            />
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
