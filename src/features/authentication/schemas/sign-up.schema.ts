import { z } from "zod";
import { signUpErrorMessages } from "../messages/sign-up.messages";

const signUpSchema = z.object({
  username: z
    .string()
    .min(2, { message: signUpErrorMessages.username.minLength })
    .max(50, { message: signUpErrorMessages.username.maxLength })
    .regex(/^[a-zA-Z0-9_-]+$/, {
      message: signUpErrorMessages.username.invalidChars,
    }),

  password: z
    .string()
    .min(8, { message: signUpErrorMessages.password.minLength })
    .max(50, { message: signUpErrorMessages.password.maxLength })
    .regex(/[A-Z]/, { message: signUpErrorMessages.password.uppercase })
    .regex(/[a-z]/, { message: signUpErrorMessages.password.lowercase })
    .regex(/\d/, { message: signUpErrorMessages.password.number })
    .regex(/[^a-zA-Z0-9]/, {
      message: signUpErrorMessages.password.specialChar,
    }),
});

export default signUpSchema;

