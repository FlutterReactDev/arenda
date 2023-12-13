import { RootState } from "@app/providers/StoreProvider";

export const getBookingForm = (state: RootState) =>
  state.bookingForm.bookingForm;
