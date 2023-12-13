import { guestsSchema } from "@entites/Object";
import { date, object, InferType } from "yup";

export const bookignFormSchema = object({
  dates: object({
    checkIn: date().required(),
    checkOut: date().required(),
  }),

  guests: guestsSchema,
});


export type BookingFormType = InferType<typeof bookignFormSchema>