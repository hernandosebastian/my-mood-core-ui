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

export function DatePicker(): JSX.Element {
  const navigate = useNavigate();
  const { showErrorToast } = useToast();

  const { month, year, startDate, endDate } = useMonthDateRange();
  const selectedDate = useSelectedDate();
  const setSelectedDate = useSetSelectedDate();

  const { isLoading, error } = useGetTrackByDateRange({
    month,
    year,
    startDate,
    endDate,
  });

  if (error) {
    const errorMessage = (error.response?.data as { message?: string })
      ?.message;

    showErrorToast(
      calendarToastMessages.error.title,
      errorMessage ?? calendarToastMessages.error.description
    );
  }

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
        />
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
