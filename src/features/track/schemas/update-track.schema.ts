import { z } from "zod";
import { Mood } from "../enum";
import { updateTrackErrorMessages } from "../messages";

export const updateTrackSchema = z.object({
  title: z
    .nativeEnum(Mood, {
      errorMap: (issue, ctx) => {
        if (issue.code === "invalid_enum_value") {
          return { message: updateTrackErrorMessages.title.moodType };
        }
        return { message: ctx.defaultError };
      },
    })
    .optional(),

  description: z
    .string()
    .max(1000, { message: updateTrackErrorMessages.description.maxLength })
    .optional(),
});

