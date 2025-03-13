import { useQuery, UseQueryResult } from "react-query";
import { getCognitoToken } from "@/services/cookies";
import { Track } from "../entity";
import { AxiosError } from "axios";
import { IGetTrackByDateRangeDto, ITrack } from "../interfaces";
import { getTrackByDateRange } from "../services/get-track-by-date-range.service";
import { mapToTrack } from "../mapper";
import { tracksKeys } from "./tracks-keys";

export interface IUseGetTrackByDateRangeDto extends IGetTrackByDateRangeDto {
  month: string;
  year: string;
}

export const useGetTrackByDateRange = ({
  startDate,
  endDate,
  month,
  year,
}: IUseGetTrackByDateRangeDto): UseQueryResult<
  Track[] | undefined,
  AxiosError
> => {
  const accessToken = getCognitoToken();

  return useQuery<ITrack[], AxiosError, Track[] | undefined>({
    queryKey: tracksKeys.list(month, year),
    queryFn: async () => getTrackByDateRange({ startDate, endDate }),
    enabled: !!accessToken,
    select: (tracks: ITrack[]) => {
      return tracks.length > 0 ? tracks.map(mapToTrack) : undefined;
    },
  });
};
