import { date, object, string, InferType } from "yup";

export const CalendarSchema = object({
  minDate: date().required(),
  maxDate: date().required(),
  checkIn: string().required(),
  checkOut: string().required(),
  type: string().oneOf(["setThePrice", "closeForBooking"]).required(),
  costPerDay: string().when("type", (type, schema) => {
    if (type[0] == "setThePrice") {
      return schema.required("Поле обязательно для заполнения");
    }
    return schema;
  }),
  clientFullName: string(),
  phoneNumber: string(),
  comment: string(),
  bookingColor: string().required(),
});

export type CalendarSchemaType = InferType<typeof CalendarSchema>;
