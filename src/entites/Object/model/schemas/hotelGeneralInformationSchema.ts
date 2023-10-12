import * as Yup from "yup";
export const hotelGeneralInformationSchema = Yup.object({
  heading: Yup.string().required(),
  category: Yup.string(),
  internetAccess: Yup.string().required(),
  parking: Yup.string().required(),
  anObjectDetails: Yup.object({
    yearOfConstruntion: Yup.string(),
    numberOfRooms: Yup.string().required(),
    areaOfTheLand: Yup.string().required(),
    checkInAfter: Yup.string().required(),
    checkOutAfter: Yup.string().required(),
    smokingOnSite: Yup.string().required(),
    paymentType: Yup.string().required(),
  }).required(),
  anObjectMeals: Yup.object({
    allInclusive: Yup.boolean(),
    breakfast: Yup.string().when("allInclusive", (allInclusive, schema) => {
      if (allInclusive[0]) {
        return schema.required();
      }
      return schema;
    }),
    lunch: Yup.string().when("allInclusive", (allInclusive, schema) => {
      if (allInclusive[0]) {
        return schema.required();
      }
      return schema;
    }),
    dinner: Yup.string().when("allInclusive", (allInclusive, schema) => {
      if (allInclusive[0]) {
        return schema.required();
      }
      return schema;
    }),
  }).required(),
  anObjectFeeAdditionalServices: Yup.object({
    cleaning: Yup.string(),
    bedLinen: Yup.string(),
    reportingDocuments: Yup.string(),
    hasTransfer: Yup.boolean(),
    transferDescription: Yup.string().when(
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
