import { createSlice } from "@reduxjs/toolkit";
import { SelectMapState } from "./types";

const initialState = {
  markerClear: false,
  markers: [],
  selectedObject: null,
} as SelectMapState;

const selectMapSlice = createSlice({
  name: "selectMapSlice",
  initialState,
  reducers: {
    setMarkerClear(state) {
      state.markerClear = true;
    },

    setMarkerShow(state) {
      state.markerClear = false;
    },

    setMarkers(state, action) {
      state.markers = action.payload;
    },

    setSelectedObject(state, action) {
      state.selectedObject = action.payload;
      state.markerClear = true;
    },

    clearSelectObject(state) {
      state.selectedObject = null;
      state.markerClear = false;
    },
  },
});

export const { actions: selectMapActions, reducer: selectMapReducer } =
  selectMapSlice;
