import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AddObjectForm, ObjectValue } from "./types";
import { Option } from "@shared/ui/SelectSearch";

const initialState = {
  object: ObjectValue.ROOM,
  city: undefined,
  country: undefined,
  objectType: undefined,
  region: undefined,
} as AddObjectForm;

const addObjectSlice = createSlice({
  name: "addObjectSlice",
  initialState,
  reducers: {
    setObject(state, action: PayloadAction<ObjectValue>) {
      state.object = action.payload;
    },

    setCity(state, action: PayloadAction<Option | undefined>) {
      state.city = action.payload;
    },
    setCountry(state, action: PayloadAction<Option | undefined>) {
      state.country = action.payload;
    },
    setObjectType(state, action: PayloadAction<number>) {
      state.objectType = action.payload;
    },
    setRegion(state, action: PayloadAction<Option | undefined>) {
      state.region = action.payload;
    },
  },
});

export const {
  actions: addObjectSliceActions,
  reducer: addObjectSliceReducer,
} = addObjectSlice;
