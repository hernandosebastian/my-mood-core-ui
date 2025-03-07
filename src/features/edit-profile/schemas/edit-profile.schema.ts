import { z } from "zod";
import { editProfileErrorMessages } from "../messages";

const ONE_MB_IN_BYTES = 1024 * 1024;
const MAX_FILE_SIZE = ONE_MB_IN_BYTES;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const editProfileSchema = z.object({
  nickname: z
    .string()
    .max(35, { message: editProfileErrorMessages.nickname.maxLength })
    .regex(/^[a-zA-Z0-9-_]+$/, {
      message: editProfileErrorMessages.nickname.invalid,
    })
    .optional(),

  avatarSrc: z.string().optional(),

  avatarFile: z
    .custom<File>()
    .refine((file) => file instanceof File, "Debe ser un archivo")
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
