import * as Yup from "yup";

export const generalInformationSchema = Yup.object({
  square: Yup.number()
    .typeError("Поле обязательно для заполнения")
    .required("Поле обязательно для заполнения"),
  floor: Yup.string().required("Поле обязательно для заполнения"),
  floorsInHouse: Yup.number()
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
  numberOfIsolatedBedrooms: Yup.number()
    .typeError("Выберите один из предложенных вариантов")
    .when("roomsCount", (roomsCount, schema) => {
      return schema
        .max(Number(roomsCount[0]), "Спален не может быть больше комнат")
        .typeError("Выберите один из предложенных вариантов")
        .required("Выберите один из предложенных вариантов");
    })
    .required(),
  roomsCount: Yup.number().min(1).required(),
  kitchen: Yup.string()
    .oneOf(
      ["noKitchen", "separateKitchen", "kitchenLivingRoom", "kitchenZone"],
      "Выберите один из предложенных вариантов"
    )
    .required("Выберите один из предложенных вариантов"),
  repair: Yup.string()
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
  attic: Yup.boolean(),
  elevator: Yup.boolean(),

  maxAdults: Yup.number().min(1).required("Поле обязательно для заполнения"),
  typeAndCountBeds: Yup.array(
    Yup.object({
      bedType: Yup.string()
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
      bedsCount: Yup.string().required(),
    })
  ).required(),

  numberOfBathroomsWithToilet: Yup.number().required(
    "Поле обязательно для заполнения"
  ),
  numberOfBathroomsWithoutToilet: Yup.number().required(
    "Поле обязательно для заполнения"
  ),
  numberOfSeparateToilets: Yup.number().required(
    "Поле обязательно для заполнения"
  ),
  bathroomAmenities: Yup.array().of(Yup.string().required()),
});
