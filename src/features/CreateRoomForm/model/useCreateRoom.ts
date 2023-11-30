import { useAppSelector } from "@shared/utils/hooks/useAppSelecter";
import { getCreateRoomForm } from "./selectors";
import { useAppDispatch } from "@shared/utils/hooks/useAppDispatch";
import { createRoomFormActions } from "..";

export const useCreateRoom = () => {
  const createRoomFormData = useAppSelector(getCreateRoomForm);
  const dispatch = useAppDispatch();

  const setAnObjectRoomDescription = (data) => {
    dispatch(createRoomFormActions.setAnObjectRoomDescription(data));
  };
  const setAnObjectRoomBed = (data) => {
    dispatch(createRoomFormActions.setAnObjectRoomBed(data));
  };

  const setAnObjectRoomBaseCost = (data) => {
    dispatch(createRoomFormActions.setAnObjectRoomBaseCost(data));
  };

  const setAnObjectRoomInsuranceDeposit = (data) => {
    dispatch(createRoomFormActions.setAnObjectRoomInsuranceDeposit(data));
  };

  const setAnObjectRoomCleaningFee = (data) => {
    dispatch(createRoomFormActions.setAnObjectRoomCleaningFee(data));
  };

  const setAnObjectRoomAmenities = (data) => {
    dispatch(createRoomFormActions.setAnObjectRoomAmenities(data));
  };

  const setAnObjectRoomViewFromWindow = (data) => {
    dispatch(createRoomFormActions.setAnObjectRoomViewFromWindow(data));
  };

  const setAnObjectRoomAvailability = (data) => {
    dispatch(createRoomFormActions.setAnObjectRoomAvailability(data));
  };

  const setAnObjectRoomEquipment = (data) => {
    dispatch(createRoomFormActions.setAnObjectRoomEquipment(data));
  };

  const setAnObjectRoomKitchenEquipment = (data) => {
    dispatch(createRoomFormActions.setAnObjectRoomKitchenEquipment(data));
  };

  const setAnObjectRoomBathroom = (data) => {
    dispatch(createRoomFormActions.setAnObjectRoomBathroom(data));
  };

  const setAnObjectRoomIndoorRelaxation = (data) => {
    dispatch(createRoomFormActions.setAnObjectRoomIndoorRelaxation(data));
  };

  const setAnObjectRoomOutsideRelaxation = (data) => {
    dispatch(createRoomFormActions.setAnObjectRoomOutsideRelaxation(data));
  };

  const setAnObjectRoomInfrastructureLeisureNearby = (data) => {
    dispatch(
      createRoomFormActions.setAnObjectRoomInfrastructureLeisureNearby(data)
    );
  };

  const setAnObjectRoomForChildren = (data) => {
    dispatch(createRoomFormActions.setAnObjectRoomForChildren(data));
  };

  const setAnObjectRoomImages = (data) => {
    dispatch(createRoomFormActions.setAnObjectRoomImages(data));
  };

  const setDescription = (data) => {
    dispatch(createRoomFormActions.setDescription(data));
  };

  const clearForm = () => {
    dispatch(createRoomFormActions.clearForm());
  };

  return {
    createRoomFormData,
    clearForm,
    setAnObjectRoomDescription,
    setAnObjectRoomBed,
    setAnObjectRoomBaseCost,
    setAnObjectRoomInsuranceDeposit,
    setAnObjectRoomCleaningFee,
    setAnObjectRoomAmenities,
    setAnObjectRoomViewFromWindow,
    setAnObjectRoomAvailability,
    setAnObjectRoomEquipment,
    setAnObjectRoomKitchenEquipment,
    setAnObjectRoomBathroom,
    setAnObjectRoomIndoorRelaxation,
    setAnObjectRoomOutsideRelaxation,
    setAnObjectRoomInfrastructureLeisureNearby,
    setAnObjectRoomForChildren,
    setAnObjectRoomImages,
    setDescription,
  };
};
