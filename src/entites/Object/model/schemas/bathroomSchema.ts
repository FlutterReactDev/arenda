import { InferType, boolean, number, object } from "yup";

export const bathroomSchema = object({
  numberOfBathroomsWithToilet: number().required(
    "Поле обязательно для заполнения"
  ),
  numberOfBathroomsWithOutToilet: number().required(
    "Поле обязательно для заполнения"
  ),
  numberOfSeparateToilets: number().required("Поле обязательно для заполнения"),
  bidet: boolean(),
  bath: boolean(),
  hygienicShower: boolean(),
  additionalBathroom: boolean(),
  additionalToilet: boolean(),
  shower: boolean(),
  sharedBathroom: boolean(),
  sharedToilet: boolean(),
  towels: boolean(),
  sauna: boolean(),
  slippers: boolean(),
  toiletries: boolean(),
  hairDryer: boolean(),
  robe: boolean(),
  sharedShowerRoom: boolean(),
});

export type BathroomSchemaType = InferType<typeof bathroomSchema>;
