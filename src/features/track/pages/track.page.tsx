import { useMonthDateRange, useSelectedDate } from "@/features/calendar/hooks";
import { trackSeoConfig } from "@/seo/config";
import { useSEO } from "@/seo/hooks";
import { Loading } from "@/components/common/Loading";
import { CreateTrackPage } from "./create-track.page";
import { calendarToastMessages } from "@/features/calendar/messages";
import { useScrollToTop, useToast } from "@/hooks";
import { getTrackByDateFromTracks, isTrackedDay } from "../utils";
import { useGetTrackByDateRange } from "../hooks";
import { UpdateTrackPage } from "./update-track.page";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

export function TrackPage(): JSX.Element {
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

  useScrollToTop({ dependency: [date, dayIsTracked, isLoading] });

  useSEO({
    title: trackSeoConfig.title,
    description: trackSeoConfig.createTrackDescription,
  });

  const navigate = useNavigate();
  const { showErrorToast } = useToast();

  if (error) {
    const errorMessage =
      error.message || calendarToastMessages.error.description;

    showErrorToast(calendarToastMessages.error.title, errorMessage);

    navigate("/");
  }

  if (isLoading) return <Loading />;

  return dayIsTracked && trackedDay ? (
    <UpdateTrackPage track={trackedDay} />
  ) : (
    <CreateTrackPage />
  );
}
