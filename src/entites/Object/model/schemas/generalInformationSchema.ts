import * as Yup from "yup";

export const generalInformationSchema = Yup.object({
  area: Yup.number()
    .typeError("Поле обязательно для заполнения")
    .required("Поле обязательно для заполнения"),
  floor: Yup.string().required("Поле обязательно для заполнения"),
  floorsInTheBuilding: Yup.number()
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
  count: Yup.number().min(1).required(),
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
  attic: Yup.boolean().required(),
  elevator: Yup.boolean().required(),

  numberOfIsolatedBedrooms: Yup.number()
    .typeError("Выберите один из предложенных вариантов")
    .when("count", (count, schema) => {
      return schema
        .max(Number(count[0]), "Спален не может быть больше комнат")
        .typeError("Выберите один из предложенных вариантов")
        .required("Выберите один из предложенных вариантов");
    })
    .required(),
  maximumGuests: Yup.number()
    .min(1)
    .required("Поле обязательно для заполнения"),
  beds: Yup.array(
    Yup.object({
      bedType: Yup.number().required("Выберите один из предложенных вариантов"),
      count: Yup.number().required(),
    })
  ).required(),

  numberOfBathroomsWithToilet: Yup.number().required(
    "Поле обязательно для заполнения"
  ),
  numberOfBathroomsWithOutToilet: Yup.number().required(
    "Поле обязательно для заполнения"
  ),
  numberOfSeparateToilets: Yup.number().required(
    "Поле обязательно для заполнения"
  ),
  bidet: Yup.boolean().required(),
  bath: Yup.boolean().required(),
  hygienicShower: Yup.boolean().required(),
  additionalBathroom: Yup.boolean().required(),
  additionalToilet: Yup.boolean().required(),
  shower: Yup.boolean().required(),
  sharedBathroom: Yup.boolean().required(),
  sharedToilet: Yup.boolean().required(),
  towels: Yup.boolean().required(),
  sauna: Yup.boolean().required(),
  slippers: Yup.boolean().required(),
  toiletries: Yup.boolean().required(),
  hairDryer: Yup.boolean().required(),
  robe: Yup.boolean().required(),
  sharedShowerRoom: Yup.boolean().required(),
});

export type GeneralInformationSchemaType = Yup.InferType<
  typeof generalInformationSchema
>;
