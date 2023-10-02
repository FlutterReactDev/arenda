import * as Yup from "yup";

export const selectMapSchema = Yup.object({
  coordinates: Yup.array().of(Yup.number().required()).min(2).required(),
  addressName: Yup.string().required(),
});
