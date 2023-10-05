import * as Yup from "yup";

export const mainInfoSchema = Yup.object({
  objectName: Yup.string().required(),
  addressName: Yup.string().required(),
  house: Yup.string().required(),
  stardom: Yup.string(),
  internet: Yup.string().required(),
  parking: Yup.string(),
  yearOfConstruction: Yup.string(),
  roomsCount: Yup.number(),
  square: Yup.number().required(),
  checkIn: Yup.string().required(),
  checkOut: Yup.string().required(),
  smokingOnSite: Yup.string().required(),
  paymentType: Yup.string().required(),
});
