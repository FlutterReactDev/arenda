import { array, number, object, string, InferType } from "yup";

export const roomBedSchema = object({
  numberOfIsolatedBedrooms: number()
    .typeError("Выберите один из предложенных вариантов")
    .required("Выберите один из предложенных вариантов"),
  maxAdults: number().min(1).required("Поле обязательно для заполнения"),
  typeAndCountBeds: array(
    object({
      bedType: string()
        .oneOf(
          [
            "singleBed",
            "doubleBed",
            "doubleSofaBed",
            "doubleWideKingSize",
            "extraWideDoubleSuperKingSize",
            "bunkBed",
            "sofaBed",
          ],
          "Выберите один из предложенных вариантов"
        )
        .required("Выберите один из предложенных вариантов"),
      bedsCount: string().required(),
    })
  ).required(),
});
export type RoomBedSchemaType = InferType<typeof roomBedSchema>;
