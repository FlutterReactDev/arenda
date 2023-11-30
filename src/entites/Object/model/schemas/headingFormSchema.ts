import * as Yup from "yup";

export const headingFormSchema = Yup.object({
  title: Yup.string().max(70).required("Поле обязательно для заполнения"),
  detailedDescription: Yup.string().required("Поле обязательно для заполнения"),
  ownName: Yup.string(),
});

export type HeadingFormType = Yup.InferType<typeof headingFormSchema>;
