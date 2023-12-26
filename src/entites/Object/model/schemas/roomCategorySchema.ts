import { number, object, InferType } from "yup";

export const roomCategorySchema = object({
  categoryType: number()
    .typeError("Поле обязательно для заполнения")
    .required("Поле обязательно для заполнения"),
});

export type RoomCategoryType = InferType<typeof roomCategorySchema>;
