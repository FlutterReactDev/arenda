import { number, object, string, InferType } from "yup";

export const SelectLocationSchema = object({
  objectType: number().required(),
  objectTypeProperty: object({
    id: number().required(),
    name: string().required(),
  }).required(),
  country: object({
    name: string().required(),
    id: number().required(),
  }).required(),
  region: object({
    name: string().required(),
    id: number().required(),
  }).required(),
  city: object({
    name: string().required(),
    id: number().required(),
  }).required(),
});

export type SelectLocationSchemaType = InferType<typeof SelectLocationSchema>;
