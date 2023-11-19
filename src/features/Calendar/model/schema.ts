import { date, object, string, InferType } from "yup";

export const CalendarSchema = object({
  minDate: date().required(),
  maxDate: date().required(),
  type: string().oneOf(["setThePrice", "closeForBooking"]).required(),
  costPerDay: string().when("type", (type, schema) => {
    if (type[0] == "setThePrice") {
      return schema.required("Поле обязательно для заполнения");
    }
    return schema;
  }),

  minimumStayPeriod: string().when("type", (type, schema) => {
    if (type[0] == "setThePrice") {
      return schema.required("Выберите один из предложенных вариантов");
    }
    return schema;
  }),
  comment: string(),
  bookingColor: string().required(),
});

export type CalendarSchemaType = InferType<typeof CalendarSchema>;
