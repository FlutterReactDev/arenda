import * as Yup from "yup";
import { Gender } from "../types/UserType";
export const RegisterSchema = Yup.object({
  name: Yup.string().required(),
  surname: Yup.string().required(),
  gender: Yup.number().required().oneOf([Gender.MALE, Gender.FEMALE]),
  dateOfBirth: Yup.date().required(),
  country: Yup.string().required(),
  languageID: Yup.number().required(),
  email: Yup.string().email().required(),
  password: Yup.string().min(6).required(),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref("password")],
    "Passwords must match"
  ),
  phoneNumbers: Yup.array(
    Yup.object({
      phoneNumber: Yup.string().required(),
      isMain: Yup.boolean().required(),
    })
  )
    .test("notEmpty", "Добавьте номер телефона", (phones) => {
      return !!phones?.length;
    })
    .test("isOneMain", "Выберите основный номер телефона", (phones) => {
      return phones?.some((phone) => phone.isMain);
    }),
});
