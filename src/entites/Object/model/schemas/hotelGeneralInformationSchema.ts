import * as Yup from "yup";
import { AdditionalServices } from "../types";
export const hotelGeneralInformationSchema = Yup.object({
  name: Yup.string().required("Поле обязательно для заполнения"),
  rating: Yup.number().typeError("Выберите один из предложенных вариантов"),
  internetAccess: Yup.number()
    .typeError("Выберите один из предложенных вариантов")
    .required("Выберите один из предложенных вариантов"),
  parking: Yup.number()
    .typeError("Выберите один из предложенных вариантов")
    .required("Выберите один из предложенных вариантов"),
  anObjectDetails: Yup.object({
    yearOfConstruntion: Yup.string().required(
      "Выберите один из предложенных вариантов"
    ),
    numberOfRooms: Yup.number()
      .typeError("Выберите один из предложенных вариантов")
      .moreThan(0, "Количества комнат должно быть больше 0")
      .typeError("Комнат не может быть меньше или равно 0")
      .required("Поле обязательно для заполнения"),
    areaOfTheLand: Yup.number()
      .typeError("Выберите один из предложенных вариантов")
      .required("Поле обязательно для заполнения"),
    checkInAfter: Yup.string().required(
      "Выберите один из предложенных вариантов"
    ),
    checkOutAfter: Yup.string().required(
      "Выберите один из предложенных вариантов"
    ),
    smokingOnSite: Yup.number()
      .typeError("Выберите один из предложенных вариантов")
      .required("Выберите один из предложенных вариантов"),
    paymentType: Yup.number()
      .typeError("Выберите один из предложенных вариантов")
      .required("Выберите один из предложенных вариантов"),
  }).required(),
  anObjectMeals: Yup.object({
    allInclusive: Yup.boolean(),
    breakfast: Yup.number()
      .typeError("Выберите один из предложенных вариантов")
      .transform((value) =>
        isNaN(value) || value === null || value === undefined ? 0 : value
      )
      .when("allInclusive", (allInclusive, schema) => {
        if (!allInclusive[0]) {
          return schema.required("Выберите один из предложенных вариантов");
        }
        return schema;
      }),
    lunch: Yup.number()
      .typeError("Выберите один из предложенных вариантов")
      .transform((value) =>
        isNaN(value) || value === null || value === undefined ? 0 : value
      )
      .when("allInclusive", (allInclusive, schema) => {
        if (!allInclusive[0]) {
          return schema.required("Выберите один из предложенных вариантов");
        }
        return schema;
      }),
    dinner: Yup.number()
      .typeError("Выберите один из предложенных вариантов")
      .transform((value) =>
        isNaN(value) || value === null || value === undefined ? 0 : value
      )
      .when("allInclusive", (allInclusive, schema) => {
        if (!allInclusive[0]) {
          return schema.required("Выберите один из предложенных вариантов");
        }
        return schema;
      }),
  }).required(),
  anObjectFeeAdditionalServices: Yup.object({
    cleaning: Yup.number()
      .typeError("Выберите один из предложенных вариантов")
      .required("Выберите один из предложенных вариантов"),
    cleaningSum: Yup.number()
      .transform((value) =>
        isNaN(value) || value === null || value === undefined ? 0 : value
      )
      .when("cleaning", (cleaning, schema) => {
        if (cleaning[0] == AdditionalServices.PAID) {
          return schema
            .moreThan(0, "Стоимость услуги должна быть больше 0")
            .typeError("Стоимость услуги должна быть больше 0")
            .required("Стоимость услуги должна быть больше 0");
        }
        return schema;
      }),
    bedLinen: Yup.number()
      .typeError("Выберите один из предложенных вариантов")
      .required("Выберите один из предложенных вариантов"),
    bedLinenSum: Yup.number()
      .transform((value) =>
        isNaN(value) || value === null || value === undefined ? 0 : value
      )
      .when("bedLinen", (bedLinen, schema) => {
        if (bedLinen[0] == AdditionalServices.PAID) {
          console.log(bedLinen[0]);

          return schema
            .moreThan(0, "Стоимость услуги должна быть больше 0")
            .typeError("Стоимость услуги должна быть больше 0")
            .required("Стоимость услуги должна быть больше 0");
        }
        return schema;
      }),
    reportingDocuments: Yup.number()
      .typeError("Выберите один из предложенных вариантов")
      .required("Выберите один из предложенных вариантов"),
    hasTransfer: Yup.boolean(),
    transferDetails: Yup.string().when("hasTransfer", (transfer, schema) => {
      if (transfer[0]) {
        return schema.required("Поле обязательно для заполнения");
      }
      return schema;
    }),
    detailComment: Yup.string(),
    objectInAnotherResources: Yup.string(),
  }).required(),
  anObjectAdditionalComforts: Yup.object({
    restaurant: Yup.boolean(),
    barCounter: Yup.boolean(),
    sauna: Yup.boolean(),
    garden: Yup.boolean(),
    spaCenter: Yup.boolean(),
    tennisCourt: Yup.boolean(),
    aquapark: Yup.boolean(),
    indoorPool: Yup.boolean(),
    privateBeach: Yup.boolean(),
    elevator: Yup.boolean(),
    childrenSwimmingPool: Yup.boolean(),
    roomDelivery: Yup.boolean(),
    twentyFourhourFrontDesk: Yup.boolean(),
    gym: Yup.boolean(),
    terrace: Yup.boolean(),
    footballField: Yup.boolean(),
    golf: Yup.boolean(),
    openPool: Yup.boolean(),
    jacuzzi: Yup.boolean(),
    playground: Yup.boolean(),
    ramp: Yup.boolean(),
    laundry: Yup.boolean(),
  }),
});
