import { createSlice } from "@reduxjs/toolkit";
import { BookingFormState } from "./types";
const initialState = {
  bookingForm: {
    dates: {
      checkIn: new Date(),
      checkOut: new Date(),
    },
    guests: {
      adultsCount: 0,
      childrenAges: [],
    },
  },
} as BookingFormState;

const bookingFormSlice = createSlice({
  name: "bookingFormSlice",
  initialState,
  reducers: {
    setDates(state, action) {
      state.bookingForm.dates = action.payload;
    },

    setGuests(state, action) {
      state.bookingForm.guests = action.payload;
    },

    setBookingForm(state, action) {
      state.bookingForm = action.payload;
    },
  },
});

export const { actions: bookingFormActions, reducer: bookingFormReducer } =
  bookingFormSlice;
