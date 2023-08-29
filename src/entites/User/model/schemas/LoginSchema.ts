import * as Yup from "yup";

export const LoginSchema = Yup.object({
  phoneNumber: Yup.string().required(),
  password: Yup.string().required(),
});
