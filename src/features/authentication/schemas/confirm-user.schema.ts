import { z } from "zod";
import { confirmUserErrorMessages } from "../messages/confirm-user.messages";

const confirmUserSchema = z.object({
  username: z
    .string()
    .min(2, { message: confirmUserErrorMessages.username.minLength })
    .max(50, { message: confirmUserErrorMessages.username.maxLength })
    .regex(/^[a-zA-Z0-9_-]+$/, {
      message: confirmUserErrorMessages.username.invalidChars,
    }),

  code: z
    .string()
    .length(6, { message: confirmUserErrorMessages.code.length })
    .regex(/^\d+$/, { message: confirmUserErrorMessages.code.digitsOnly }),
});

export default confirmUserSchema;
