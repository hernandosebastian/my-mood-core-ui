import { Page } from "@playwright/test";

interface IOpenSidebarIfMobileProps {
  page: Page;
  isMobile: boolean;
}

export async function openSidebarIfMobile({
  page,
  isMobile,
}: IOpenSidebarIfMobileProps): Promise<void> {
  if (isMobile) {
    await page.getByTestId("toggle-sidebar-trigger").click();
  }
}

