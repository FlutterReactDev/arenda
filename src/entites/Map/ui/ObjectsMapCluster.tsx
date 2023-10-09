import { Clusterer2GIS } from "@shared/ui/2GIS";
import { InputHtmlMarker } from "@shared/ui/2GIS/Clusterer2GIS";
import { FC, memo } from "react";
import { ObjectCluster } from "./ObjectCluster";
import { ClusterTarget } from "@2gis/mapgl-clusterer";
import { ObjectMarker } from "./ObjectMarker";
import { useMapContext } from "@shared/ui/2GIS/Map2GIS";
import { ZoomView } from "../model/types";
interface ObjectsMapCluster {
  inputHtmlMarkers: InputHtmlMarker[];
}

export const ObjectsMapCluster: FC<ObjectsMapCluster> = memo((props) => {
  const { inputHtmlMarkers } = props;
  const { mapInstance } = useMapContext();
  console.log(mapInstance?.setMaxBounds);
  
  return (
    <Clusterer2GIS
      clusterStyle={(pointsCount: number, target: ClusterTarget) => {
        return {
          type: "html",
          children: <ObjectCluster target={target} pointsCount={pointsCount} />,
        };
      }}
      radius={10}
      onClick={(data) => {
        if (data.target.type == "cluster") {
          mapInstance?.setCenter(data.lngLat);
          mapInstance?.setZoom(ZoomView.CLUSTER);
        }
      }}
      onMouseover={(data) => {
        console.log(data);
      }}
      inputHtmlMarkers={[...inputHtmlMarkers]}
      renderHtmlMarker={(coordinates) => (
        <ObjectMarker coordinates={coordinates} text={"$1000"} />
      )}
      disableClusteringAtZoom={ZoomView.CLUSTER}
    />
  );
});
