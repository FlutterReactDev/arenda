import { guestsSchema } from "@entites/Object";
import { InferType, date, object, string } from "yup";

export const SearchSchema = object({
  term: string().required(),
  dates: object({
    checkIn: date().required(),
    checkOut: date().required(),
  }).required(),

  guests: guestsSchema,
});

export type SearchSchemaType = InferType<typeof SearchSchema>;
