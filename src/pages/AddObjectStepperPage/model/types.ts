import * as Yup from "yup";
import { firstFormSchema } from "./schemas/firstFormSchema";
import { selectMapSchema } from "./schemas/selectMapSchema";
import { thirdFormSchema } from "./schemas/thirdFormSchema";
import { forthFormSchema } from "./schemas/forthFormSchema";
import { headingFormSchema } from "./schemas/headingFormSchema";
import { howGuestBookSchema } from "./schemas/howGuestBookSchema";
import { optionalServiceSchema } from "./schemas/optionalServiceSchema";
import { checkInCheckOutSchema } from "./schemas/checkInCheckOutSchema";
import { priceSchema } from "./schemas/priceSchema";
import { postingRulesSchema } from "./schemas/postingRulesSchema";
import { bookingSettingSchema } from "./schemas/bookingSettingSchema";
import { calendarInfoSchema } from "./schemas/calendarInfoSchema";

export interface AddObjectForm {
  forms: AddObjectFromStep[];
}
export type AddObjectsForms =
  | Yup.InferType<typeof firstFormSchema>
  | Yup.InferType<typeof selectMapSchema>
  | Yup.InferType<typeof thirdFormSchema>
  | Yup.InferType<typeof forthFormSchema>
  | {
      files: File[];
    }
  | Yup.InferType<typeof headingFormSchema>
  | Yup.InferType<typeof howGuestBookSchema>
  | Yup.InferType<typeof optionalServiceSchema>
  | Yup.InferType<typeof checkInCheckOutSchema>
  | Yup.InferType<typeof priceSchema>
  | Yup.InferType<typeof postingRulesSchema>
  | Yup.InferType<typeof bookingSettingSchema>
  | Yup.InferType<typeof calendarInfoSchema>;

export interface AddObjectFromStep {
  data: AddObjectsForms;
  step: number;
  screen: number;
}
