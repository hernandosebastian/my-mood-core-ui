import { Page, expect } from "@playwright/test";

interface HandleDropdownMenuProps {
  page: Page;
  triggerTestId: string;
  menuItemTestId: string;
}

export async function handleDropdownMenu({
  page,
  triggerTestId,
  menuItemTestId,
}: HandleDropdownMenuProps): Promise<void> {
  const menuButton = page.getByTestId(triggerTestId);
  const menuItem = page.getByTestId(menuItemTestId);

  let attempts = 0;
  const maxAttempts = 3;

  while (attempts < maxAttempts) {
    try {
      await menuButton.click();

      await page.waitForTimeout(1000);

      await expect(menuItem).toBeVisible({ timeout: 5000 });

      await menuItem.click({ force: true });
      return;
    } catch (error) {
      attempts++;

      if (attempts >= maxAttempts) {
        await menuButton.click({ force: true });
        await page.waitForTimeout(2000);

        const allLogoutItems = page.locator(
          '[data-testid="sidebar-logout-menu-item"]'
        );
        const itemCount = await allLogoutItems.count();

        if (itemCount > 0) {
          await allLogoutItems.first().click({ force: true });
          return;
        }

        throw new Error(
          `Failed to interact with dropdown menu after ${maxAttempts} attempts. Last error: ${error}`
        );
      }

      await page.waitForTimeout(1000);
    }
  }
}
