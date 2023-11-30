import * as Yup from "yup";

export const optionalServiceSchema = Yup.object({
  cleaningFeeType: Yup.number().required(),
  depositAmount: Yup.number().typeError("Поле обязательно для заполнения"),
  transfer: Yup.boolean(),
  transferDescription: Yup.string().when("transfer", (transfer, schema) => {
    if (transfer[0]) {
      return schema.required("Поле обязательно для заполнения");
    }
    return schema;
  }),
  cleaningAmount: Yup.number().when("finalCleaning", (finalCleaning, schema) => {
    if (finalCleaning[0] == "1") {
      return schema
        .moreThan(0, "Значение должно быть больше нуля")
        .typeError("Поле обязательно для заполнения")
        .required("Поле обязательно для заполнения");
    }

    return schema;
  }),
});

export type OptionalServiceType = Yup.InferType<typeof optionalServiceSchema>;
