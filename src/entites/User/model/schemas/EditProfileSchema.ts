import { InferType, array, boolean, date, number, object, string } from "yup";
import { Gender } from "../types/UserType";

export const EditProfileSchema = object({
  name: string().required("Необходимо указать имя"),
  surname: string().required("Необходимо указать фамилию"),
  gender: number()
    .required("Необходимо указать пол")
    .oneOf([Gender.MALE, Gender.FEMALE]),
  dateOfBirth: date().required("Необходимо указать дату рождения"),
  countryId: number()
    .typeError("Необходимо указать страну")
    .required("Необходимо указать страну"),
  languageID: number().required("Необходимо выбрать язык"),
  email: string()
    .email("Необходимо указать почту")
    .required("Необходимо указать почту"),
  phoneNumbers: array(
    object({
      phoneNumber: string().required(),
      isMain: boolean(),
    })
  )
    .test("notEmpty", "Добавьте номер телефона", (phones) => {
      return !!phones?.length;
    })
    .test("isOneMain", "Выберите основный номер телефона", (phones) => {
      return phones?.some((phone) => phone.isMain);
    }),
});

export type EditProfileType = InferType<typeof EditProfileSchema>;
