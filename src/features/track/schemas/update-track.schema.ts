import { z } from "zod";
import { Mood } from "../enum";
import { updateTrackErrorMessages } from "../messages";

export const updateTrackSchema = z.object({
  title: z
    .nativeEnum(Mood)
    .refine((val) => Object.values(Mood).includes(val), {
      message: updateTrackErrorMessages.title.moodType,
    })
    .optional(),

  description: z
    .string()
    .max(200, { message: updateTrackErrorMessages.description.maxLength })
    .optional(),
});

