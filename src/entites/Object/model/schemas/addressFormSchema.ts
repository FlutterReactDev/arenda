import * as Yup from "yup";

export const addressFormSchema = Yup.object({
  streetName: Yup.string().required("Поле обязательно для заполнения"),
  house: Yup.string().required("Поле обязательно для заполнения"),
});
