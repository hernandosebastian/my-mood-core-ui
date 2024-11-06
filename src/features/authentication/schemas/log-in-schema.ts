import { z } from "zod";
import { logInErrorMessages } from "../messages/log-in.messages";

const logInSchema = z.object({
  username: z
    .string()
    .email({ message: logInErrorMessages.username.invalidEmail })
    .min(2, { message: logInErrorMessages.username.minLength })
    .max(50, { message: logInErrorMessages.username.maxLength }),

  password: z
    .string()
    .min(8, { message: logInErrorMessages.password.minLength })
    .max(50, { message: logInErrorMessages.password.maxLength })
    .regex(/[A-Z]/, { message: logInErrorMessages.password.uppercase })
    .regex(/[a-z]/, { message: logInErrorMessages.password.lowercase })
    .regex(/\d/, { message: logInErrorMessages.password.number })
    .regex(/[^a-zA-Z0-9]/, {
      message: logInErrorMessages.password.specialChar,
    }),
});

export default logInSchema;
