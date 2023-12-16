import { useAppSelector } from "@shared/utils/hooks/useAppSelecter";
import {
  getBounds,
  getCenter,
  getFitBounds,
  getHover,
  getIsMoving,
  getMakers,
  getUserGeolocation,
  getZoom,
} from "./selectors";
import {
  LatLong,
  Marker,
  NorthEast,
  SouthWest,
  UserGeolocation,
} from "./types";
import { useAppDispatch } from "@shared/utils/hooks/useAppDispatch";
import { searchMapActions } from "..";

export const useSearchMap = () => {
  const markers = useAppSelector(getMakers);
  const hoverMarker = useAppSelector(getHover);
  const center = useAppSelector(getCenter);
  const zoom = useAppSelector(getZoom);
  const bounds = useAppSelector(getBounds);
  const isMoving = useAppSelector(getIsMoving);
  const fitBounds = useAppSelector(getFitBounds);
  const userGeolocation = useAppSelector(getUserGeolocation);

  const dispatch = useAppDispatch();

  const addMarkers = (data: Marker[]) => {
    dispatch(searchMapActions.addMarkers(data));
  };
  const removeMarkers = (data: LatLong[]) => {
    dispatch(searchMapActions.removeMarkers(data));
  };

  const addMarker = (data: Marker) => {
    dispatch(searchMapActions.addMarker(data));
  };

  const removeMarker = (data: LatLong) => {
    dispatch(searchMapActions.removeMarker(data));
  };

  const clearMarkers = () => {
    dispatch(searchMapActions.clearMarkers());
  };

  const onHover = (data: LatLong) => {
    dispatch(searchMapActions.setHover(data));
  };

  const isHoveredMarker = (data: LatLong) => {
    return (
      data.latitude == hoverMarker?.latitude &&
      data.longitude == hoverMarker?.longitude
    );
  };

  const clearHover = () => {
    dispatch(searchMapActions.clearHover);
  };

  const setCenter = (data: number[]) => {
    dispatch(searchMapActions.setCenter(data));
  };

  const setZoom = (data: number) => {
    dispatch(searchMapActions.setZoom(data));
  };

  const setBounds = (data: { northEast: NorthEast; southWest: SouthWest }) => {
    dispatch(searchMapActions.setBounds(data));
  };

  const clearBounds = () => {
    dispatch(searchMapActions.clearBounds());
  };
  const setIsMoving = () => {
    dispatch(searchMapActions.setIsMoving());
  };

  const setIsStopMovin = () => {
    dispatch(searchMapActions.setIsStopMoving());
  };

  const setFitBounds = (data: {
    northEast: NorthEast;
    southWest: SouthWest;
  }) => {
    dispatch(searchMapActions.setFitBounds(data));
  };

  const clearFitBounds = () => {
    dispatch(searchMapActions.clearFitBounds());
  };

  const setUserGeolocation = (data: UserGeolocation) => {
    dispatch(searchMapActions.setUserGeolocation(data));
  };

  return {
    markers,
    hoverMarker,
    addMarkers,
    addMarker,
    removeMarkers,
    removeMarker,
    clearMarkers,
    onHover,
    isHoveredMarker,
    clearHover,
    center,
    setCenter,
    setZoom,
    zoom,
    setBounds,
    clearBounds,
    bounds,
    isMoving,
    setIsMoving,
    setIsStopMovin,
    fitBounds,
    setFitBounds,
    clearFitBounds,
    setUserGeolocation,
    userGeolocation,
  };
};
