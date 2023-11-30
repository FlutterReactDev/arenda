import * as Yup from "yup";

export const roomOptionalServiceSchema = Yup.object({
  cleaningFeeType: Yup.number().required(),
  depositAmount: Yup.number().typeError("Поле обязательно для заполнения"),
  cleaningAmount: Yup.number().when(
    "finalCleaning",
    (finalCleaning, schema) => {
      if (finalCleaning[0] == "1") {
        return schema
          .moreThan(0, "Значение должно быть больше нуля")
          .typeError("Поле обязательно для заполнения")
          .required("Поле обязательно для заполнения");
      }

      return schema;
    }
  ),
});

export type RoomOptionalServiceType = Yup.InferType<
  typeof roomOptionalServiceSchema
>;
