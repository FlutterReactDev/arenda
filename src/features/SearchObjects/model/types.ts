import { SearchSchemaType } from "./schema";

export enum DatePickerInput {
  CheckIn = "0",
  Departure = "1",
}

export enum DatePickerState {
  CLOSE = "close",
  OPEN = "open",
}
export interface SearchResultState {
  serachData: SearchSchemaType;
}
