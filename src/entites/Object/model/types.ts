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
import { hotelGeneralInformationSchema } from "./schemas/hotelGeneralInformationSchema";

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
  hotelGeneralInformation: Yup.InferType<typeof hotelGeneralInformationSchema>;
}

export interface ObjectType {
  anObjectTypeId: number;
  anObjectPropertyTypeId: number;
  name: string;
  country: string;
  region: string;
  city: string;
  internetAccess: number;
  parking: number;
  rating: number;
  fullAddress: string;
  building: string;
  latitude: number;
  longitude: number;
  anObjectDetails: {
    yearOfConstruntion: number;
    numberOfRooms: number;
    areaOfTheLand: number;
    checkInAfter: string;
    checkOutAfter: string;
    smokingOnSite: number;
    paymentType: number;
  };
  anObjectAdditionalComforts: {
    restaurant: boolean;
    barCounter: boolean;
    sauna: boolean;
    garden: boolean;
    spaCenter: boolean;
    tennisCourt: boolean;
    aquapark: boolean;
    indoorPool: boolean;
    privateBeach: boolean;
    elevator: boolean;
    childrenSwimmingPool: boolean;
    roomDelivery: boolean;
    twentyFourhourFrontDesk: boolean;
    gym: boolean;
    terrace: boolean;
    footballField: boolean;
    golf: boolean;
    openPool: boolean;
    jacuzzi: boolean;
    playground: boolean;
    ramp: boolean;
    laundry: boolean;
  };
  anObjectMeals: {
    allInclusive: boolean;
    breakfast: number;
    breakfastService: number;
    lunch: number;
    lunchService: number;
    dinner: number;
    dinnerService: number;
  };
  anObjectFeeAdditionalServices: {
    cleaning: number;
    cleaningSum: number;
    bedLinen: number;
    bedLinenSum: number;
    reportingDocuments: number;
    hasTransfer: boolean;
    transferDetails: string;
    detailComment: string;
    objectInAnotherResources: string;
  };
}
