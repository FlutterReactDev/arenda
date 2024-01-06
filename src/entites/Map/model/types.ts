import { Map } from "@2gis/mapgl/global";
import { MapGLBundle } from "@shared/ui/2GIS/models";
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
  objectId: string;
}
export interface LatLong {
  latitude: number;
  longitude: number;
}

export type NorthEast = number[];
export type SouthWest = number[];

export interface SearchMapState {
  markers: MarkerItem[];
  hoverMarker: LatLong | null;
  center?: number[];
  zoom?: number;
  bounds: null | {
    northEast: NorthEast;
    southWest: SouthWest;
  };
  isMove: boolean;
  fitBounds: null | {
    northEast: NorthEast;
    southWest: SouthWest;
  };
  userGeolocation: UserGeolocation | null;
  mapInstance: Map | null;
  mapGLBundle: MapGLBundle | null;
}

export interface SelectMapState {
  markerClear: boolean;
  markers: Item[];
  selectedObject: LatLong | null;
}

export interface UserGeolocation {
  latitude: number;
  longitude: number;
}

export interface MarkerArg {
  map_width?: number;
  map_height?: number;
  viewpoint1?: string;
  viewpoint2?: string;
}

export interface MarkerResponse {
  meta: Meta;
  result: Result;
}
interface Result {
  items: MarkerItem[];
  total: number;
}
export interface MarkerItem {
  context: Context;
  flags: Flags;
  geometry_id: string;
  id: string;
  is_advertising: boolean;
  lat: number;
  lon: number;
  match_type: number;
  name: string;
  name_ex: Nameex;
  reviews: Reviews;
  rubr: string;
  schedule: Schedule;
  source_type: number;
  timezone_offset: number;
  type: string;
  vital?: number;
}
interface Meta {
  api_version: string;
  code: number;
  issue_date: string;
}
interface Schedule {
  Fri: Day;
  Mon: Day;
  Sat: Day;
  Sun: Day;
  Thu: Day;
  Tue: Day;
  Wed: Day;
}
interface Day {
  working_hours: Workinghour[];
}
interface Workinghour {
  from: string;
  to: string;
}
interface Reviews {
  general_rating: number;
  general_review_count: number;
  general_review_count_with_stars: number;
  is_reviewable: boolean;
  is_reviewable_on_flamp: boolean;

  org_rating: number;
  org_review_count: number;
  org_review_count_with_stars: number;
}

interface Nameex {
  primary: string;
}
interface Flags {
  photos: boolean;
}
interface Context {
  stop_factors: Stopfactor[];
}
interface Stopfactor {
  name: string;
}
