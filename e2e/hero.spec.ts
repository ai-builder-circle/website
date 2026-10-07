import { expect, test, type Page } from "@playwright/test";

const statement =
  "A community of builders in Johannesburg. Invite-only. You get in by what you’ve built.";

const heroParts = (page: Page) => [
  page.getByRole("heading", { level: 1 }),
  page.getByText(statement),
  page.getByRole("link", { name: "Get in touch" }).first(),
];

test("hero shows the locked copy with the CTA above the fold", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.getByText(statement)).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Get in touch" }).first(),
  ).toBeInViewport();
});

test("what FORGE is section has the locked copy", async ({ page }) => {
  await page.goto("/");
  const about = page.getByRole("region", { name: "What FORGE is" });
  await expect(about).toContainText(
    "FORGE is a small group of young builders who commit to finishing real things, and hold each other to it.",
  );
  await expect(about).toContainText(
    "Entry is by proof of work, not by signing up.",
  );
  await expect(about).toContainText("We’re small on purpose.");
});

test("hero reveal settles fully visible", async ({ page }) => {
  await page.goto("/");
  await expect
    .poll(() =>
      page.evaluate(
        () =>
          document
            .getAnimations()
            .filter((a) => a.playState === "running").length,
      ),
    )
    .toBe(0);
  for (const part of heroParts(page)) {
    await expect(part).toBeVisible();
    await expect(part).toHaveCSS("opacity", "1");
  }
});

test("reduced motion: hero is static and visible immediately", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  for (const part of heroParts(page)) {
    await expect(part).toHaveCSS("animation-name", "none");
    await expect(part).toHaveCSS("opacity", "1");
  }
});
