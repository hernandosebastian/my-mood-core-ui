import { z } from "zod";
import { confirmUserErrorMessages } from "../messages";

const confirmUserSchema = z.object({
  username: z
    .string()
    .email({ message: confirmUserErrorMessages.username.invalidEmail })
    .max(50, { message: confirmUserErrorMessages.username.maxLength }),

  code: z
    .string()
    .length(6, { message: confirmUserErrorMessages.code.length })
    .regex(/^\d+$/, { message: confirmUserErrorMessages.code.digitsOnly }),
});

export default confirmUserSchema;
