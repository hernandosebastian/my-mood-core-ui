import { test, expect } from "@playwright/test";
import dotenv from "dotenv";
import { completeLoginForm, openSidebarOnMobile } from "utils";

dotenv.config();

const BASE_URL = process.env.VITE_APP_BASE_URL || "http://localhost:5173/";

test.beforeEach(async ({ page }) => {
  await page.goto(`${BASE_URL}`);
});

test.describe("Homepage", () => {
  test("Should show homepage unlogged", async ({ page }) => {
    await expect(page.getByTestId("homepage-section")).toBeVisible();
    await expect(page.getByTestId("homepage-get-started-button")).toBeVisible();
    await expect(
      page.getByTestId("homepage-get-started-button-two")
    ).toBeVisible();

    await page.getByTestId("homepage-get-started-button").click();

    expect(page.url()).toContain("/iniciar-sesion");
  });

  test("Should show homepage logged in", async ({ page, isMobile }) => {
    await openSidebarOnMobile({ page, isMobile });

    await page.getByTestId("sidebar-log-in-button").click();

    await completeLoginForm({ page });

    await expect(page.getByTestId("homepage-section")).toBeVisible();
    await expect(
      page.getByTestId("homepage-get-started-button")
    ).not.toBeVisible();
    await expect(
      page.getByTestId("homepage-get-started-button-two")
    ).not.toBeVisible();
  });
});
