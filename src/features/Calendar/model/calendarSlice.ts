import { createSlice } from "@reduxjs/toolkit";
import { CalendarState } from "./types";
import { addDays, subDays, subMonths } from "date-fns";
const initialState = {
  common: {
    desktop: {
      widthCell: 72,
    },
    mobile: {
      widthCell: 50,
    },
    hotels: {
      countMonth: 13,
      startMonth: new Date(),
    },
    objects: {
      countMonth: 19,
      startMonth: subMonths(new Date(), 6),
    },
    countDay: 10,
    beginDate: new Date(),
  },
} as CalendarState;
const calendarSlice = createSlice({
  name: "calendarSlice",
  initialState,
  reducers: {
    increaseDay(state) {
      state.common.beginDate = addDays(state.common.beginDate, 1);
    },
    decrease(state) {
      state.common.beginDate = subDays(state.common.beginDate, 1);
    },
  },
});

export const { reducer: calendarReducer, actions: calendarActions } =
  calendarSlice;
