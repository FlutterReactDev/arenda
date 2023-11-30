import * as Yup from "yup";
export const checkInCheckOutSchema = Yup.object({
  checkInAfter: Yup.string().required(),
  checkOutAfter: Yup.string().required(),
});

export type CheckInCheckOutType = Yup.InferType<typeof checkInCheckOutSchema>;
