import { z } from "zod";
import { confirmPasswordErrorMessages } from "../messages/confirm-password.messages";

const confirmPasswordSchema = z.object({
  username: z
    .string()
    .email({ message: confirmPasswordErrorMessages.username.invalidEmail })
    .min(2, { message: confirmPasswordErrorMessages.username.minLength })
    .max(50, { message: confirmPasswordErrorMessages.username.maxLength }),

  newPassword: z
    .string()
    .min(8, { message: confirmPasswordErrorMessages.newPassword.minLength })
    .max(50, { message: confirmPasswordErrorMessages.newPassword.maxLength })
    .regex(/[A-Z]/, {
      message: confirmPasswordErrorMessages.newPassword.uppercase,
    })
    .regex(/[a-z]/, {
      message: confirmPasswordErrorMessages.newPassword.lowercase,
    })
    .regex(/\d/, { message: confirmPasswordErrorMessages.newPassword.number })
    .regex(/[^a-zA-Z0-9]/, {
      message: confirmPasswordErrorMessages.newPassword.specialChar,
    }),

  code: z
    .string()
    .length(6, { message: confirmPasswordErrorMessages.code.length })
    .regex(/^\d+$/, { message: confirmPasswordErrorMessages.code.digitsOnly }),
});

export default confirmPasswordSchema;
