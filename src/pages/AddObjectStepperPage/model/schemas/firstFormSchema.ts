import * as Yup from "yup";

export const firstFormSchema = Yup.object({
  streetType: Yup.string()
    .oneOf(
      ["boulevard", "lane", "avenue", "street", "highway", "other"],
      "Выберите один из предложенных вариантов"
    )
    .required("Выберите один из предложенных вариантов"),
  //   eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //   @ts-ignore
  additionalStreetType: Yup.string().when(
    "streetType",
    (streetType, schema) => {
      if (streetType[0] == "other") {
        return schema
          .oneOf(
            [
              "alley",
              "road",
              "lane",
              "zhilmassiv",
              "kilometer",
              "line",
              "seafront",
              "square",
              "travel",
              "average",
              "village",
              "track",
              "descent",
              "deadlock",
            ],
            "Выберите один из предложенных вариантов"
          )
          .required("Выберите один из предложенных вариантов");
      }

      return schema;
    }
  ),

  streetName: Yup.string().required("Поле обязательно для заполнения"),
  house: Yup.string().required("Поле обязательно для заполнения"),
  corps: Yup.string(),
});
