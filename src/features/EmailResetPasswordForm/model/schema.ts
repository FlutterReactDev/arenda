import { InferType, object, string } from "yup";

export const EmailResetPasswordSchema = object({
  email: string().email().required(),
});

export type EmailResetPasswordType = InferType<typeof EmailResetPasswordSchema>;
