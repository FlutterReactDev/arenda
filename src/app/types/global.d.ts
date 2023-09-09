declare const _BASE_API_URL_: string;
import * as Yup from 'Yup';

declare module "yup" {
  interface StringSchema extends Yup.StringSchema {
    phone(): StringSchema;
  }
}
