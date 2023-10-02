import { Marker2GIS } from "@shared/ui/2GIS/Marker2GIS";

import { FC } from "react";

interface CenteredMarkerProps {
  coordinates: number[];
}

export const CenteredMarker: FC<CenteredMarkerProps> = (props) => {
  const { coordinates } = props;

  if (coordinates) {
    return <Marker2GIS coordinates={coordinates} />;
  }
  return <></>;
};
