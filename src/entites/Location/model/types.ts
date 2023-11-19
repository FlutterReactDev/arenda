export interface Country {
  id: number;
  name: string;
  code: string;
  viewPoint1: {
    id: number;
    latitude: number;
    longitude: number;
  };
  viewPoint2: {
    id: number;
    latitude: number;
    longitude: number;
  };
}
export interface Region {
  id: number;
  name: string;
  countryId: number;
}
export interface City {
  id: number;
  name: string;
  regionId: number;
}
