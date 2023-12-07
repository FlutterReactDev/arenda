export enum ZoomView {
  CLUSTER = 15,
  MARKER = 18,
}

export interface Item {
  address_name: string;
  full_name: string;
  id: string;
  point: {
    lat: number;
    lon: number;
  };
  type: string;
  purpose_name: string;
}

export interface GISResponse {
  result: {
    items: Item[];
  };
}

export interface SearchObjectData {
  address: string;
  viewpoint1: {
    id: number;
    latitude: number;
    longitude: number;
  };
  viewpoint2: {
    id: number;
    latitude: number;
    longitude: number;
  };
}

export interface Marker {
  latitude: number;
  longitude: number;
  price: number;
}
export interface LatLong {
  latitude: number;
  longitude: number;
}

export type NorthEast = number[];
export type SouthWest = number[];

export interface SearchMapState {
  markers: Marker[];
  hoverMarker: LatLong | null;
  center: number[];
  zoom: number;
  bounds: null | {
    northEast: NorthEast;
    southWest: SouthWest;
  };
  isMove: boolean;
  fitBounds: null | {
    northEast: NorthEast;
    southWest: SouthWest;
  };
}

export interface SelectMapState {
  markerClear: boolean;
  markers: Item[];
  selectedObject: LatLong | null;
}
