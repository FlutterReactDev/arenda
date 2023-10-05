import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AddObjectForm, AddObjectsForms } from "./types";

const initialState = {
  forms: [
    {
      screen: 0,
      step: 0,
      data: {},
    },
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
      screen: 0,
      step: 1,
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
      screen: 0,
      step: 2,
      data: {},
    },
    {
      screen: 1,
      step: 2,
      data: {},
    },
  ],
} as AddObjectForm;
export const addObjectStepSlice = createSlice({
  name: "addObjectStepSlice",
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

export const { actions: addObjectStepActions } = addObjectStepSlice;
export const { reducer: addObjectStepReducer } = addObjectStepSlice;
