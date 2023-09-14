import * as Yup from "yup";
export const PhoneSchema = Yup.object({
  phone: Yup.string().phone(),
});
