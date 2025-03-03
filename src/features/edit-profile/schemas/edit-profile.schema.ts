import { z } from "zod";
import { editProfileErrorMessages } from "../messages";

const MAX_FILE_SIZE = 1024 * 1024; // 1MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const editProfileSchema = z.object({
  nickname: z
    .string()
    .max(35, { message: editProfileErrorMessages.nickname.maxLength })
    .optional(),

  avatarSrc: z.string().optional(),
  
  avatarFile: z
    .custom<File>()
    .refine((file) => file instanceof File, "Must be a file")
    .refine(
      (file) => file?.size <= MAX_FILE_SIZE,
      editProfileErrorMessages.avatar.invalidSize
    )
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      editProfileErrorMessages.avatar.invalidType
    )
    .optional(),
});

