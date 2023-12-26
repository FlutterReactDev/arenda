import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SearchResultState } from "./types";
import { addDays } from "date-fns";
import { toDay } from "@features/Calendar/utils/toDay";

const initialState = {
  searchData: {
    dates: {
      checkIn: toDay(new Date()),
      checkOut: toDay(addDays(new Date(), 1)),
    },
    guests: {
      adultsCount: 2,
      childrenAges: [],
    },
    term: "",
  },
} as SearchResultState;

const searchObjectSlice = createSlice({
  name: "searchResultSlice",
  initialState,
  reducers: {
    setSearchData(state, action) {
      state.searchData = action.payload;
    },

    setGuestData(state, action) {
      state.searchData.guests = { ...action.payload };
    },

    setTerm(state, action) {
      state.searchData.term = action.payload;
    },
    setDates(
      state,
      action: PayloadAction<{
        checkIn: Date;
        checkOut: Date;
      }>
    ) {
      state.searchData.dates = action.payload;
    },

    setCheckIn(state, action) {
      state.searchData.dates.checkIn = action.payload;
    },
    setCheckOut(state, action) {
      state.searchData.dates.checkOut = action.payload;
    },
  },
});

export const { actions: searchObjectAction, reducer: searchObjectReducer } =
  searchObjectSlice;
