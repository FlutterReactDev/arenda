import { RootState } from "@app/providers/StoreProvider";

export const getForm = (screen: number, step: number) => (state: RootState) => {
  return state.addOBject.forms.filter(
    (form) => form.screen == screen && form.step == step
  )[0].data;
};
