import * as Yup from "yup";

export const priceSchema = Yup.object({
  currencyId: Yup.number().required(),
  minimumLengthOfStay: Yup.number().required(),
  pricePerDay: Yup.number()
    .moreThan(0, "Значение должно быть больше нуля")
    .typeError("Поле обязательно для заполнения")
    .required("Поле обязательно для заполнения"),
  forHowManyGuests: Yup.number().required(),
});

export type PriceFormType = Yup.InferType<typeof priceSchema>;
