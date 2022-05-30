import { expect, test } from "@playwright/test";

test("has correct index page", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Random Ramblings of a Ranga/);
  await expect(page.locator("img").first()).toHaveAttribute(
    "src",
    /avatar-[^.]+.svg/
  );
});
