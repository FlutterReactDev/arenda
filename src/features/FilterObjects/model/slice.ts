import { createSlice } from "@reduxjs/toolkit";

const filterObjectsSlice = createSlice({
  name: "filterObjectsSlice",
  initialState: {},
  reducers: {},
});

export const { actions: filterObjectActions, reducer: filterObjectReducer } =
  filterObjectsSlice;
