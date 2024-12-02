import { z } from "zod";
import { createTrackErrorMessages } from "../messages";
import { Mood } from "../enum";

export const createTrackSchema = z.object({
  title: z.nativeEnum(Mood).refine((val) => Object.values(Mood).includes(val), {
    message: createTrackErrorMessages.title.moodType,
  }),

  description: z
    .string()
    .max(200, { message: createTrackErrorMessages.description.maxLength })
    .optional(),

  date: z.date(),
});

