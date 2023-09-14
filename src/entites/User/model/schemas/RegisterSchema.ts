import * as Yup from "yup";
import { Gender } from "../types/UserType";
export const RegisterSchema = Yup.object({
  name: Yup.string().required("Необходимо указать имя"),
  surname: Yup.string().required("Необходимо указать фамилию"),
  gender: Yup.number()
    .required("Необходимо указать пол")
    .oneOf([Gender.MALE, Gender.FEMALE]),
  dateOfBirth: Yup.date().required("Необходимо указать дату рождения"),
  country: Yup.string().required("Необходимо указать страну"),
  languageID: Yup.number().required("Необходимо выбрать язык"),
  email: Yup.string().email().required("Необходимо указать почту"),
  password: Yup.string()
    .min(6, "Необходимо указать пaроль не меньше 6 символов")
    .required("Необходимо указать пaроль"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Пороли должны быть похожи")
    .required("Необходимо указать пороль"),
  phoneNumbers: Yup.array(
    Yup.object({
      phoneNumber: Yup.string().required(),
      isMain: Yup.boolean(),
    })
  )
    .test("notEmpty", "Добавьте номер телефона", (phones) => {
      return !!phones?.length;
    })
    .test("isOneMain", "Выберите основный номер телефона", (phones) => {
      return phones?.some((phone) => phone.isMain);
    }),
});
