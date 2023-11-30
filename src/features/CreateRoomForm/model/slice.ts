import { createSlice } from "@reduxjs/toolkit";
import { CreateRoomState } from "./types";
const initialState = {
  createRoomForm: {},
} as CreateRoomState;
const createRoomSlice = createSlice({
  name: "createRoomSlice",
  initialState,
  reducers: {
    setAnObjectRoomDescription(state, action) {
      state.createRoomForm.anObjectRoomDescription = action.payload;
    },

    setAnObjectRoomBed(state, action) {
      state.createRoomForm.anObjectRoomBed = action.payload;
    },

    setAnObjectRoomBaseCost(state, action) {
      state.createRoomForm.anObjectRoomBaseCost = action.payload;
    },

    setAnObjectRoomInsuranceDeposit(state, action) {
      state.createRoomForm.anObjectRoomInsuranceDeposit = action.payload;
    },

    setAnObjectRoomCleaningFee(state, action) {
      state.createRoomForm.anObjectRoomCleaningFee = action.payload;
    },

    setAnObjectRoomAmenities(state, action) {
      state.createRoomForm.anObjectRoomAmenities = action.payload;
    },

    setAnObjectRoomViewFromWindow(state, action) {
      state.createRoomForm.anObjectRoomViewFromWindow = action.payload;
    },

    setAnObjectRoomAvailability(state, action) {
      state.createRoomForm.anObjectRoomAvailability = action.payload;
    },
    setAnObjectRoomEquipment(state, action) {
      state.createRoomForm.anObjectRoomEquipment = action.payload;
    },
    setAnObjectRoomKitchenEquipment(state, action) {
      state.createRoomForm.anObjectRoomKitchenEquipment = action.payload;
    },
    setAnObjectRoomBathroom(state, action) {
      state.createRoomForm.anObjectRoomBathroom = action.payload;
    },
    setAnObjectRoomIndoorRelaxation(state, action) {
      state.createRoomForm.anObjectRoomIndoorRelaxation = action.payload;
    },
    setAnObjectRoomOutsideRelaxation(state, action) {
      state.createRoomForm.anObjectRoomOutsideRelaxation = action.payload;
    },
    setAnObjectRoomInfrastructureLeisureNearby(state, action) {
      state.createRoomForm.anObjectRoomInfrastructureLeisureNearby =
        action.payload;
    },
    setAnObjectRoomForChildren(state, action) {
      state.createRoomForm.anObjectRoomForChildren = action.payload;
    },

    setAnObjectRoomImages(state, action) {
      state.createRoomForm.anObjectRoomImages = action.payload;
    },
    setDescription(state, action) {
      state.createRoomForm.description = action.payload;
    },
    clearForm(state) {
      state.createRoomForm = {
        anObjectRoomAmenities: undefined,
        anObjectRoomAvailability: undefined,
        anObjectRoomBaseCost: undefined,
        anObjectRoomBathroom: undefined,
        anObjectRoomBed: undefined,
        anObjectRoomCleaningFee: undefined,
        anObjectRoomDescription: undefined,
        anObjectRoomEquipment: undefined,
        anObjectRoomForChildren: undefined,
        anObjectRoomImages: undefined,
        anObjectRoomIndoorRelaxation: undefined,
        anObjectRoomInsuranceDeposit: undefined,
        anObjectRoomInfrastructureLeisureNearby: undefined,
        anObjectRoomKitchenEquipment: undefined,
        anObjectRoomOutsideRelaxation: undefined,
        anObjectRoomViewFromWindow: undefined,
        description: undefined,
      };
    },
  },
});

export const { actions: createRoomFormActions, reducer: createRoomReducer } =
  createRoomSlice;
