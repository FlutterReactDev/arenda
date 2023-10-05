import * as Yup from "yup";
export const hotelGeneralInformationSchema = Yup.object({
  heading: Yup.string().required(),
  category: Yup.string(),
  internetAccess: Yup.string().required(),
  parking: Yup.string().required(),
  yearOfConstruction: Yup.string(),
  numberOfRooms: Yup.string().required(),
  landArea: Yup.string().required(),
  checkIn: Yup.string().required(),
  checkOut: Yup.string().required(),
  smokingOnSite: Yup.string().required(),
  paymentType: Yup.string().required(),
});
