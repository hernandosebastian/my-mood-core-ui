import { useMutation, UseMutationResult, useQueryClient } from "react-query";
import { ITrack, IUpdateTrackDto } from "../interfaces";
import { updateTrack } from "../services";
import { Track } from "../entity";
import { tracksKeys } from "./tracks-keys";
import { mapToTrack } from "../mapper";
import { AxiosError } from "axios";

export const useUpdateTrack = (
  month: string,
  year: string
): UseMutationResult<
  ITrack,
  AxiosError,
  { id: number; updateTrackDto: IUpdateTrackDto },
  unknown
> => {
  const queryClient = useQueryClient();

  return useMutation<
    ITrack,
    AxiosError,
    { id: number; updateTrackDto: IUpdateTrackDto },
    unknown
  >({
    mutationFn: ({ id, updateTrackDto }) => updateTrack(id, updateTrackDto),
    onSuccess: (updatedTrack) => {
      const previous = queryClient.getQueryData<Track[] | undefined>(
        tracksKeys.list(month, year)
      );
      const previousYear = queryClient.getQueryData<Track[] | undefined>(
        tracksKeys.yearList(year)
      );

      if (previous) {
        const updatedTracks = previous.map((track) =>
          track.id === updatedTrack.id ? mapToTrack(updatedTrack) : track
        );

        queryClient.setQueryData<Track[] | undefined>(
          tracksKeys.list(month, year),
          updatedTracks
        );
      }

      if (previousYear) {
        const updatedYearTracks = previousYear.map((track) =>
          track.id === updatedTrack.id ? mapToTrack(updatedTrack) : track
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
