import { z } from "zod";
import { resendConfirmationCodeErrorMessages } from "../messages";

const resendConfirmationCodeSchema = z.object({
  username: z
    .string()
    .email({
      message: resendConfirmationCodeErrorMessages.username.invalidEmail,
    })
    .min(2, { message: resendConfirmationCodeErrorMessages.username.minLength })
    .max(50, {
      message: resendConfirmationCodeErrorMessages.username.maxLength,
    }),
});

export default resendConfirmationCodeSchema;
