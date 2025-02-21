import { SingleCalendar } from "@/components/ui/calendar";
import { SidebarGroup, SidebarGroupContent } from "@/components/ui/sidebar";
import {
  useMonthDateRange,
  useSelectedDate,
  useSetSelectedDate,
} from "../hooks";
import { useNavigate } from "react-router-dom";
import { calendarToastMessages } from "../messages/calendar.messages";
import { useToast } from "@/hooks";
import { useGetTrackByDateRange } from "@/features/track/hooks";
import { getMoodColor } from "@/features/track/utils/get-mood-color";

export function DatePicker(): JSX.Element {
  const navigate = useNavigate();
  const { showErrorToast } = useToast();

  const today = new Date();
  const calendarYearStart = new Date(today.getFullYear(), 0, 1);
  const calendarYearEnd = new Date(today.getFullYear(), 11, 31);

  const { month, year } = useMonthDateRange();
  const extendedStartDate = new Date(Number(year), 0, 1);
  const extendedEndDate = new Date(Number(year), 11, 31);
  const defaultMonthDate = new Date(Number(year), Number(month) - 1, 1);

  const selectedDate = useSelectedDate();
  const setSelectedDate = useSetSelectedDate();

  const {
    isLoading,
    error,
    data: tracks,
  } = useGetTrackByDateRange({
    month,
    year,
    startDate: extendedStartDate.toISOString(),
    endDate: extendedEndDate.toISOString(),
  });

  if (error) {
    const errorMessage = (error.response?.data as { message?: string })
      ?.message;

    showErrorToast(
      calendarToastMessages.error.title,
      errorMessage ?? calendarToastMessages.error.description
    );
  }

  const modifiersForTrackedDaysFromCurrentMonth = tracks?.reduce(
    (styles, track) => {
      const dateString = new Date(track.date).toISOString();
      return {
        ...styles,
        [`trackedCurrentMonth_${dateString}`]: {
          backgroundColor: getMoodColor(track.title),
          color: "#000000",
          '&[aria-selected="true"]': {
            opacity: "1",
            backgroundColor: getMoodColor(track.title),
          },
        },
      };
    },
    {}
  );

  const trackedCurrentMonthModifiers = tracks?.reduce((mods, track) => {
    const trackDate = new Date(track.date);
    if (
      trackDate.getMonth() === Number(month) - 1 &&
      trackDate.getFullYear() === Number(year)
    ) {
      const dateString = trackDate.toISOString();
      return {
        ...mods,
        [`trackedCurrentMonth_${dateString}`]: [trackDate],
      };
    }
    return mods;
  }, {});

  const modifiersForTrackedDaysFromOtherMonths = tracks?.reduce(
    (styles, track) => {
      const trackDate = new Date(track.date);
      if (
        trackDate.getMonth() !== Number(month) - 1 ||
        trackDate.getFullYear() !== Number(year)
      ) {
        const dateString = trackDate.toISOString();
        return {
          ...styles,
          [`trackedOtherMonths_${dateString}`]: {
            color: getMoodColor(track.title),
            '&[aria-selected="true"]': {
              opacity: "1",
              color: getMoodColor(track.title),
            },
          },
        };
      }
      return styles;
    },
    {}
  );

  const trackedOtherMonthsModifiers = tracks?.reduce((mods, track) => {
    const trackDate = new Date(track.date);
    if (
      trackDate.getMonth() !== Number(month) - 1 ||
      trackDate.getFullYear() !== Number(year)
    ) {
      const dateString = trackDate.toISOString();
      return {
        ...mods,
        [`trackedOtherMonths_${dateString}`]: [trackDate],
      };
    }
    return mods;
  }, {});

  const combinedModifiersStyles = {
    ...modifiersForTrackedDaysFromCurrentMonth,
    ...modifiersForTrackedDaysFromOtherMonths,
  };

  const combinedModifiers = {
    ...trackedCurrentMonthModifiers,
    ...trackedOtherMonthsModifiers,
  };

  const handleOnDayClick = (date: Date): void => {
    setSelectedDate(date);
    navigate("/track");
  };

  return (
    <SidebarGroup className="px-0" data-testid="sidebar-date-picker">
      <SidebarGroupContent>
        <SingleCalendar
          className="[&_[role=gridcell].bg-accent]:bg-sidebar-primary [&_[role=gridcell].bg-accent]:text-sidebar-primary-foreground [&_[role=gridcell]]:w-[33px]"
          selected={selectedDate}
          mode="single"
          onDayClick={handleOnDayClick}
          disabled={isLoading}
          modifiers={combinedModifiers}
          modifiersStyles={combinedModifiersStyles}
          fromDate={calendarYearStart}
          toDate={calendarYearEnd}
          defaultMonth={defaultMonthDate}
        />
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
