import { Clusterer2GIS } from "@shared/ui/2GIS";
import { InputHtmlMarker } from "@shared/ui/2GIS/Clusterer2GIS";
import { FC, memo } from "react";
import { ObjectCluster } from "./ObjectCluster";
import { ClusterTarget } from "@2gis/mapgl-clusterer";
import { ObjectMarker } from "./ObjectMarker";
interface ObjectsMapCluster {
  inputHtmlMarkers: InputHtmlMarker[];
}
export const ObjectsMapCluster: FC<ObjectsMapCluster> = memo((props) => {
  const { inputHtmlMarkers } = props;

  return (
    <Clusterer2GIS
      clusterStyle={(pointsCount: number, target: ClusterTarget) => {
        return {
          type: "html",
          children: <ObjectCluster target={target} pointsCount={pointsCount} />,
        };
      }}
      inputHtmlMarkers={inputHtmlMarkers}
      renderHtmlMarker={() => <ObjectMarker text={"$1000"} />}
      
    />
  );
});
