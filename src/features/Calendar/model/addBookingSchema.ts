import { object, number, date, InferType } from "yup";

export const addBookingSchema = object({
  objectId: number()
    .required()
    .typeError("Это поле обязательно для заполнения"),
  checkIn: date().required("Выберите дату"),
  checkOut: date().required("Выберите дату"),
});

export type AddBookingType = InferType<typeof addBookingSchema>;
