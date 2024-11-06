import { z } from "zod";
import { forgotPasswordErrorMessages } from "../messages/forgot-password.messages";

const forgotPasswordSchema = z.object({
  username: z
    .string()
    .min(2, { message: forgotPasswordErrorMessages.username.minLength })
    .max(50, { message: forgotPasswordErrorMessages.username.maxLength })
    .regex(/^[a-zA-Z0-9_-]+$/, {
      message: forgotPasswordErrorMessages.username.invalidChars,
    }),
});

export default forgotPasswordSchema;

