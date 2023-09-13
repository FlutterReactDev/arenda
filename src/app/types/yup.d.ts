import * as Yup from "yup";
declare module "yup" {
  interface StringSchema extends Yup.StringSchema {
    phone(): StringSchema;
  }
}
