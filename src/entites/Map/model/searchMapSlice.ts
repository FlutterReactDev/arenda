import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { LatLong, MarkerItem, SearchMapState, UserGeolocation } from "./types";

const initialState = {
  markers: [],
  hoverMarker: null,

  bounds: null,
  isMove: false,
  fitBounds: null,
  userGeolocation: null,
  mapInstance: null,
  mapGLBundle: null,
} as SearchMapState;

const searchMapSlice = createSlice({
  name: "searchMapSlice",
  initialState,
  reducers: {
    setUserGeolocation(state, action: PayloadAction<UserGeolocation>) {
      state.userGeolocation = action.payload;
    },

    addMarkers(state, action: PayloadAction<MarkerItem[]>) {
      state.markers = [...action.payload];
    },

    clearMarkers(state) {
      state.markers = [];
    },

    setHover(state, action: PayloadAction<LatLong>) {
      state.hoverMarker = action.payload;
    },

    clearHover(state) {
      state.hoverMarker = null;
    },

    setCenter(state, action) {
      state.center = action.payload;
    },

    setZoom(state, action) {
      state.zoom = action.payload;
    },

    setBounds(state, action) {
      state.bounds = action.payload;
    },

    clearBounds(state) {
      state.bounds = null;
    },

    setIsMoving(state) {
      state.isMove = true;
    },
    setIsStopMoving(state) {
      state.isMove = false;
    },

    setFitBounds(state, action) {
      state.fitBounds = action.payload;
    },
    clearFitBounds(state) {
      state.fitBounds = null;
    },

    setMapInstance(state, action) {
      state.mapInstance = action.payload;
    },
    setMapGlBundle(state, action) {
      state.mapGLBundle = action.payload;
    },
  },
});

export const { actions: searchMapActions, reducer: searchMapReducer } =
  searchMapSlice;
