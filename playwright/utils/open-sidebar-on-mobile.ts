import { Page } from "@playwright/test";

interface IOpenSidebarOnMobileProps {
  page: Page;
  isMobile: boolean;
}

export async function openSidebarOnMobile({
  page,
  isMobile,
}: IOpenSidebarOnMobileProps) {
  if (isMobile) {
    await page.getByTestId("toggle-sidebar-trigger").click();
  }
}
