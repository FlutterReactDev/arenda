export interface ObjectNotHotel {
  announcement: {
    id: number;
    image: string;
    fullAddress: string;
    name: string;
  };
  instantBooking: boolean;
  lastChange: Date;
  calendar: boolean;
  todayPrice: number;
}
