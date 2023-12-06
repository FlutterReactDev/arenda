import { useAppSelector } from "@shared/utils/hooks/useAppSelecter";
import {
  getMarkerClear,
  getMarkers,
  getSelectedObject,
} from "./selectMapSelectors";
import { Item, LatLong } from "./types";
import { useAppDispatch } from "@shared/utils/hooks/useAppDispatch";
import { selectMapActions } from "..";

export const useSelectMap = () => {
  const dispatch = useAppDispatch();
  const markers = useAppSelector(getMarkers);
  const markerClear = useAppSelector(getMarkerClear);
  const selectedObject = useAppSelector(getSelectedObject);

  const addMarkers = (data: Item[]) => {
    dispatch(selectMapActions.setMarkers(data));
  };

  const hideMarkers = () => {
    dispatch(selectMapActions.setMarkerClear());
  };

  const showMarkers = () => {
    dispatch(selectMapActions.setMarkerShow());
  };

  const selectObject = (data: LatLong | null) => {
    dispatch(selectMapActions.setSelectedObject(data));
  };

  const clearSelectedObject = () => {
    dispatch(selectMapActions.clearSelectObject());
  };

  return {
    markers,
    markerClear,
    addMarkers,
    hideMarkers,
    showMarkers,
    selectedObject,
    selectObject,
    clearSelectedObject,
  };
};
