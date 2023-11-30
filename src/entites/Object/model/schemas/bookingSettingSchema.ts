import * as Yup from "yup";

export const bookingSettingSchema = Yup.object({
  prepaymentPercent: Yup.number().required(),
  instantBookingStart: Yup.number().required(),
  fromBookingToCheckIn: Yup.number().required(),
});

export type BookingSettingType = Yup.InferType<typeof bookingSettingSchema>;
