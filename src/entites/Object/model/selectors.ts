import { RootState } from "@app/providers/StoreProvider";
import { createSelector } from "@reduxjs/toolkit";
export const getCreateObjectForm = (state: RootState) => state.createObject;

export const getCategoryType = (state: RootState) =>
  state.createRoom.categoryType;
export const getAnObjectId = (state: RootState) => state.createRoom.anObjectId;
export const getAnObjectRoomDescription = (state: RootState) =>
  state.createRoom.createRoomForm.anObjectRoomDescription;
export const getAnObjectRoomBed = (state: RootState) =>
  state.createRoom.createRoomForm.anObjectRoomBed;
export const getAnObjectRoomBaseCost = (state: RootState) =>
  state.createRoom.createRoomForm.anObjectRoomBaseCost;
export const getAnObjectRoomInsuranceDeposit = (state: RootState) =>
  state.createRoom.createRoomForm.anObjectRoomInsuranceDeposit;
export const getAnObjectRoomCleaningFee = (state: RootState) =>
  state.createRoom.createRoomForm.anObjectRoomCleaningFee;
export const getAnObjectRoomAmenities = (state: RootState) =>
  state.createRoom.createRoomForm.anObjectRoomAmenities;
export const getAnObjectRoomViewFromWindow = (state: RootState) =>
  state.createRoom.createRoomForm.anObjectRoomViewFromWindow;
export const getAnObjectRoomAvailability = (state: RootState) =>
  state.createRoom.createRoomForm.anObjectRoomAvailability;
export const getAnObjectRoomEquipment = (state: RootState) =>
  state.createRoom.createRoomForm.anObjectRoomEquipment;
export const getAnObjectRoomKitchenEquipment = (state: RootState) =>
  state.createRoom.createRoomForm.anObjectRoomKitchenEquipment;
export const getAnObjectRoomBathroom = (state: RootState) =>
  state.createRoom.createRoomForm.anObjectRoomBathroom;
export const getAnObjectRoomIndoorRelaxation = (state: RootState) =>
  state.createRoom.createRoomForm.anObjectRoomIndoorRelaxation;
export const getAnObjectRoomOutsideRelaxation = (state: RootState) =>
  state.createRoom.createRoomForm.anObjectRoomOutsideRelaxation;
export const getAnObjectRoomInfrastructureLeisureNearby = (state: RootState) =>
  state.createRoom.createRoomForm.anObjectRoomInfrastructureLeisureNearby;
export const getAnObjectRoomForChildren = (state: RootState) =>
  state.createRoom.createRoomForm.anObjectRoomForChildren;
export const getAnObjectRoomImages = (state: RootState) =>
  state.createRoom.createRoomForm.anObjectRoomImages;
export const getDescription = (state: RootState) =>
  state.createRoom.createRoomForm.description;
export const getAnObjectRoomBookingSettings = (state: RootState) =>
  state.createRoom.createRoomForm.anObjectRoomBookingSettings;
export const getAnObjectRoomPostingRule = (state: RootState) =>
  state.createRoom.createRoomForm.anObjectRoomPostingRule;
export const getCreateRoomForm = createSelector(
  [
    getAnObjectRoomDescription,
    getAnObjectRoomBed,
    getAnObjectRoomBaseCost,
    getAnObjectRoomInsuranceDeposit,
    getAnObjectRoomCleaningFee,
    getAnObjectRoomAmenities,
    getAnObjectRoomViewFromWindow,
    getAnObjectRoomAvailability,
    getAnObjectRoomEquipment,
    getAnObjectRoomKitchenEquipment,
    getAnObjectRoomBathroom,
    getAnObjectRoomIndoorRelaxation,
    getAnObjectRoomOutsideRelaxation,
    getAnObjectRoomInfrastructureLeisureNearby,
    getAnObjectRoomForChildren,
    getAnObjectRoomImages,
    getDescription,
    getAnObjectRoomBookingSettings,
    getAnObjectRoomPostingRule,
  ],
  (
    anObjectRoomDescription,
    anObjectRoomBed,
    anObjectRoomBaseCost,
    anObjectRoomInsuranceDeposit,
    anObjectRoomCleaningFee,
    anObjectRoomAmenities,
    anObjectRoomViewFromWindow,
    anObjectRoomAvailability,
    anObjectRoomEquipment,
    anObjectRoomKitchenEquipment,
    anObjectRoomBathroom,
    anObjectRoomIndoorRelaxation,
    anObjectRoomOutsideRelaxation,
    anObjectRoomInfrastructureLeisureNearby,
    anObjectRoomForChildren,
    anObjectRoomImages,
    description,
    anObjectRoomBookingSettings,
    anObjectRoomPostingRule
  ) => {
    return {
      anObjectRoomDescription,
      anObjectRoomBed,
      anObjectRoomBaseCost,
      anObjectRoomInsuranceDeposit,
      anObjectRoomCleaningFee,
      anObjectRoomAmenities,
      anObjectRoomViewFromWindow,
      anObjectRoomAvailability,
      anObjectRoomEquipment,
      anObjectRoomKitchenEquipment,
      anObjectRoomBathroom,
      anObjectRoomIndoorRelaxation,
      anObjectRoomOutsideRelaxation,
      anObjectRoomInfrastructureLeisureNearby,
      anObjectRoomForChildren,
      anObjectRoomImages,
      description,
      anObjectRoomBookingSettings,
      anObjectRoomPostingRule,
    };
  }
);
