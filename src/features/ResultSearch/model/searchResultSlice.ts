import { createSlice } from "@reduxjs/toolkit";
import { DatePickerState, SearchResultState } from "./types";

const initialState = {
  datePickerState: DatePickerState.OPEN,
} as SearchResultState;

const searchResultSlice = createSlice({
  name: "searchResultSlice",
  initialState,
  reducers: {
    setOpen(state) {
      state.datePickerState;
    },
  },
});

export const { actions: searchResultActions, reducer: searchResultReducer } =
  searchResultSlice;
