import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const meta = (page: Page, key: string) =>
  page
    .locator(`meta[property="${key}"], meta[name="${key}"]`)
    .getAttribute("content");

test("link preview tags are complete and absolute", async ({ page }) => {
  await page.goto("/");
  expect(await meta(page, "og:title")).toBe("FORGE — A community of builders");
  expect(await meta(page, "og:description")).toContain("Invite-only.");
  expect(await meta(page, "og:url")).toBe("https://forgecommunity.dev");
  expect(await meta(page, "og:image")).toBe("https://forgecommunity.dev/og.png");
  expect(await meta(page, "og:image:alt")).toBeTruthy();
  expect(await meta(page, "twitter:card")).toBe("summary_large_image");
});

test("preview image is a 1200x630 PNG small enough for WhatsApp", async ({
  page,
  request,
}) => {
  const res = await request.get("/og.png");
  expect(res.status()).toBe(200);
  expect(res.headers()["content-type"]).toContain("image/png");
  // WhatsApp drops previews whose image is too large (~600 KB).
  expect((await res.body()).length).toBeLessThan(300_000);

  await page.goto("/og.png");
  const size = await page
    .locator("img")
    .evaluate((img: HTMLImageElement) => [img.naturalWidth, img.naturalHeight]);
  expect(size).toEqual([1200, 630]);
});

test("icons, robots.txt and sitemap.xml are served", async ({ page, request }) => {
  await page.goto("/");
  for (const href of await page
    .locator('link[rel="icon"], link[rel="apple-touch-icon"]')
    .evaluateAll((links) => links.map((l) => l.getAttribute("href")!))) {
    expect((await request.get(href)).status()).toBe(200);
  }
  expect(await (await request.get("/robots.txt")).text()).toContain(
    "Sitemap: https://forgecommunity.dev/sitemap.xml",
  );
  expect(await (await request.get("/sitemap.xml")).text()).toContain(
    "<loc>https://forgecommunity.dev/</loc>",
  );
});

const axe = (page: Page) =>
  new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"]);

test("no axe violations at the top or with the header shown", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  expect((await axe(page).analyze()).violations).toEqual([]);

  await page.evaluate(() =>
    window.scrollTo({ top: window.innerHeight * 1.5, behavior: "instant" }),
  );
  await expect(page.locator("header")).toBeVisible();
  expect((await axe(page).analyze()).violations).toEqual([]);
});

test("keyboard: every stop shows a focus ring and isn't under the header", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name === "phone", "no Tab key on phones");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  const stops: string[] = [];
  for (let i = 0; i < 20; i++) {
    await page.keyboard.press("Tab");
    const stop = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement | null;
      if (!el || el === document.body) return null;
      const style = getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      const header = document.querySelector("header");
      const headerShown = header && getComputedStyle(header).visibility !== "hidden";
      const headerBottom = headerShown ? header.getBoundingClientRect().bottom : 0;
      return {
        name: el.textContent?.trim() || el.getAttribute("aria-label") || el.tagName,
        ring: style.outlineStyle !== "none" && parseFloat(style.outlineWidth) > 0,
        inView: rect.bottom <= window.innerHeight && rect.top >= 0,
        clearOfHeader: header?.contains(el) || rect.top >= headerBottom,
      };
    });
    if (!stop || stops.includes(stop.name)) break;
    stops.push(stop.name);
    expect(stop, `focus stop "${stop.name}"`).toMatchObject({
      ring: true,
      inView: true,
      clearOfHeader: true,
    });
  }
  // The hero CTA comes first; the footer links come last.
  expect(stops[0]).toBe("Get in touch");
  expect(stops.slice(-2)).toEqual(["LinkedIn", "GitHub"]);
});

test("production: canonical URL and preview image load without a redirect", async ({
  page,
  request,
}) => {
  // Only meaningful against the deployed site (BASE_URL): locally these
  // absolute URLs would point at production, not the build under test.
  test.skip(!process.env.BASE_URL, "production-only check");
  await page.goto("/");
  const urls = [
    await page.locator('link[rel="canonical"]').getAttribute("href"),
    await meta(page, "og:image"),
  ];
  for (const url of urls) {
    // Crawlers (LinkedIn, WhatsApp) don't always follow redirects for previews.
    const res = await request.get(url!, { maxRedirects: 0 });
    expect(res.status(), `${url} should not redirect`).toBe(200);
  }
});
