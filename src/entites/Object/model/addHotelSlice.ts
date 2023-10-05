import { createSlice } from "@reduxjs/toolkit";
import { AddHotel } from "./types";
const initialState = {
  addressData: {},
  selectLocationMap: {},
  imageFiles: {},
} as AddHotel;
const addHotelSlice = createSlice({
  initialState,
  name: "addHotelSlice",
  reducers: {
    setAddressData(state, action) {
      state.addressData = action.payload;
    },

    setLocationMap(state, action) {
      state.selectLocationMap = action.payload;
    },
    setFile(state, action) {
      state.imageFiles = action.payload;
    },
  },
});

export const { reducer: addHotelReducer, actions: addHotelActions } =
  addHotelSlice;
