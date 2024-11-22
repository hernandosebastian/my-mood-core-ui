import { SidebarSeparator } from "../ui/sidebar";
import { DatePicker } from "../../features/calendar/components/date-picker";

export function SidebarContentUserLogged(): JSX.Element {
  return (
    <>
      <DatePicker />
      <SidebarSeparator className="mx-0" />
    </>
  );
}
