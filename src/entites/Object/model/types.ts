import { FormStepRenderProps } from "@shared/ui/FormSteppter";
import * as Yup from "yup";
import { addressFormSchema } from "./schemas/addressFormSchema";
import { selectMapSchema } from "./schemas/selectMapSchema";
import { generalInformationSchema } from "./schemas/generalInformationSchema";
import { facilitiesFormSchema } from "./schemas/facilitiesFormSchema";
import { headingFormSchema } from "./schemas/headingFormSchema";
import { howGuestBookSchema } from "./schemas/howGuestBookSchema";
import { optionalServiceSchema } from "./schemas/optionalServiceSchema";
import { checkInCheckOutSchema } from "./schemas/checkInCheckOutSchema";
import { priceSchema } from "./schemas/priceSchema";
import { postingRulesSchema } from "./schemas/postingRulesSchema";
import { bookingSettingSchema } from "./schemas/bookingSettingSchema";
import { calendarInfoSchema } from "./schemas/calendarInfoSchema";
import { fileSchema } from "./schemas/fileSchema";

export interface FormProps extends FormStepRenderProps {}

export interface AddObjectForm {
  forms: AddObjectFromStep[];
}
export type AddObjectsForms =
  | Yup.InferType<typeof addressFormSchema>
  | Yup.InferType<typeof selectMapSchema>
  | Yup.InferType<typeof generalInformationSchema>
  | Yup.InferType<typeof facilitiesFormSchema>
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

export interface AddHotel {
  addressData: Yup.InferType<typeof addressFormSchema>;
  selectLocationMap: Yup.InferType<typeof selectMapSchema>;
  imageFiles: Yup.InferType<typeof fileSchema>;
}
