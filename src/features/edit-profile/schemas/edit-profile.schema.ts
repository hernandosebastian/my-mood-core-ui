import { z } from "zod";
import { editProfileErrorMessages } from "../messages";

export const editProfileSchema = z.object({
  nickname: z
    .string()
    .max(35, { message: editProfileErrorMessages.nickname.maxLength })
    .optional(),

  avatarSrc: z.string().optional(),
});

