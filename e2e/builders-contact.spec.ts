import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("builders section lists the three locked items", async ({ page }) => {
  const items = page
    .getByRole("region", { name: "What our builders do" })
    .getByRole("listitem");
  await expect(items).toHaveText([
    "01Weekly commitments.Every member commits to one thing a week and shows it the next.",
    "02Electives.Deep tracks in Data Engineering, Cloud and System Integration.",
    "03Community sessions.We run hands-on sessions for other communities, like DevFest.",
  ]);
});

test("contact section repeats the CTA as the email address", async ({
  page,
}) => {
  const contact = page.getByRole("region", { name: "Contact" });
  await expect(contact).toContainText(
    "Running an event, hiring builders, or want to work with us?",
  );
  await expect(
    contact.getByRole("link", { name: "hello@forgecommunity.dev" }),
  ).toHaveAttribute("href", "mailto:hello@forgecommunity.dev");
});

test("footer has the wordmark, tagline, location and links", async ({
  page,
}) => {
  const footer = page.locator("footer");
  await expect(footer.getByRole("img", { name: "FORGE" })).toBeVisible();
  await expect(footer).toContainText("A community of builders · Johannesburg");
  await expect(footer.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
    "href",
    "https://www.linkedin.com/company/forgecommunity",
  );
  await expect(footer.getByRole("link", { name: "GitHub" })).toHaveAttribute(
    "href",
    "https://github.com/ai-builder-circle",
  );
});

test("no dead ends: a contact link is on screen at every scroll position", async ({
  page,
}) => {
  const height = await page.evaluate(() => document.body.scrollHeight);
  const step = await page.evaluate(() => Math.floor(window.innerHeight / 2));
  for (let y = 0; y <= height; y += step) {
    await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), y);
    await expect(
      page.locator('a[href^="mailto:"]').filter({ visible: true }).first(),
      `no visible contact link at scrollY=${y}`,
    ).toBeInViewport();
  }
});

test("the header stays out of the way on the hero", async ({ page }) => {
  const header = page.locator("header");
  await expect(header).toBeHidden();
  await page.evaluate(() =>
    window.scrollTo({ top: window.innerHeight * 1.2, behavior: "instant" }),
  );
  await expect(header).toBeVisible();
  await expect(header.getByRole("link", { name: "Get in touch" })).toBeInViewport();
});
