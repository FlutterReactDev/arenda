import * as Yup from "yup";
export const forthFormSchema = Yup.object({
  facilities: Yup.array().of(Yup.string().required()).required(),
  windowView: Yup.array().of(Yup.string().required()).required(),
  kitchenEquipment: Yup.array().of(Yup.string().required()).required(),
  equipment: Yup.array().of(Yup.string().required()).required(),
  yardEquipment: Yup.array().of(Yup.string().required()).required(),
  indoorRelaxation: Yup.array().of(Yup.string().required()).required(),
  infrastructureandLeisureNearby: Yup.array()
    .of(Yup.string().required())
    .required(),
  forChildren: Yup.array().of(Yup.string().required()).required(),
});
