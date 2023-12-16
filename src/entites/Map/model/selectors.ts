import { RootState } from "@app/providers/StoreProvider";
import { createSelector } from "@reduxjs/toolkit";
import { LatLong } from "./types";

export const getMakers = (state: RootState) => state.searchMap.markers;
export const getHover = (state: RootState) => state.searchMap.hoverMarker;
export const isHoveredMarker = (data: LatLong) =>
  createSelector([getHover], (hoveredMarker) => {
    return (
      data.latitude == hoveredMarker?.latitude &&
      data.longitude == hoveredMarker?.longitude
    );
  });
export const getCenter = (state: RootState) => state.searchMap.center;
export const getZoom = (state: RootState) => state.searchMap.zoom;
export const getBounds = (state: RootState) => state.searchMap.bounds;
export const getIsMoving = (state: RootState) => state.searchMap.isMove;
export const getFitBounds = (state: RootState) => state.searchMap.fitBounds;
export const getUserGeolocation = (state: RootState) =>
  state.searchMap.userGeolocation;
