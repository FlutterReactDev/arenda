import { useAppDispatch } from "@shared/utils/hooks/useAppDispatch";
import { useAppSelector } from "@shared/utils/hooks/useAppSelecter";
import { getCreateObjectForm } from "./selectors";

import { createObjectAction } from "..";
import { SelectMapType } from "./schemas/selectMapSchema";
import {
  AddressData,
  AnObjectAdditionalComfort,
  AnObjectDetail,
  AnObjectFeeAdditionalService,
  AnObjectMeal,
} from "./types/createObjectTypes";

export const useCreateObject = () => {
  const dispatch = useAppDispatch();
  const formData = useAppSelector(getCreateObjectForm);
  const setAddressData = (data: AddressData) => {
    dispatch(createObjectAction.setAddressData(data));
  };
  const setLocationMap = (data: SelectMapType) => {
    dispatch(createObjectAction.setLocationMap(data));
  };
  const setAnObjectPropertyTypeId = (data: number) => {
    dispatch(createObjectAction.setAnObjectPropertyTypeId(data));
  };
  const setAnObjectTypeId = (data: number) => {
    dispatch(createObjectAction.setAnObjectTypeId(data));
  };
  const setCountryId = (data: number) => {
    dispatch(createObjectAction.setCountryId(data));
  };
  const setRegionId = (data: number) => {
    dispatch(createObjectAction.setRegionId(data));
  };
  const setCityId = (data: number) => {
    dispatch(createObjectAction.setCityId(data));
  };
  const setAnObjectAdditionalComfort = (data: AnObjectAdditionalComfort) => {
    dispatch(createObjectAction.setAnObjectAdditionalComfort(data));
  };
  const setAnObjectFeeAdditionalService = (
    data: Partial<AnObjectFeeAdditionalService>
  ) => {
    dispatch(createObjectAction.setAnObjectFeeAdditionalService(data));
  };

  const setAnObjectMeal = (data: AnObjectMeal) => {
    dispatch(createObjectAction.setAnObjectMeal(data));
  };
  const setRating = (data: number | undefined) => {
    dispatch(createObjectAction.setRating(data));
  };

  const setName = (data: string) => {
    dispatch(createObjectAction.setName(data));
  };
  const setAnObjectDetail = (data: AnObjectDetail) => {
    dispatch(createObjectAction.setAnObjectDetail(data));
  };
  const setParking = (data: number) => {
    dispatch(createObjectAction.setParking(data));
  };
  const setParkingSumm = (data: number) => {
    dispatch(createObjectAction.setParkingSumm(data));
  };
  const setInternetAccess = (data: number) => {
    dispatch(createObjectAction.setInternetAccess(data));
  };
  const setInternetAccessSumm = (data: number) => {
    dispatch(createObjectAction.setInternetAccessSumm(data));
  };
  const clearForm = () => {
    dispatch(createObjectAction.clearForm());
  };
  return {
    formData,
    setAddressData,
    setLocationMap,
    setAnObjectPropertyTypeId,
    setInternetAccess,
    setParking,
    setAnObjectDetail,
    setName,
    setRating,
    setAnObjectMeal,
    setAnObjectFeeAdditionalService,
    setAnObjectAdditionalComfort,
    setParkingSumm,
    setInternetAccessSumm,
    setCityId,
    setRegionId,
    setCountryId,
    setAnObjectTypeId,
    clearForm,
  };
};
