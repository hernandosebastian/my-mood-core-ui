import { z } from "zod";
import { resendConfirmationCodeErrorMessages } from "../messages/resend-confirmation-code.messages";

const resendConfirmationCodeSchema = z.object({
  username: z
    .string()
    .min(2, { message: resendConfirmationCodeErrorMessages.username.minLength })
    .max(50, {
      message: resendConfirmationCodeErrorMessages.username.maxLength,
    })
    .regex(/^[a-zA-Z0-9_-]+$/, {
      message: resendConfirmationCodeErrorMessages.username.invalidChars,
    }),
});

export default resendConfirmationCodeSchema;

