import { z } from "zod";
import { signUpErrorMessages } from "../messages";

const signUpSchema = z
  .object({
    username: z
      .string()
      .email({ message: signUpErrorMessages.username.invalidEmail })
      .max(50, { message: signUpErrorMessages.username.maxLength }),

    nickname: z
      .string()
      .max(35, { message: signUpErrorMessages.nickname.maxLength })
      .regex(/^[a-zA-Z0-9-_]+$/, {
        message: signUpErrorMessages.nickname.invalid,
      }),

    avatarSrc: z.string(),

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

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: signUpErrorMessages.confirmPassword.mismatch,
    path: ["confirmPassword"],
  });

export default signUpSchema;
