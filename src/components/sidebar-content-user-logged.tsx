import { DatePicker } from "./date-picker";
import { SidebarSeparator } from "./ui/sidebar";

export function SidebarContentUserLogged(): JSX.Element {
  return (
    <>
      <DatePicker />
      <SidebarSeparator className="mx-0" />
    </>
  );
}

