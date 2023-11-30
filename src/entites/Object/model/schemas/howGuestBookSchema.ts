import * as Yup from "yup";

export const howGuestBookSchema = Yup.object({
  bookingType: Yup.string().oneOf(["bookInstantly", "sendRequest"]).required(),
  highlyRatedGuestsBookInstantly: Yup.boolean(),
});

export type HowGuestBookType = Yup.InferType<typeof howGuestBookSchema>;
