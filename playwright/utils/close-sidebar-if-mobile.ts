import { Page } from "@playwright/test";

interface ICloseSidebarIfMobileProps {
  page: Page;
  isMobile: boolean;
}

export async function closeSidebarIfMobile({
  page,
  isMobile,
}: ICloseSidebarIfMobileProps): Promise<void> {
  if (isMobile) {
    await page.getByTestId("toggle-sidebar-trigger-close-responsive").click();
  }
}

