import { HtmlMarker2GIS, Map2GIS } from "@shared/ui/2GIS";

import { FC, memo } from "react";

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
  } = useSearchMap();

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
    </Map2GIS>
  );
});
