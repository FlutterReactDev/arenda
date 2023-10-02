import * as Yup from "yup";
export const checkInCheckOutSchema = Yup.object({
  checkIn: Yup.string().required(),
  checkOut: Yup.string().required(),
});
