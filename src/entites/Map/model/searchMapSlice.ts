import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { LatLong, Marker, SearchMapState, UserGeolocation } from "./types";

const initialState = {
  markers: [],
  hoverMarker: null,
  center: [77.17531854453188, 42.6445241832498],
  zoom: 15,
  bounds: null,
  isMove: false,
  fitBounds: null,
  userGeolocation: null,
} as SearchMapState;

const searchMapSlice = createSlice({
  name: "searchMapSlice",
  initialState,
  reducers: {
    addMarker(state, action: PayloadAction<Marker>) {
      state.markers.push(action.payload);
    },

    setUserGeolocation(state, action: PayloadAction<UserGeolocation>) {
      state.userGeolocation = action.payload;
    },
    removeMarker(state, action: PayloadAction<LatLong>) {
      state.markers = state.markers.filter(
        (marker) =>
          marker.latitude != action.payload.latitude &&
          marker.longitude != action.payload.longitude
      );
    },

    removeMarkers(state, action: PayloadAction<LatLong[]>) {
      state.markers = state.markers.filter((marker) => {
        return (
          marker.latitude !=
            action.payload.filter(
              (payloadMarker) =>
                payloadMarker.latitude == marker.latitude &&
                payloadMarker.longitude == marker.longitude
            )[0].latitude &&
          marker.longitude !=
            action.payload.filter(
              (payloadMarker) =>
                payloadMarker.latitude == marker.latitude &&
                payloadMarker.longitude == marker.longitude
            )[0].longitude
        );
      });
    },

    addMarkers(state, action: PayloadAction<Marker[]>) {
      state.markers = [
        ...state.markers.filter((marker) => {
          return (
            marker.latitude !=
              action.payload.filter(
                (payloadMarker) =>
                  payloadMarker.latitude == marker.latitude &&
                  payloadMarker.longitude == marker.longitude
              )[0].latitude &&
            marker.longitude !=
              action.payload.filter(
                (payloadMarker) =>
                  payloadMarker.latitude == marker.latitude &&
                  payloadMarker.longitude == marker.longitude
              )[0].longitude
          );
        }),
        ...action.payload,
      ];
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
  },
});

export const { actions: searchMapActions, reducer: searchMapReducer } =
  searchMapSlice;
