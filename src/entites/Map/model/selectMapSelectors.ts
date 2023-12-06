import { RootState } from "@app/providers/StoreProvider";

export const getMarkers = (state: RootState) => state.selectMap.markers;
export const getMarkerClear = (state: RootState) => state.selectMap.markerClear;
export const getSelectedObject = (state: RootState) =>
  state.selectMap.selectedObject;
