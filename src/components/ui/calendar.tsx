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
  modifiers?: Record<string, Date[]>;
  modifiersStyles?: Record<string, React.CSSProperties>;
};

function SingleCalendar({
  className,
  classNames,
  selected,
  showOutsideDays = true,
  onDayClick,
  disabled = false,
  modifiers,
  modifiersStyles,
  ...props
}: CalendarProps): JSX.Element {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-2", className, {
        "pointer-events-none opacity-50 ml-auto mr-auto": disabled,
      })}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium text-text-primary",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-background-secondary p-0 opacity-50 hover:opacity-100 border-border-primary text-text-secondary hover:text-text-primary hover:bg-background-primary"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex gap-[2px] justify-center",
        head_cell: "text-text-primary rounded-md w-8 font-normal text-[0.8rem]",
        row: "flex w-full mt-2 gap-[6px]",
        cell: cn(
          "relative text-text-primary opacity-80 p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([ariaSelected])]:rounded-md"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-8 w-8 p-0 font-normal opacity-80 ariaSelected:opacity-100 hover:bg-background-secondary/50"
        ),
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary/20 text-text-primary hover:bg-primary/30 ring-1 ring-text-primary/60 font-medium opacity-100",
        day_today: "bg-background-secondary/30 text-text-primary font-medium",
        day_outside:
          "text-text-secondary opacity-50 [&:not([data-modifier])]:ariaSelected:bg-primary/20 [&:not([data-modifier])]:ariaSelected:text-text-primary [&:not([data-modifier])]:ariaSelected:opacity-100 [&:not([data-modifier])]:ariaSelected:ring-1 [&:not([data-modifier])]:ariaSelected:ring-text-primary/60",
        day_disabled: "text-slate-500 opacity-50",
        day_range_middle:
          "ariaSelected:bg-slate-100 ariaSelected:text-slate-900",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft,
        IconRight,
      }}
      selected={selected}
      onDayClick={onDayClick}
      modifiers={modifiers}
      modifiersStyles={modifiersStyles}
      {...props}
    />
  );
}
SingleCalendar.displayName = "SingleCalendar";

export { SingleCalendar };
