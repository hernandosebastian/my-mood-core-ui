import { SingleCalendar } from "@/components/ui/calendar";
import { SidebarGroup, SidebarGroupContent } from "@/components/ui/sidebar";
import { useSelectedDate, useSetSelectedDate } from "../hooks";

export function DatePicker(): JSX.Element {
  const selectedDate = useSelectedDate();
  const setSelectedDate = useSetSelectedDate();

  return (
    <SidebarGroup className="px-0" data-testid="sidebar-date-picker">
      <SidebarGroupContent>
        <SingleCalendar
          className="[&_[role=gridcell].bg-accent]:bg-sidebar-primary [&_[role=gridcell].bg-accent]:text-sidebar-primary-foreground [&_[role=gridcell]]:w-[33px]"
          selected={selectedDate}
          mode="single"
          onDayClick={setSelectedDate}
        />
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
