import { useMonthDateRange, useSelectedDate } from "@/features/calendar/hooks";
import { trackSeoConfig } from "@/seo/config/track-config";
import { useSEO } from "@/seo/hooks";
import { Loading } from "@/components/common/Loading";
import { CreateTrackPage } from "./create-track.page";
import { calendarToastMessages } from "@/features/calendar/messages";
import { useToast } from "@/hooks";
import { getTrackByDateFromTracks, isTrackedDay } from "../utils";
import { useGetTrackByDateRange } from "../hooks";
import { UpdateTrackPage } from "./update-track.page";
import { useMemo } from "react";

export function TrackPage(): JSX.Element {
  useSEO({
    title: trackSeoConfig.title,
    description: trackSeoConfig.createTrackDescription,
  });

  const { showErrorToast } = useToast();
  const date = useSelectedDate();
  const { month, year, startDate, endDate } = useMonthDateRange();

  const {
    data: tracks,
    isLoading,
    error,
  } = useGetTrackByDateRange({
    month,
    year,
    startDate,
    endDate,
  });

  const { dayIsTracked, trackedDay } = useMemo(() => {
    const dayIsTracked = isTrackedDay(date, tracks);
    const trackedDay = getTrackByDateFromTracks(date, tracks);
    return { dayIsTracked, trackedDay };
  }, [date, tracks]);

  if (error) {
    const errorMessage = (error.response?.data as { message?: string })
      ?.message;

    showErrorToast(
      calendarToastMessages.error.title,
      errorMessage ?? calendarToastMessages.error.description
    );
  }

  if (isLoading) return <Loading />;

  return dayIsTracked && trackedDay ? (
    <UpdateTrackPage track={trackedDay} />
  ) : (
    <div>
      <CreateTrackPage />
    </div>
  );
}

