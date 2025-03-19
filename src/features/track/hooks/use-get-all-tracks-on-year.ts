import { useQuery, UseQueryResult } from "react-query";
import { getCookie, StoredCookies } from "@/services/cookies";
import { Track } from "../entity";
import { AxiosError } from "axios";
import { ITrack } from "../interfaces";
import { getTrackByDateRange } from "../services/get-track-by-date-range.service";
import { mapToTrack } from "../mapper";
import { tracksKeys } from "./tracks-keys";

interface IUseGetAllTracksOnYearDto {
  year: string;
}

export const useGetAllTracksOnYear = ({
  year,
}: IUseGetAllTracksOnYearDto): UseQueryResult<
  Track[] | undefined,
  AxiosError
> => {
  const accessToken = getCookie(StoredCookies.ACCESS_TOKEN);

  const startDate = new Date(Number(year), 0, 1).toISOString();
  const endDate = new Date(Number(year), 11, 31).toISOString();

  return useQuery<ITrack[], AxiosError, Track[] | undefined>({
    queryKey: tracksKeys.yearList(year),
    queryFn: async () => getTrackByDateRange({ startDate, endDate }),
    enabled: !!accessToken,
    select: (tracks: ITrack[]) => {
      return tracks.length > 0 ? tracks.map(mapToTrack) : undefined;
    },
  });
};
