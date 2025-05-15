import { expect, test } from "@playwright/test";
import dotenv from "dotenv";
import { completeLoginForm, openSidebarOnMobile } from "utils";

dotenv.config();

const BASE_URL = process.env.VITE_APP_BASE_URL || "http://localhost:5173/";

test.beforeEach(async ({ page }) => {
  await page.goto(`${BASE_URL}`);
});

test.describe("Authentication required guard", () => {
  test("Should test guard with authenticated route", async ({
    page,
    isMobile,
  }) => {
    await openSidebarOnMobile({ page, isMobile });

    await page.getByTestId("sidebar-log-in-button").click();

    await completeLoginForm({ page });

    await openSidebarOnMobile({ page, isMobile });

    await page.getByTestId("sidebar-open-menu-button").click();
    await page.getByTestId("sidebar-edit-profile-menu-item").click();

    expect(page.url()).toContain("/editar-perfil");

    await openSidebarOnMobile({ page, isMobile });
    await page.getByTestId("sidebar-open-menu-button").click();
    await page.getByTestId("sidebar-logout-menu-item").click();

    await page.goto(`${BASE_URL}editar-perfil`);
    await page.waitForURL(`${BASE_URL}iniciar-sesion`);
  });
});
