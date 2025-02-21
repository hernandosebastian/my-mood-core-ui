import { useMutation, UseMutationResult, useQueryClient } from "react-query";
import { AxiosError } from "axios";
import { Track } from "../entity";
import { tracksKeys } from "./tracks-keys";
import { deleteTrack } from "../services";

export const useDeleteTrack = (
  month: string,
  year: string
): UseMutationResult<void, AxiosError, number, unknown> => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, number, unknown>({
    mutationFn: (id: number) => deleteTrack(id),
    onSuccess: (_, idTrackDeleted) => {
      const previous = queryClient.getQueryData<Track[] | undefined>(
        tracksKeys.list(month, year)
      );

      if (previous) {
        const updatedTracks = previous.filter(
          (track) => track.id !== idTrackDeleted
        );

        queryClient.setQueryData<Track[] | undefined>(
          tracksKeys.list(month, year),
          updatedTracks
        );
      }

      const previousYear = queryClient.getQueryData<Track[] | undefined>(
        tracksKeys.yearList(year)
      );

      if (previousYear) {
        const updatedYearTracks = previousYear.filter(
          (track) => track.id !== idTrackDeleted
        );

        queryClient.setQueryData<Track[] | undefined>(
          tracksKeys.yearList(year),
          updatedYearTracks
        );
      }

      queryClient.invalidateQueries(tracksKeys.all, {
        refetchActive: !previous && !previousYear,
      });
    },
  });
};
