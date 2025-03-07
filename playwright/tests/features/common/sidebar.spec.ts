import { test, expect } from "@playwright/test";
import { logIn } from "../../../utils/iniciar-sesion";
import { logOut } from "../../../utils/log-out";
import { openSidebarIfMobile } from "../../../utils";
import dotenv from "dotenv";

dotenv.config();

const BASE_URL = process.env.VITE_APP_BASE_URL || "http://localhost:5173/";

test.beforeEach(async ({ page }) => {
  await page.goto(`${BASE_URL}`);
});

test.describe("components/sidebar", () => {
  test("should update sidebar based on user state", async ({
    page,
    isMobile,
  }) => {
    await openSidebarIfMobile({ page, isMobile });

    const sidebarLoginButton = page.getByTestId("sidebar-log-in-button");
    const sidebarSignUpButton = page.getByTestId("sidebar-sign-up-button");
    const sidebarLogoutMenuItem = page.getByTestId("sidebar-logout-menu-item");
    const sidebarDatePicker = page.getByTestId("sidebar-date-picker");
    const sidebarMenuButtonTrigger = page.getByTestId(
      "sidebar-open-menu-button"
    );

    await expect(sidebarLoginButton).toBeVisible();
    await expect(sidebarSignUpButton).toBeVisible();
    await expect(sidebarLogoutMenuItem).not.toBeVisible();
    await expect(sidebarDatePicker).not.toBeVisible();
    await expect(sidebarMenuButtonTrigger).not.toBeVisible();

    await logIn({ page, isMobile, isSidebarOpen: true });

    await openSidebarIfMobile({ page, isMobile });

    await expect(sidebarLoginButton).not.toBeVisible();
    await expect(sidebarSignUpButton).not.toBeVisible();
    await expect(sidebarMenuButtonTrigger).toBeVisible();
    await sidebarMenuButtonTrigger.click();
    await expect(sidebarLogoutMenuItem).toBeVisible();
    await expect(sidebarDatePicker).toBeVisible();

    await logOut({ page, isMobile, isSidebarMenuOpen: true });

    await expect(sidebarLoginButton).toBeVisible();
    await expect(sidebarSignUpButton).toBeVisible();
    await expect(sidebarMenuButtonTrigger).not.toBeVisible();
    await expect(sidebarLogoutMenuItem).not.toBeVisible();
    await expect(sidebarDatePicker).not.toBeVisible();
  });
});
