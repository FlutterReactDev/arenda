import { createSlice } from "@reduxjs/toolkit";
import { DragObjectState } from "./types";
const initialState = {
  currentObjectIndex: null,
  commentIsOpen: false,
} as DragObjectState;
const dragObjectSlice = createSlice({
  name: "dragObjectSlice",
  initialState,
  reducers: {
    setCurrentObjectIndex(state, action) {
      state.currentObjectIndex = action.payload;
    },
    setCommentOpen(state) {
      state.commentIsOpen = true;
    },
    setCommentClose(state) {
      state.commentIsOpen = false;
    },
  },
});

export const { actions: dragObjectAction, reducer: dragObjectReducer } =
  dragObjectSlice;
