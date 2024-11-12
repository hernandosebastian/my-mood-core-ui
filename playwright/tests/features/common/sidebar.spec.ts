import { test, expect } from "@playwright/test";
import { logIn } from "../../../utils/log-in";
import { logOut } from "../../../utils/log-out";
import { openSidebarIfNeeded } from "../../../utils/sidebar";
import dotenv from "dotenv";

dotenv.config();

const BASE_URL = process.env.VITE_APP_BASE_URL || "http://localhost:5173/";

test.beforeEach(async ({ page }) => {
  await page.goto(`${BASE_URL}`);
});

test.describe("Sidebar", () => {
  test("should show sidebar logic according to user state", async ({
    page,
  }) => {
    await openSidebarIfNeeded(page);

    const sidebarLoginButton = page.locator("#sidebar-log-in-button");
    const sidebarSignUpButton = page.locator("#sidebar-sign-up-button");
    const sidebarLogoutMenuItem = page.locator("#sidebar-logout-menu-item");
    const sidebarDatePicker = page.locator("#sidebar-date-picker");
    const sidebarMenuButtonTrigger = page.locator("#sidebar-user-menu-trigger");

    await expect(sidebarLoginButton).toBeVisible();
    await expect(sidebarSignUpButton).toBeVisible();
    await expect(sidebarLogoutMenuItem).not.toBeVisible();
    await expect(sidebarDatePicker).not.toBeVisible();
    await expect(sidebarMenuButtonTrigger).not.toBeVisible();

    await logIn({ page });

    await openSidebarIfNeeded(page);

    await expect(sidebarLoginButton).not.toBeVisible();
    await expect(sidebarSignUpButton).not.toBeVisible();
    await expect(sidebarMenuButtonTrigger).toBeVisible();
    await sidebarMenuButtonTrigger.click();
    await expect(sidebarLogoutMenuItem).toBeVisible();
    await expect(sidebarDatePicker).toBeVisible();

    await logOut({ page, isModalOpen: true });

    await expect(sidebarLoginButton).toBeVisible();
    await expect(sidebarSignUpButton).toBeVisible();
    await expect(sidebarMenuButtonTrigger).not.toBeVisible();
    await expect(sidebarLogoutMenuItem).not.toBeVisible();
    await expect(sidebarDatePicker).not.toBeVisible();
  });
});

