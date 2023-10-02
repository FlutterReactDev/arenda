import * as Yup from "yup";

export const postingRulesSchema = Yup.object({
  possibleWithChildren: Yup.boolean(),
  petsAllowed: Yup.boolean(),
  smokingAllowed: Yup.boolean(),
  partiesAreAllowed: Yup.boolean(),
  age: Yup.string().when(
    "possibleWithChildren",
    (possibleWithChildren, schema) => {
      if (possibleWithChildren[0]) {
        return schema.required();
      }
      return schema;
    }
  ),
});
