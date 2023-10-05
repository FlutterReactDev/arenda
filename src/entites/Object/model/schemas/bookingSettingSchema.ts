import * as Yup from "yup";

export const bookingSettingSchema = Yup.object({
  prepaymentAmount: Yup.string().required(),
  instantBookingIsValid: Yup.string().required(),
  bookingToCheckInTheFollowingRemain: Yup.string().required(),
});
