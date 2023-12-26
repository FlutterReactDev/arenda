import { array, boolean, number, object, string, InferType } from "yup";

export const generalRoomInformationSchema = object({
  ownName: string().required("Поле обязательно для заполнения"),
  roomNameTypeId: number()
    .required("Поле обязательно для заполнения")
    .typeError("Поле обязательно для заполнения"),
  uniqueName: string().required("Поле обязательно для заполнения"),
  area: number()
    .typeError("Поле обязательно для заполнения")
    .required("Поле обязательно для заполнения"),
  floorType: number()
    .typeError("Поле обязательно для заполнения")
    .required("Поле обязательно для заполнения"),
  floorsInTheBuilding: number()
    .when("floorType", (floorType, schema) => {
      if (floorType[0] !== 0) {
        return schema
          .min(
            Number(floorType[0]),
            "Общее число этажей не может быть меньше выбранного в поле «Этаж»"
          )
          .required("Выберите один из предложенных вариантов");
      }
      return schema;
    })
    .min(1)
    .required("Поле обязательно для заполнения"),
  count: number().min(1).required(),
  maximumGuests: number().min(1).required("Поле обязательно для заполнения"),
  beds: array(
    object({
      bedType: number().required("Выберите один из предложенных вариантов"),
      count: number().required(),
    })
  ).required(),

  numberOfBathroomsWithToilet: number().required(
    "Поле обязательно для заполнения"
  ),
  numberOfBathroomsWithOutToilet: number().required(
    "Поле обязательно для заполнения"
  ),
  numberOfSeparateToilets: number().required("Поле обязательно для заполнения"),
  bidet: boolean().required(),
  bath: boolean().required(),
  hygienicShower: boolean().required(),
  additionalBathroom: boolean().required(),
  additionalToilet: boolean().required(),
  shower: boolean().required(),
  sharedBathroom: boolean().required(),
  sharedToilet: boolean().required(),
  towels: boolean().required(),
  sauna: boolean().required(),
  slippers: boolean().required(),
  toiletries: boolean().required(),
  hairDryer: boolean().required(),
  robe: boolean().required(),
  sharedShowerRoom: boolean().required(),
});

export type GeneralRoomInformationType = InferType<
  typeof generalRoomInformationSchema
>;
