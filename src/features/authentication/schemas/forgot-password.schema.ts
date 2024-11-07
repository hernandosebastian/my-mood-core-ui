import { z } from "zod";
import { forgotPasswordErrorMessages } from "../messages";

const forgotPasswordSchema = z.object({
  username: z
    .string()
    .email({ message: forgotPasswordErrorMessages.username.invalidEmail })
    .max(50, { message: forgotPasswordErrorMessages.username.maxLength }),
});

export default forgotPasswordSchema;
