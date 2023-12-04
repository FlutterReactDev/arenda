import * as Yup from "yup";
import {
  AdditionalServices,
  FoodType,
  InternetAccess,
  Parking,
} from "../types/createObjectTypes";

export const hotelGeneralInformationSchema = Yup.object({
  name: Yup.string().required("Поле обязательно для заполнения"),
  rating: Yup.number()
    .transform((value) =>
      isNaN(value) || value === null || value === undefined ? 0 : value
    )
    .typeError("Выберите один из предложенных вариантов"),
  internetAccess: Yup.number()
    .typeError("Выберите один из предложенных вариантов")
    .required("Выберите один из предложенных вариантов"),
  internetAccessSumm: Yup.number().when("internetAccess", (internetAccess, schema) => {
    if (internetAccess[0] == InternetAccess.PAID) {
      return schema
        .moreThan(0, "Стоимость услуги должна быть больше 0")
        .typeError("Стоимость услуги должна быть больше 0")
        .required("Стоимость услуги должна быть больше 0");
    }
    return schema;
  }),
  parking: Yup.number()
    .typeError("Выберите один из предложенных вариантов")
    .required("Выберите один из предложенных вариантов"),
  parkingSumm: Yup.number().when("parking", (parking, schema) => {
    if (parking[0] == Parking.PAID) {
      return schema
        .moreThan(0, "Стоимость услуги должна быть больше 0")
        .typeError("Стоимость услуги должна быть больше 0")
        .required("Стоимость услуги должна быть больше 0");
    }
    return schema;
  }),
  anObjectDetail: Yup.object({
    yearOfConstruntion: Yup.number().required(
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
  anObjectMeal: Yup.object({
    allInclusive: Yup.boolean().required(),
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
    breakfastService: Yup.number().when("breakfast", (breakfast, schema) => {
      if (breakfast[0] != FoodType.NOT_PROVIDING) {
        return schema
          .typeError("Выберите один из предложенных вариантов")
          .required("Выберите один из предложенных вариантов");
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
    lunchService: Yup.number()
      .typeError("Выберите один из предложенных вариантов")
      .when("lunch", (lunch, schema) => {
        if (lunch[0] != FoodType.NOT_PROVIDING) {
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
    dinnerService: Yup.number()
      .typeError("Выберите один из предложенных вариантов")
      .when("dinner", (dinner, schema) => {
        if (dinner[0] != FoodType.NOT_PROVIDING) {
          return schema.required("Выберите один из предложенных вариантов");
        }
        return schema;
      }),
  }).required(),
  anObjectFeeAdditionalService: Yup.object({
    cleaning: Yup.number()
      .typeError("Выберите один из предложенных вариантов")
      .required("Выберите один из предложенных вариантов"),
    cleaningSum: Yup.number().when("cleaning", (cleaning, schema) => {
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
    hasTransfer: Yup.boolean().required(),
    transferDetails: Yup.string().when("hasTransfer", (transfer, schema) => {
      if (transfer[0]) {
        return schema.required("Поле обязательно для заполнения");
      }
      return schema;
    }),
    detailComment: Yup.string(),
    objectInAnotherResources: Yup.string(),
  }).required(),
  anObjectAdditionalComfort: Yup.object({
    restaurant: Yup.boolean().required(),
    barCounter: Yup.boolean().required(),
    sauna: Yup.boolean().required(),
    garden: Yup.boolean().required(),
    spaCenter: Yup.boolean().required(),
    tennisCourt: Yup.boolean().required(),
    aquapark: Yup.boolean().required(),
    indoorPool: Yup.boolean().required(),
    privateBeach: Yup.boolean().required(),
    elevator: Yup.boolean().required(),
    childrenSwimmingPool: Yup.boolean().required(),
    roomDelivery: Yup.boolean().required(),
    twentyFourhourFrontDesk: Yup.boolean().required(),
    gym: Yup.boolean().required(),
    terrace: Yup.boolean().required(),
    footballField: Yup.boolean().required(),
    golf: Yup.boolean().required(),
    openPool: Yup.boolean().required(),
    jacuzzi: Yup.boolean().required(),
    playground: Yup.boolean().required(),
    ramp: Yup.boolean().required(),
    laundry: Yup.boolean().required(),
  }),
});

export type HotelGeneralInformationType = Yup.InferType<
  typeof hotelGeneralInformationSchema
>;
