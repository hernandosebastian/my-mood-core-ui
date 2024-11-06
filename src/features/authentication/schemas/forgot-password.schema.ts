import { z } from "zod";
import { forgotPasswordErrorMessages } from "../messages/forgot-password.messages";

const forgotPasswordSchema = z.object({
  username: z
    .string()
    .email({ message: forgotPasswordErrorMessages.username.invalidEmail })
    .min(2, { message: forgotPasswordErrorMessages.username.minLength })
    .max(50, { message: forgotPasswordErrorMessages.username.maxLength }),
});

export default forgotPasswordSchema;
