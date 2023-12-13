import { GuestsType } from "@entites/Object";

export interface BookingFormState {
  bookingForm: {
    dates: Dates;
    guests: GuestsType;
  };
}

export interface Dates {
  checkIn: Date ;
  checkOut: Date ;
}
