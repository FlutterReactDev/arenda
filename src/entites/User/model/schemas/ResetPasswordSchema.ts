import { InferType, object, ref, string } from "yup";

export const ResetPasswordSchema = object({
  newPassword: string()
    .min(6, "Необходимо указать пaроль не меньше 6 символов")
    .required("Необходимо указать пaроль"),
  confirmNewPassword: string()
    .oneOf([ref("newPassword")], "Пороли должны быть похожи")
    .required("Необходимо указать пороль"),
});

export type ResetPasswordType = InferType<typeof ResetPasswordSchema>;
