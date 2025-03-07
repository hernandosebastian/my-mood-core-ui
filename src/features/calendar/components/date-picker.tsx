import { SingleCalendar } from "@/components/ui/calendar";
import { SidebarGroup, SidebarGroupContent } from "@/components/ui/sidebar";
import {
  useMonthDateRange,
  useSelectedDate,
  useSetSelectedDate,
} from "../hooks";
import { useNavigate } from "react-router-dom";
import { calendarToastMessages } from "../messages/calendar.messages";
import { useSidebar, useToast } from "@/hooks";
import { getMoodColor } from "@/features/track/utils/get-mood-color";
import { useGetAllTracksOnYear } from "@/features/track/hooks/use-get-all-tracks-on-year";
import { es } from "date-fns/locale";

export function DatePicker(): JSX.Element {
  const navigate = useNavigate();
  const { closeSidebarIfMobile } = useSidebar();
  const { showErrorToast } = useToast();

  const today = new Date();
  const calendarYearStart = new Date(today.getFullYear(), 0, 1);
  const calendarYearEnd = new Date(today.getFullYear(), 11, 31);

  const { month, year } = useMonthDateRange();
  const defaultMonthDate = new Date(Number(year), Number(month) - 1, 1);

  const selectedDate = useSelectedDate();
  const setSelectedDate = useSetSelectedDate();

  const {
    isLoading,
    error,
    data: tracks,
  } = useGetAllTracksOnYear({
    year,
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
          '&[ariaSelected="true"]': {
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
            '&[ariaSelected="true"]': {
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
    closeSidebarIfMobile();
    setSelectedDate(date);
    navigate("/registro");
  };

  return (
    <SidebarGroup className="px-0" data-testid="sidebar-date-picker">
      <SidebarGroupContent className="flex justify-center">
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
          locale={es}
          weekStartsOn={1}
        />
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
