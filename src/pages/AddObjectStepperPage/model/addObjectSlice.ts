import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AddObjectForm, AddObjectsForms } from "../model/types";
const initialState = {
  forms: [
    {
      screen: 1,
      step: 0,
      data: {},
    },
    {
      screen: 2,
      step: 0,
      data: {},
    },
    {
      screen: 3,
      step: 0,
      data: {},
    },
    {
      screen: 4,
      step: 0,
      data: {},
    },
    {
      screen: 5,
      step: 0,
      data: {},
    },
    {
      screen: 6,
      step: 0,
      data: {},
    },
    {
      screen: 1,
      step: 1,
      data: {},
    },
    {
      screen: 2,
      step: 1,
      data: {},
    },
    {
      screen: 3,
      step: 1,
      data: {},
    },
    {
      screen: 4,
      step: 1,
      data: {},
    },
    {
      screen: 5,
      step: 1,
      data: {},
    },
    {
      screen: 1,
      step: 2,
      data: {},
    },
    {
      screen: 2,
      step: 2,
      data: {},
    },
  ],
} as AddObjectForm;
export const addObjectSlice = createSlice({
  name: "addObjectSlice",
  initialState,
  reducers: {
    setForm(
      state,
      actions: PayloadAction<{
        step: number;
        screen: number;
        data: AddObjectsForms;
      }>
    ) {
      const form = state.forms.findIndex(
        (form) =>
          form.screen == actions.payload.screen &&
          form.step == actions.payload.step
      );
      state.forms[form].data = actions.payload.data;
    },
  },
});

export const { actions: addObjectAction } = addObjectSlice;
export const { reducer: addObjectReducer } = addObjectSlice;
