import { useAppDispatch } from "@shared/utils/hooks/useAppDispatch";
import { useAppSelector } from "@shared/utils/hooks/useAppSelecter";
import {
  AnObjectRoomAmenities,
  AnObjectRoomAvailability,
  AnObjectRoomBaseCost,
  AnObjectRoomBathroom,
  AnObjectRoomBeds,
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
} from "./types/createRoomTypes";
import { createRoomAction } from "./createRoomSlice";
import { getCreateRoomForm } from "./selectors";
import { RootState } from "@app/providers/StoreProvider";
import {
  AnObjectRoomBookingSettings,
  AnObjectRoomPostingRule,
} from "./types/createRoomTypes";

export const useCreateRoom = () => {
  const createRoomForm = useAppSelector(getCreateRoomForm);
  const anObjectId = useAppSelector(
    (state: RootState) => state.createRoom.anObjectId
  );
  const categoryType = useAppSelector(
    (state: RootState) => state.createRoom.categoryType
  );

  const categoryCount = useAppSelector(
    (state: RootState) => state.createRoom.categoryCount
  );
  const dispatch = useAppDispatch();

  const setAnObjectRoomDescription = (
    data: Partial<AnObjectRoomDescription>
  ) => {
    dispatch(createRoomAction.setAnObjectRoomDescription(data));
  };
  const setAnObjectRoomBeds = (data: AnObjectRoomBeds[]) => {
    dispatch(createRoomAction.setAnObjectRoomBeds(data));
  };

  const setAnObjectRoomBaseCost = (data: Partial<AnObjectRoomBaseCost>) => {
    dispatch(createRoomAction.setAnObjectRoomBaseCost(data));
  };

  const setAnObjectRoomInsuranceDeposit = (
    data: Partial<AnObjectRoomInsuranceDeposit>
  ) => {
    dispatch(createRoomAction.setAnObjectRoomInsuranceDeposit(data));
  };

  const setAnObjectRoomCleaningFee = (
    data: Partial<AnObjectRoomCleaningFee>
  ) => {
    dispatch(createRoomAction.setAnObjectRoomCleaningFee(data));
  };

  const setAnObjectRoomAmenities = (data: Partial<AnObjectRoomAmenities>) => {
    dispatch(createRoomAction.setAnObjectRoomAmenities(data));
  };

  const setAnObjectRoomViewFromWindow = (
    data: Partial<AnObjectRoomViewFromWindow>
  ) => {
    dispatch(createRoomAction.setAnObjectRoomViewFromWindow(data));
  };

  const setAnObjectRoomAvailability = (
    data: Partial<AnObjectRoomAvailability>
  ) => {
    dispatch(createRoomAction.setAnObjectRoomAvailability(data));
  };

  const setAnObjectRoomEquipment = (data: Partial<AnObjectRoomEquipment>) => {
    dispatch(createRoomAction.setAnObjectRoomEquipment(data));
  };

  const setAnObjectRoomKitchenEquipment = (
    data: Partial<AnObjectRoomKitchenEquipment>
  ) => {
    dispatch(createRoomAction.setAnObjectRoomKitchenEquipment(data));
  };

  const setAnObjectRoomBathroom = (data: Partial<AnObjectRoomBathroom>) => {
    dispatch(createRoomAction.setAnObjectRoomBathroom(data));
  };

  const setAnObjectRoomIndoorRelaxation = (
    data: Partial<AnObjectRoomIndoorRelaxation>
  ) => {
    dispatch(createRoomAction.setAnObjectRoomIndoorRelaxation(data));
  };

  const setAnObjectRoomOutsideRelaxation = (
    data: Partial<AnObjectRoomOutsideRelaxation>
  ) => {
    dispatch(createRoomAction.setAnObjectRoomOutsideRelaxation(data));
  };

  const setAnObjectRoomInfrastructureLeisureNearby = (
    data: Partial<AnObjectRoomInfrastructureLeisureNearby>
  ) => {
    dispatch(createRoomAction.setAnObjectRoomInfrastructureLeisureNearby(data));
  };

  const setAnObjectRoomForChildren = (
    data: Partial<AnObjectRoomForChildren>
  ) => {
    dispatch(createRoomAction.setAnObjectRoomForChildren(data));
  };

  const setAnObjectRoomImages = (data: Partial<AnObjectRoomImage>) => {
    dispatch(createRoomAction.setAnObjectRoomImages(data));
  };

  const setDescription = (data: string) => {
    dispatch(createRoomAction.setDescription(data));
  };

  const clearForm = () => {
    dispatch(createRoomAction.clearForm());
  };

  const setCategoryType = (data: number) => {
    dispatch(createRoomAction.setCategoryType(data));
  };

  const setCategoryCount = (data: number) => {
    dispatch(createRoomAction.setCategoryCount(data));
  };

  const setAnObjectId = (data: number) => {
    dispatch(createRoomAction.setAnObjectId(data));
  };
  const setAnObjectRoomBookingSettings = (
    data: Partial<AnObjectRoomBookingSettings>
  ) => {
    dispatch(createRoomAction.setAnObjectRoomBookingSettings(data));
  };
  const setAnObjectRoomPostingRule = (
    data: Partial<AnObjectRoomPostingRule>
  ) => {
    dispatch(createRoomAction.setAnObjectRoomPostingRule(data));
  };

  const setAnObjectRoomMaximumGuests = (data: number) => {
    dispatch(createRoomAction.setAnObjectRoomMaximumGuests(data));
  };

  return {
    createRoomForm,
    anObjectId,
    categoryType,
    categoryCount,
    clearForm,
    setAnObjectRoomDescription,
    setAnObjectRoomBeds,
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
    setCategoryType,
    setCategoryCount,
    setAnObjectId,
    setAnObjectRoomBookingSettings,
    setAnObjectRoomPostingRule,
    setAnObjectRoomMaximumGuests,
  };
};
