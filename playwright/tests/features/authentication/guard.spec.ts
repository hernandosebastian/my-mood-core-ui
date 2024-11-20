import { test } from "@playwright/test";
import dotenv from "dotenv";
import {
  closeSidebarIfMobile,
  logIn,
  logOut,
  openSidebarIfMobile,
} from "utils";

dotenv.config();

const BASE_URL = process.env.VITE_APP_BASE_URL || "http://localhost:5173/";

test.beforeEach(async ({ page }) => {
  await page.goto(`${BASE_URL}log-in`);
});

test.describe("features/authentication/guard", () => {
  test("should test guard with authenticated route", async ({
    page,
    isMobile,
  }) => {
    await logIn({ page, isMobile, isSidebarOpen: false });

    await openSidebarIfMobile({ page, isMobile });

    await page.getByTestId("sidebar-open-menu-button").click();
    await page.getByTestId("sidebar-edit-profile-menu-item").click();

    await closeSidebarIfMobile({ page, isMobile });

    await page.waitForTimeout(2000);
    await page.waitForURL(`${BASE_URL}edit-profile`);

    await logOut({ page, isMobile, isSidebarMenuOpen: false });
    await page.waitForTimeout(2000);

    await page.waitForURL(`${BASE_URL}`);

    await page.goto(`${BASE_URL}edit-profile`);

    await page.waitForTimeout(2000);
    await page.waitForURL(`${BASE_URL}log-in`);
  });
});

