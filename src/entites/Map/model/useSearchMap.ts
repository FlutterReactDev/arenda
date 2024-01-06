import { Map } from "@2gis/mapgl/global";
import { MapGLBundle } from "@shared/ui/2GIS/models";
import { useAppDispatch } from "@shared/utils/hooks/useAppDispatch";
import { useAppSelector } from "@shared/utils/hooks/useAppSelecter";
import { searchMapActions } from "..";
import {
  getBounds,
  getCenter,
  getFitBounds,
  getHover,
  getIsMoving,
  getMakers,
  getMapGLBundle,
  getMapInstance,
  getUserGeolocation,
  getZoom,
} from "./selectors";
import {
  LatLong,
  MarkerItem,
  NorthEast,
  SouthWest,
  UserGeolocation,
} from "./types";

export const useSearchMap = () => {
  const markers = useAppSelector(getMakers);
  const hoverMarker = useAppSelector(getHover);
  const center = useAppSelector(getCenter);
  const zoom = useAppSelector(getZoom);
  const bounds = useAppSelector(getBounds);
  const isMoving = useAppSelector(getIsMoving);
  const fitBounds = useAppSelector(getFitBounds);
  const userGeolocation = useAppSelector(getUserGeolocation);
  const mapInstance = useAppSelector(getMapInstance);
  const mapGLBundle = useAppSelector(getMapGLBundle);
  const dispatch = useAppDispatch();

  const addMarkers = (data: MarkerItem[]) => {
    dispatch(searchMapActions.addMarkers(data));
  };

  const clearMarkers = () => {
    dispatch(searchMapActions.clearMarkers());
  };

  const onHover = (data: LatLong) => {
    dispatch(searchMapActions.setHover(data));
  };

  const isHoveredMarker = (data: LatLong) => {
    if (hoverMarker) {
      return (
        data.latitude == hoverMarker.latitude &&
        data.longitude == hoverMarker.longitude
      );
    }
    return false;
  };

  const clearHover = () => {
    dispatch(searchMapActions.clearHover);
  };

  const setCenter = (data: number[]) => {
    dispatch(searchMapActions.setCenter(data));
    mapInstance?.setCenter(data);
  };

  const setZoom = (data: number) => {
    dispatch(searchMapActions.setZoom(data));
    mapInstance?.setZoom(data);
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
    mapInstance?.fitBounds(data);
    dispatch(searchMapActions.setFitBounds(data));
  };

  const clearFitBounds = () => {
    dispatch(searchMapActions.clearFitBounds());
  };

  const setUserGeolocation = (data: UserGeolocation) => {
    dispatch(searchMapActions.setUserGeolocation(data));
  };

  const setMapInstance = (data: Map) => {
    dispatch(searchMapActions.setMapInstance(data));
  };

  const setMapGlBundle = (bundle: MapGLBundle) => {
    dispatch(searchMapActions.setMapGlBundle(bundle));
  };

  return {
    markers,
    hoverMarker,
    addMarkers,

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
    setMapInstance,
    mapInstance,

    setMapGlBundle,
    mapGLBundle,
  };
};
