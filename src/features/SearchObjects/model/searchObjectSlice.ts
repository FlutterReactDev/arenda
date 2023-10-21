import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SearchResultState } from "./types";

const initialState = {
  serachData: {
    guests: {
      adultsCount: 1,
      childrenAges: [],
    },
  },
} as unknown as SearchResultState;

const searchObjectSlice = createSlice({
  name: "searchResultSlice",
  initialState,
  reducers: {
    setSearchData(state, action) {
      state.serachData = action.payload;
    },

    setGuestData(state, action) {
      state.serachData.guests = action.payload;
    },

    setTerm(state, action) {
      state.serachData.term = action.payload;
    },
    setDates(
      state,
      action: PayloadAction<{
        checkIn: Date;
        checkOut: Date;
      }>
    ) {
      state.serachData.dates = action.payload;
    },
  },
});

export const { actions: searchObjectAction, reducer: searchObjectReducer } =
  searchObjectSlice;
