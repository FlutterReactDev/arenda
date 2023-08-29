import * as Yup from "yup";
export const RegisterSchema = Yup.object({
  id: Yup.number().required(),
  name: Yup.string().required(),
  surname: Yup.string().required(),
  gender: Yup.number().required(),
  dateOfBirth: Yup.date().required(),
  country: Yup.string().required(),
  languageID: Yup.number().required(),
  password: Yup.string().required(),
  confirmPassword: Yup.string().required(),
  emails: Yup.array(
    Yup.object({
      email: Yup.string().email().required(),
    })
  ),
  phoneNumbers: Yup.array(
    Yup.object({
      phoneNumber: Yup.string().required(),
      isMain: Yup.boolean().required(),
    })
  ),
});
