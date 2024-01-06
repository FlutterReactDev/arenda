import { InferType, object, ref, string } from "yup";

export const ChangePasswordSchema = object({
  oldPassword: string()
    .min(6, "Необходимо указать пaроль не меньше 6 символов")
    .required("Необходимо указать пaроль"),
  newPassword: string()
    .min(6, "Необходимо указать пaроль не меньше 6 символов")
    .required("Необходимо указать пaроль"),
  confirmNewPassword: string()
    .oneOf([ref("newPassword")], "Пороли должны быть похожи")
    .required("Необходимо указать пороль"),
});

export type ChangePasswordType = InferType<typeof ChangePasswordSchema>;
