import { z } from "zod";
import { createTrackErrorMessages } from "../messages";
import { Mood } from "../enum";

export const createTrackSchema = z.object({
  title: z.nativeEnum(Mood, {
    errorMap: (issue, ctx) => {
      if (issue.code === "invalid_enum_value") {
        return { message: createTrackErrorMessages.title.moodType };
      }
      return { message: ctx.defaultError };
    },
  }),

  description: z
    .string()
    .max(1000, { message: createTrackErrorMessages.description.maxLength })
    .optional(),

  date: z.date(),
});

