import { date, object, string, InferType } from "yup";

export const SearchAvailibilityRoomsSchema = object({
  minDate: date().required("Выберите дату"),
  maxDate: date().required("Выберите дату"),
  checkIn: string().required("Выберите время"),
  checkOut: string().required("Выберите время"),
});

export type SearchAvailibilityRoomsType = InferType<
  typeof SearchAvailibilityRoomsSchema
>;
