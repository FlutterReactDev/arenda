import * as Yup from "yup";
export const hotelGeneralInformationSchema = Yup.object({
  name: Yup.string().required("Поле обязательно для заполнения"),
  rating: Yup.string(),
  internetAccess: Yup.string().required("Выберите один из предложенных вариантов"),
  parking: Yup.string().required("Выберите один из предложенных вариантов"),
  anObjectDetails: Yup.object({
    yearOfConstruntion: Yup.string().required("Выберите один из предложенных вариантов"),
    numberOfRooms: Yup.string().required("Поле обязательно для заполнения"),
    areaOfTheLand: Yup.string().required("Поле обязательно для заполнения"),
    checkInAfter: Yup.string().required("Выберите один из предложенных вариантов"),
    checkOutAfter: Yup.string().required("Выберите один из предложенных вариантов"),
    smokingOnSite: Yup.string().required("Выберите один из предложенных вариантов"),
    paymentType: Yup.string().required("Выберите один из предложенных вариантов"),
  }).required(),
  anObjectMeals: Yup.object({
    allInclusive: Yup.boolean(),
    breakfast: Yup.string().when("allInclusive", (allInclusive, schema) => {
      if (!allInclusive[0]) {
        return schema.required("Выберите один из предложенных вариантов");
      }
      return schema;
    }),
    lunch: Yup.string().when("allInclusive", (allInclusive, schema) => {
      if (!allInclusive[0]) {
        return schema.required("Выберите один из предложенных вариантов");
      }
      return schema;
    }),
    dinner: Yup.string().when("allInclusive", (allInclusive, schema) => {
      if (!allInclusive[0]) {
        return schema.required("Выберите один из предложенных вариантов");
      }
      return schema;
    }),
  }).required(),
  anObjectFeeAdditionalServices: Yup.object({
    cleaning: Yup.string().required("Выберите один из предложенных вариантов"),
    bedLinen: Yup.string().required("Выберите один из предложенных вариантов"),
    reportingDocuments: Yup.string().required("Выберите один из предложенных вариантов"),
    hasTransfer: Yup.boolean(),
    transferDetails: Yup.string().when(
      "hasTransfer",
      (transfer, schema) => {
        if (transfer[0]) {
          return schema.required("Поле обязательно для заполнения");
        }
        return schema;
      }
    ),
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
