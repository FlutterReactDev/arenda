import { RootState } from "@app/providers/StoreProvider";
import { createSelector } from "@reduxjs/toolkit";

export const getAnObjectRoomDescription = (state: RootState) =>
  state.createObject.createRoomForm.anObjectRoomDescription;
export const getAnObjectRoomBed = (state: RootState) =>
  state.createObject.createRoomForm.anObjectRoomBed;
export const getAnObjectRoomBaseCost = (state: RootState) =>
  state.createObject.createRoomForm.anObjectRoomBaseCost;
export const getAnObjectRoomInsuranceDeposit = (state: RootState) =>
  state.createObject.createRoomForm.anObjectRoomInsuranceDeposit;
export const getAnObjectRoomCleaningFee = (state: RootState) =>
  state.createObject.createRoomForm.anObjectRoomBaseCost;
export const getAnObjectRoomAmenities = (state: RootState) =>
  state.createObject.createRoomForm.anObjectRoomAmenities;
export const getAnObjectRoomViewFromWindow = (state: RootState) =>
  state.createObject.createRoomForm.anObjectRoomViewFromWindow;
export const getAnObjectRoomAvailability = (state: RootState) =>
  state.createObject.createRoomForm.anObjectRoomAvailability;
export const getAnObjectRoomEquipment = (state: RootState) =>
  state.createObject.createRoomForm.anObjectRoomEquipment;
export const getAnObjectRoomKitchenEquipment = (state: RootState) =>
  state.createObject.createRoomForm.anObjectRoomKitchenEquipment;
export const getAnObjectRoomBathroom = (state: RootState) =>
  state.createObject.createRoomForm.anObjectRoomBathroom;
export const getAnObjectRoomIndoorRelaxation = (state: RootState) =>
  state.createObject.createRoomForm.anObjectRoomIndoorRelaxation;
export const getAnObjectRoomOutsideRelaxation = (state: RootState) =>
  state.createObject.createRoomForm.anObjectRoomOutsideRelaxation;
export const getAnObjectRoomInfrastructureLeisureNearby = (state: RootState) =>
  state.createObject.createRoomForm.anObjectRoomInfrastructureLeisureNearby;
export const getAnObjectRoomForChildren = (state: RootState) =>
  state.createObject.createRoomForm.anObjectRoomForChildren;
export const getAnObjectRoomImages = (state: RootState) =>
  state.createObject.createRoomForm.anObjectRoomImages;
export const getDescription = (state: RootState) =>
  state.createObject.createRoomForm.description;

export const getCreateObjectForm = createSelector(
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
    description
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
    };
  }
);
