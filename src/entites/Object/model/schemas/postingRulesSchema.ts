import * as Yup from "yup";

export const postingRulesSchema = Yup.object({
  possibleWithChildren: Yup.boolean().required(),
  petsAllowed: Yup.boolean().required(),
  smokingAllowed: Yup.boolean().required(),
  partiesAllowed: Yup.boolean().required(),
  childsAge: Yup.number().when(
    "possibleWithChildren",
    (possibleWithChildren, schema) => {
      if (possibleWithChildren[0]) {
        return schema.required();
      }
      return schema;
    }
  ),
});

export type PostingRulesType = Yup.InferType<typeof postingRulesSchema>;
