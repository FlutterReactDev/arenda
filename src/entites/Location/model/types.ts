export interface Country {
  label: string;
  id: number;
}
export interface Region {
  label: string;
  id: number;
  countryId: number;
}
export interface City {
  label: string;
  id: number;
  regionId: number;
}
