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
