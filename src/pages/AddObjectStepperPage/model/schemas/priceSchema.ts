import * as Yup from "yup";

export const priceSchema = Yup.object({
  currency: Yup.string().required(),
  minLengthOfStay: Yup.string().required(),
  pricePerDay: Yup.number()
    .moreThan(0, "Значение должно быть больше нуля")
    .typeError("Поле обязательно для заполнения")
    .required("Поле обязательно для заполнения"),
  forHowManyGuests: Yup.string().required(),
});
