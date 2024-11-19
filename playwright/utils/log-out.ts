import { Page } from "@playwright/test";
import { openSidebarIfMobile } from "./open-sidebar-if-mobile";

interface ILogOutProps {
  page: Page;
  isMobile: boolean;
  isSidebarMenuOpen: boolean;
}

export async function logOut({
  page,
  isMobile,
  isSidebarMenuOpen,
}: ILogOutProps) {
  if (!isSidebarMenuOpen) {
    await openSidebarIfMobile({ page, isMobile });
    await page.getByTestId("sidebar-open-menu-button").click();
  }
  await page.getByTestId("sidebar-logout-menu-item").click();
}
