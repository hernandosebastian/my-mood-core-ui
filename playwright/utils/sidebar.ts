import { Page } from "@playwright/test";

export async function openSidebarIfNeeded(page: Page): Promise<void> {
  const viewport = page.viewportSize();
  const isMobile = viewport && viewport.width < 768;

  if (!isMobile) {
    return;
  }

  const sidebarMenu = page.locator("#sidebar");
  const isSidebarOpen = await sidebarMenu.isVisible();

  if (!isSidebarOpen) {
    const openSidebarButton = page.locator("#open-sidebar");
    await openSidebarButton.click();
  }
}

export async function closeSidebarIfNeeded(page: Page): Promise<void> {
  const closeSidebarButton = page.locator("#close-sidebar");

  if (await closeSidebarButton.isVisible()) {
    await closeSidebarButton.click();
  }
}
