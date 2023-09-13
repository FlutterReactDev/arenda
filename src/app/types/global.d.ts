import * as Yup from "yup";
declare const _BASE_API_URL_: string;
declare module "yup" {
  interface StringSchema extends Yup.StringSchema {
    phone(): StringSchema;
  }
}
