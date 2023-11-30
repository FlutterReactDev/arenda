import * as Yup from "yup";

export const selectMapSchema = Yup.object({
  coordinates: Yup.array().of(Yup.number().required()).min(2).required(),
  fullAddress: Yup.string().required(),
});

export type SelectMapType = Yup.InferType<typeof selectMapSchema>;
