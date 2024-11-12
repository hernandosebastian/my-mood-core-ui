import { Page } from "@playwright/test";

interface ILogOutProps {
  page: Page;
  isModalOpen?: boolean;
}

export async function logOut({ page, isModalOpen = false }: ILogOutProps) {
  if (!isModalOpen) {
    const sidebarMenuButtonTrigger = page.locator("#sidebar-user-menu-trigger");
    await sidebarMenuButtonTrigger.click();
  }

  const sidebarLogoutMenuItem = page.locator("#sidebar-logout-menu-item");
  await sidebarLogoutMenuItem.click();
}

