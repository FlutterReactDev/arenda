import * as Yup from "yup";

export const howGuestBookSchema = Yup.object({
  bookingType: Yup.string().oneOf(["bookInstantly", "sendRequest"]).required(),
  highlyRatedGuestsBookInstantly: Yup.boolean(),
});
