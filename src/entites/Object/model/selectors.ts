import { RootState } from "@app/providers/StoreProvider";

export const getForm = (screen: number, step: number) => (state: RootState) => {
  return state.addObjectStep.forms.filter(
    (form) => form.screen == screen && form.step == step
  )[0].data;
};

export const getAddressData = (state: RootState) => state.addHotel.addressData;

export const getLocationMap = (state: RootState) =>
  state.addHotel.selectLocationMap;

export const getImageFiles = (state: RootState) => state.addHotel.imageFiles;
