import { createSlice } from "@reduxjs/toolkit";
import { HeaderState } from "./types/HeaderTypes";
const initialState = {
  headerHeight: 48,
} as HeaderState;
const headerSlice = createSlice({
  name: "headerSlice",
  initialState,
  reducers: {
    setHeight(state, action) {
      state.headerHeight = action.payload;
    },
  },
});

export const { actions: headerActions, reducer: headerReducer } = headerSlice;
