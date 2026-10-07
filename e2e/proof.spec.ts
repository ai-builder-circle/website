import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("proof section has the session, description and quote", async ({
  page,
}) => {
  const proof = page.getByRole("region", { name: "Proof" });
  await expect(
    proof.getByRole("heading", { level: 3, name: /Build Your Way In/ }),
  ).toContainText("GDG DevFest Pretoria 2026");
  await expect(proof).toContainText(
    "We ran the career and entrepreneurship session at DevFest Pretoria: 110 minutes, a room of developers, and everyone building something real before they left.",
  );
  await expect(proof.locator("blockquote")).toHaveText(
    "“Feedback received from the community is that they enjoyed the FORGE Build session.”",
  );
  await expect(proof.locator("figcaption")).toHaveText(
    "Tash, Community Manager, GDG Pretoria",
  );
});

test("proof photos load as pre-sized WebP", async ({ page }) => {
  const photos = page.getByRole("region", { name: "Proof" }).locator("img");
  await expect(photos).toHaveCount(3);

  for (const photo of await photos.all()) {
    await photo.scrollIntoViewIfNeeded();
    await expect(photo).toHaveAttribute("srcset", /\.webp \d+w/);
    await expect
      .poll(() => photo.evaluate((img: HTMLImageElement) => img.naturalWidth))
      .toBeGreaterThan(0);
    expect(
      await photo.evaluate((img: HTMLImageElement) => img.currentSrc),
    ).toMatch(/\/photos\/devfest-[\w-]+-\d+\.webp$/);
  }
});

test("phone downloads a phone-sized photo, not the largest", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "phone");
  const room = page.getByRole("region", { name: "Proof" }).locator("img").first();
  await room.scrollIntoViewIfNeeded();
  await expect
    .poll(() => room.evaluate((img: HTMLImageElement) => img.currentSrc))
    // Pixel 7: 412px at 2.625x DPR needs ~1081 device px -> the 1280 file.
    .toMatch(/-(640|828|1080|1280)\.webp$/);
});
