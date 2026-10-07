import { expect, test } from "@playwright/test";

const CONTACT = "mailto:hello@forgecommunity.dev";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("shows the FORGE brand in the hero", async ({ page }) => {
  await expect(page).toHaveTitle(/FORGE/);
  await expect(
    page.getByRole("heading", { level: 1, name: /FORGE/ }),
  ).toBeVisible();
});

test("every contact link emails the FORGE inbox", async ({ page }) => {
  const getInTouch = page.getByRole("link", { name: "Get in touch" }).first();
  await expect(getInTouch).toBeVisible();

  const mailtos = page.locator('a[href^="mailto:"]');
  expect(await mailtos.count()).toBeGreaterThan(0);
  for (const href of await mailtos.evaluateAll((as) =>
    as.map((a) => a.getAttribute("href")),
  )) {
    expect(href).toBe(CONTACT);
  }
});

test("renders the page sections in order", async ({ page }) => {
  const ids = await page
    .locator("main > section[id]")
    .evaluateAll((els) => els.map((el) => el.id));
  expect(ids).toEqual(["about", "proof", "builders", "contact"]);
  await expect(page.locator("footer")).toBeVisible();
});

test("every image has alt text", async ({ page }) => {
  for (const alt of await page
    .locator("img")
    .evaluateAll((imgs) => imgs.map((img) => img.getAttribute("alt")))) {
    expect(alt?.trim()).toBeTruthy();
  }
});

test("nothing out of scope exists (no forms, no join/apply/login)", async ({
  page,
}) => {
  await expect(page.locator("form, input, textarea")).toHaveCount(0);
  await expect(
    page.getByRole("link", { name: /apply|join|log ?in|sign ?(up|in)/i }),
  ).toHaveCount(0);
});

test("no horizontal scroll", async ({ page }) => {
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth,
  );
  expect(overflow).toBeLessThanOrEqual(0);
});
