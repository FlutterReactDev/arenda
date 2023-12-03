export enum DatePickerInput {
  CheckIn = "0",
  Departure = "1",
}

export enum DatePickerState {
  CLOSE = "close",
  OPEN = "open",
}

export interface Dates {
  checkIn: Date;
  checkOut: Date;
}

export interface Guests {
  adultsCount: number;
  childrenAges: { age: string }[];
}

export interface SearchData {
  dates: Dates;
  guests: Guests;
  term: string;
}
export interface SearchResultState {
  searchData: SearchData;
}
