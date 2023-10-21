import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { SelectLocationSchemaType } from "./schema";

const initialState = {} as SelectLocationSchemaType;

const addObjectSlice = createSlice({
  name: "addObjectSlice",
  initialState,
  reducers: {
    setLocationData(
      state,
      {
        payload: { city, country, objectType, objectTypeProperty, region },
      }: PayloadAction<SelectLocationSchemaType>
    ) {
      state.city = city;
      state.country = country;
      state.objectType = objectType;
      state.objectTypeProperty = objectTypeProperty;
      state.region = region;
    },
  },
});

export const { actions: addObjectActions, reducer: addObjectSliceReducer } =
  addObjectSlice;
