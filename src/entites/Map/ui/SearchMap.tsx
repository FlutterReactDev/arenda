import { Map2GIS } from "@shared/ui/2GIS";

import { FC, memo } from "react";
import { ObjectsMapCluster } from "./ObjectsMapCluster";
import { InputHtmlMarker } from "@shared/ui/2GIS/Clusterer2GIS";

interface SearchMapProps {
  inputHtmlMarkers: InputHtmlMarker[];
}

export const SearchMap: FC<SearchMapProps> = memo((props) => {
  const { inputHtmlMarkers } = props;

  return (
    <Map2GIS
      initialMapOptions={{
        center: [77.17531854453188, 42.6445241832498],
        zoom: 15,
        key: _2GIS_KEY_,
        keepCenterWhileUserZoomRotate: true,
        scaleControl: true,

        minZoom: 5,
      }}
      onMouseover={(data) => {
        console.log(data);
      }}
    >
      <ObjectsMapCluster inputHtmlMarkers={inputHtmlMarkers} />
    </Map2GIS>
  );
});
