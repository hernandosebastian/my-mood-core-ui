import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "../ui/sidebar";
import { DatePicker } from "../../features/calendar/components/date-picker";
import { NavigateFunction } from "react-router-dom";
import { ChartNoAxesColumn } from "lucide-react";

interface ISidebarContentUserLoggedProps {
  navigate: NavigateFunction;
}

export function SidebarContentUserLogged({
  navigate,
}: Readonly<ISidebarContentUserLoggedProps>): JSX.Element {
  return (
    <>
      <DatePicker />
      <SidebarSeparator className="mx-0" />
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem
              key="Stats"
              className="text-text-secondary hover:text-text-primary hover:bg-transparent transition-colors"
            >
              <SidebarMenuButton
                asChild
                size="lg"
                className="flex gap-3 bg-background-secondary border-border-primary border hover:bg-background-primary transition-colors"
              >
                <button
                  onClick={() => navigate("/stats")}
                  data-testid="sidebar-stats-button"
                >
                  <ChartNoAxesColumn className="h-5 w-5" />
                  <span className="text-base">Stats</span>
                </button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </>
  );
}
