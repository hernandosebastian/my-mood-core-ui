import { useMutation, UseMutationResult, useQueryClient } from "react-query";
import { AxiosError } from "axios";
import { ICreateTrackDto, ITrack } from "../interfaces";
import { createTrack } from "../services";
import { Track } from "../entity";
import { tracksKeys } from "./tracks-keys";
import { mapToTrack } from "../mapper";

export const useCreateTrack = (
  month: string,
  year: string
): UseMutationResult<ITrack, AxiosError, ICreateTrackDto, unknown> => {
  const queryClient = useQueryClient();

  return useMutation<ITrack, AxiosError, ICreateTrackDto, unknown>({
    mutationFn: ({ title, description, date }: ICreateTrackDto) =>
      createTrack({ title, description, date }),
    onSuccess: (newTrack) => {
      const previous = queryClient.getQueryData<Track[]>(
        tracksKeys.list(month, year)
      );

      if (previous) {
        queryClient.setQueryData(tracksKeys.list(month, year), [
          ...previous,
          mapToTrack(newTrack),
        ]);
      }

      queryClient.invalidateQueries(tracksKeys.list(month, year), {
        refetchActive: !previous,
      });
    },
  });
};

