import { useToast } from "@/hooks";
import { trackSeoConfig } from "@/seo/config/track-config";
import { useSEO } from "@/seo/hooks";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { updateTrackSchema } from "../schemas";
import { Track } from "../entity";
import { useDeleteTrack, useUpdateTrack } from "../hooks";
import { useMonthDateRange } from "@/features/calendar/hooks";
import {
  deleteTrackToastMessages,
  updateTrackToastMessages,
} from "../messages";
import { UpdateTrackForm } from "../components";

interface IUpdateTrackPageProps {
  track: Track;
}

export function UpdateTrackPage({
  track,
}: Readonly<IUpdateTrackPageProps>): JSX.Element {
  useSEO({
    title: trackSeoConfig.title,
    description: trackSeoConfig.updateTrackDescription,
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { showSuccessToast, showErrorToast } = useToast();

  const { month, year } = useMonthDateRange();

  const updateTrackMutation = useUpdateTrack(month, year);
  const deleteTrackMutation = useDeleteTrack(month, year);

  const form = useForm<z.infer<typeof updateTrackSchema>>({
    resolver: zodResolver(updateTrackSchema),
    defaultValues: {
      title: track.title,
      description: track.description,
    },
  });

  useEffect(() => {
    form.reset({
      title: track.title,
      description: track.description,
    });
  }, [track, form]);

  async function onSubmit(
    values: z.infer<typeof updateTrackSchema>
  ): Promise<void> {
    setIsLoading(true);

    try {
      const updateData = {
        id: track.id,
        updateTrackDto: values,
      };

      await updateTrackMutation.mutateAsync(updateData, {
        onSuccess: () => {
          showSuccessToast(
            updateTrackToastMessages.success.title,
            updateTrackToastMessages.success.description
          );
        },
        onError: (error: AxiosError) => {
          const errorMessage = (error.response?.data as { message?: string })
            ?.message;

          showErrorToast(
            updateTrackToastMessages.error.title,
            errorMessage ?? updateTrackToastMessages.error.description
          );
        },
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function onDelete(): Promise<void> {
    await deleteTrackMutation.mutateAsync(track.id, {
      onSuccess: () => {
        showSuccessToast(
          deleteTrackToastMessages.success.title,
          deleteTrackToastMessages.success.description
        );
      },
      onError: (error: AxiosError) => {
        const errorMessage = (error.response?.data as { message?: string })
          ?.message;

        showErrorToast(
          deleteTrackToastMessages.error.title,
          errorMessage ?? deleteTrackToastMessages.error.description
        );
      },
    });
  }

  return (
    <UpdateTrackForm
      form={form}
      onSubmit={onSubmit}
      onDelete={onDelete}
      isLoading={isLoading}
    />
  );
}
