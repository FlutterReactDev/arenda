import * as Yup from "yup";

export const selectMapSchema = Yup.object({
  selectMap: Yup.object({
    coordinates: Yup.object({
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
    }),
    fullAddress: Yup.string().required(),
  }),
});

export type SelectMapType = Yup.InferType<typeof selectMapSchema>;
