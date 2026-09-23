import { test, expect } from "@playwright/test";

test("search, add a phone to the cart and remove it", async ({ page }) => {
  test.setTimeout(60_000);

  await page.goto("/");

  await page.getByLabel("Search for a smartphone").fill("galaxy s24");
  await expect(page.getByText("1 results")).toBeVisible();
  await expect(
    page.getByRole("link", { name: /galaxy s24 ultra/i }),
  ).toBeVisible();

  await page.getByRole("link", { name: /galaxy s24 ultra/i }).click();
  await expect(page).toHaveURL(/\/phone\/SMG-S24U/);

  await page
    .getByRole("radiogroup", { name: "Storage" })
    .getByRole("radio")
    .first()
    .click();
  await page
    .getByRole("radiogroup", { name: "Color" })
    .getByRole("radio")
    .first()
    .click();

  await page.getByRole("button", { name: "Add to cart" }).click();
  await expect(page).toHaveURL("/cart");
  await expect(page.getByText("Cart (1)")).toBeVisible();

  await page.getByRole("button", { name: /remove/i }).click();
  await expect(page.getByText("Cart (0)")).toBeVisible();
});

test("search, add a phone to the cart and pay it", async ({ page }) => {
  test.setTimeout(60_000);

  await page.goto("/");

  await page.getByLabel("Search for a smartphone").fill("phone");
  await expect(page.getByText("2 results")).toBeVisible();

  await page.getByRole("link", { name: /iphone 15 pro max/i }).click();
  await expect(page).toHaveURL(/\/phone\/APL-I15PM/);

  await page
    .getByRole("radiogroup", { name: "Storage" })
    .getByRole("radio")
    .first()
    .click();
  await page
    .getByRole("radiogroup", { name: "Color" })
    .getByRole("radio")
    .first()
    .click();

  await page.getByRole("button", { name: "Add to cart" }).click();
  await expect(page).toHaveURL("/cart");
  await expect(page.getByText("Cart (1)")).toBeVisible();

  await page.getByRole("button", { name: /pay/i }).click();
  await expect(page).toHaveURL("/");
});
