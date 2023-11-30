import { useAppSelector } from "@shared/utils/hooks/useAppSelecter";
import { getCreateObjectForm } from "./selectors";
import { useAppDispatch } from "@shared/utils/hooks/useAppDispatch";
import { createObjectAction } from "..";
import {
  AnObjectRoomAmenities,
  AnObjectRoomAvailability,
  AnObjectRoomBaseCost,
  AnObjectRoomBathroom,
  AnObjectRoomBed,
  AnObjectRoomCleaningFee,
  AnObjectRoomDescription,
  AnObjectRoomEquipment,
  AnObjectRoomForChildren,
  AnObjectRoomImage,
  AnObjectRoomIndoorRelaxation,
  AnObjectRoomInfrastructureLeisureNearby,
  AnObjectRoomInsuranceDeposit,
  AnObjectRoomKitchenEquipment,
  AnObjectRoomOutsideRelaxation,
  AnObjectRoomViewFromWindow,
} from "./types";

export const useCreateObject = () => {
  const createObjectForm = useAppSelector(getCreateObjectForm);
  const dispatch = useAppDispatch();

  const setAnObjectRoomDescription = (
    data: Partial<AnObjectRoomDescription>
  ) => {
    dispatch(createObjectAction.setAnObjectRoomDescription(data));
  };
  const setAnObjectRoomBed = (data: Partial<AnObjectRoomBed>) => {
    dispatch(createObjectAction.setAnObjectRoomBed(data));
  };

  const setAnObjectRoomBaseCost = (data: Partial<AnObjectRoomBaseCost>) => {
    dispatch(createObjectAction.setAnObjectRoomBaseCost(data));
  };

  const setAnObjectRoomInsuranceDeposit = (
    data: Partial<AnObjectRoomInsuranceDeposit>
  ) => {
    dispatch(createObjectAction.setAnObjectRoomInsuranceDeposit(data));
  };

  const setAnObjectRoomCleaningFee = (
    data: Partial<AnObjectRoomCleaningFee>
  ) => {
    dispatch(createObjectAction.setAnObjectRoomCleaningFee(data));
  };

  const setAnObjectRoomAmenities = (data: Partial<AnObjectRoomAmenities>) => {
    dispatch(createObjectAction.setAnObjectRoomAmenities(data));
  };

  const setAnObjectRoomViewFromWindow = (
    data: Partial<AnObjectRoomViewFromWindow>
  ) => {
    dispatch(createObjectAction.setAnObjectRoomViewFromWindow(data));
  };

  const setAnObjectRoomAvailability = (
    data: Partial<AnObjectRoomAvailability>
  ) => {
    dispatch(createObjectAction.setAnObjectRoomAvailability(data));
  };

  const setAnObjectRoomEquipment = (data: Partial<AnObjectRoomEquipment>) => {
    dispatch(createObjectAction.setAnObjectRoomEquipment(data));
  };

  const setAnObjectRoomKitchenEquipment = (
    data: Partial<AnObjectRoomKitchenEquipment>
  ) => {
    dispatch(createObjectAction.setAnObjectRoomKitchenEquipment(data));
  };

  const setAnObjectRoomBathroom = (data: Partial<AnObjectRoomBathroom>) => {
    dispatch(createObjectAction.setAnObjectRoomBathroom(data));
  };

  const setAnObjectRoomIndoorRelaxation = (
    data: Partial<AnObjectRoomIndoorRelaxation>
  ) => {
    dispatch(createObjectAction.setAnObjectRoomIndoorRelaxation(data));
  };

  const setAnObjectRoomOutsideRelaxation = (
    data: Partial<AnObjectRoomOutsideRelaxation>
  ) => {
    dispatch(createObjectAction.setAnObjectRoomOutsideRelaxation(data));
  };

  const setAnObjectRoomInfrastructureLeisureNearby = (
    data: Partial<AnObjectRoomInfrastructureLeisureNearby>
  ) => {
    dispatch(
      createObjectAction.setAnObjectRoomInfrastructureLeisureNearby(data)
    );
  };

  const setAnObjectRoomForChildren = (
    data: Partial<AnObjectRoomForChildren>
  ) => {
    dispatch(createObjectAction.setAnObjectRoomForChildren(data));
  };

  const setAnObjectRoomImages = (data: Partial<AnObjectRoomImage>) => {
    dispatch(createObjectAction.setAnObjectRoomImages(data));
  };

  const setDescription = (data: string) => {
    dispatch(createObjectAction.setDescription(data));
  };

  const clearForm = () => {
    dispatch(createObjectAction.clearForm());
  };

  return {
    createObjectForm,
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
