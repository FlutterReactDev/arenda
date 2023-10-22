export interface CalendarState {
  common: CalendarCommonType;
}

export interface CalendarCommonType {
  mobile: {
    widthCell: number;
  };
  desktop: {
    widthCell: number;
  };
  hotels: {
    startMonth: Date;
    countMonth: number;
  };
  objects: {
    startMonth: Date;
    countMonth: number;
  };
  beginDate: Date;
  countDay: number;
}
