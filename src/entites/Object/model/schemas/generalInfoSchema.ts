import { number, object, string, InferType, boolean } from "yup";

export const generalInfoSchema = object({
  square: number()
    .typeError("Поле обязательно для заполнения")
    .required("Поле обязательно для заполнения"),
  floor: string().required("Поле обязательно для заполнения"),
  floorsInHouse: number()
    .when("floor", (floor, schema) => {
      if (floor[0] !== "basement") {
        return schema
          .min(
            Number(floor[0]),
            "Общее число этажей не может быть меньше выбранного в поле «Этаж»"
          )
          .required("Выберите один из предложенных вариантов");
      }
      return schema;
    })
    .min(1)
    .required("Поле обязательно для заполнения"),
  numberOfIsolatedBedrooms: number()
    .typeError("Выберите один из предложенных вариантов")
    .when("roomsCount", (roomsCount, schema) => {
      return schema
        .max(Number(roomsCount[0]), "Спален не может быть больше комнат")
        .typeError("Выберите один из предложенных вариантов")
        .required("Выберите один из предложенных вариантов");
    })
    .required(),
  roomsCount: number().min(1).required(),
  kitchen: string()
    .oneOf(
      ["noKitchen", "separateKitchen", "kitchenLivingRoom", "kitchenZone"],
      "Выберите один из предложенных вариантов"
    )
    .required("Выберите один из предложенных вариантов"),
  repair: string()
    .oneOf(
      [
        "withoutRepair",
        "redecorating",
        "europeanQualityRenovation",
        "designerRenovation",
      ],
      "Выберите один из предложенных вариантов"
    )
    .required("Выберите один из предложенных вариантов"),
  attic: boolean(),
  elevator: boolean(),
});

export type GeneralInfoFormType = InferType<typeof generalInfoSchema>;
