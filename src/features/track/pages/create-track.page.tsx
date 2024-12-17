import { useMonthDateRange, useSelectedDate } from "@/features/calendar/hooks";
import { useToast } from "@/hooks";
import { trackSeoConfig } from "@/seo/config";
import { useSEO } from "@/seo/hooks";
import { useState } from "react";
import { useCreateTrack } from "../hooks";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createTrackSchema } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mood } from "../enum";
import { createTrackToastMessages } from "../messages";
import { AxiosError } from "axios";
import { CreateTrackForm } from "../components";

export function CreateTrackPage(): JSX.Element {
  useSEO({
    title: trackSeoConfig.title,
    description: trackSeoConfig.createTrackDescription,
  });

  const { month, year } = useMonthDateRange();
  const date = useSelectedDate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { showSuccessToast, showErrorToast } = useToast();

  const createTrackMutation = useCreateTrack(month, year);

  const form = useForm<z.infer<typeof createTrackSchema>>({
    resolver: zodResolver(createTrackSchema),
    defaultValues: {
      title: Mood.HAPPY,
      description: "",
      date,
    },
  });

  async function onSubmit(
    values: z.infer<typeof createTrackSchema>
  ): Promise<void> {
    setIsLoading(true);

    try {
      await createTrackMutation.mutateAsync(values, {
        onSuccess: () => {
          showSuccessToast(
            createTrackToastMessages.success.title,
            createTrackToastMessages.success.description
          );
        },
        onError: (error: AxiosError) => {
          const errorMessage = (error.response?.data as { message?: string })
            ?.message;

          showErrorToast(
            createTrackToastMessages.error.title,
            errorMessage ?? createTrackToastMessages.error.description
          );
        },
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CreateTrackForm form={form} onSubmit={onSubmit} isLoading={isLoading} />
  );
}
