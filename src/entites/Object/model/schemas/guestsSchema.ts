import { InferType, array, number, object, string } from "yup";

export const guestsSchema = object({
  adultsCount: number().min(1).max(100).required(),
  childrenAges: array()
    .of(
      object({
        age: string().required("Выберите один из предложенных вариантов"),
      })
    )
    .required(),
});

export type GuestsType = InferType<typeof guestsSchema>;
