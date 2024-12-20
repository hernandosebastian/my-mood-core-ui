import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { DayPicker, DayPickerSingleProps } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "./buttonVariants";

export const IconLeft = (): JSX.Element => (
  <ChevronLeftIcon className="h-4 w-4" />
);
export const IconRight = (): JSX.Element => (
  <ChevronRightIcon className="h-4 w-4" />
);

export type CalendarProps = DayPickerSingleProps & {
  className?: string;
  classNames?: Partial<Record<string, string>>;
  showOutsideDays?: boolean;
};

function SingleCalendar({
  className,
  classNames,
  selected,
  showOutsideDays = true,
  onDayClick,
  disabled = false,
  ...props
}: CalendarProps): JSX.Element {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className, {
        "pointer-events-none opacity-50": disabled,
      })}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-slate-500 rounded-md w-8 font-normal text-[0.8rem] dark:text-slate-400",
        row: "flex w-full mt-2",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-slate-100 [&:has([aria-selected].day-outside)]:bg-slate-100/50 [&:has([aria-selected].day-range-end)]:rounded-r-md dark:[&:has([aria-selected])]:bg-slate-800 dark:[&:has([aria-selected].day-outside)]:bg-slate-800/50",
          "[&:has([aria-selected])]:rounded-md"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-8 w-8 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected:
          "bg-slate-900 text-slate-100 hover:bg-slate-900 hover:text-slate-100 focus:bg-slate-900 focus:text-slate-50 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50 dark:hover:text-slate-900 dark:focus:bg-slate-50 dark:focus:text-slate-900",
        day_today:
          "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-50",
        day_outside:
          "day-outside text-slate-500 aria-selected:bg-slate-100/50 aria-selected:text-slate-500 dark:text-slate-400 dark:aria-selected:bg-slate-800/50 dark:aria-selected:text-slate-400",
        day_disabled: "text-slate-500 opacity-50 dark:text-slate-400",
        day_range_middle:
          "aria-selected:bg-slate-100 aria-selected:text-slate-900 dark:aria-selected:bg-slate-800 dark:aria-selected:text-slate-50",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft,
        IconRight,
      }}
      selected={selected}
      onDayClick={onDayClick}
      {...props}
    />
  );
}
SingleCalendar.displayName = "SingleCalendar";

export { SingleCalendar };
