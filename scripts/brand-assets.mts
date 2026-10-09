// Generates the link-preview image and app icons from the real logo files.
// Run manually when the brand changes: `npm run brand-assets`. The outputs are
// committed: public/og.png is referenced in src/app/layout.tsx; the icons
// are picked up by Next's metadata file conventions in src/app.
import { writeFile } from "node:fs/promises";
import sharp from "sharp";

const CANVAS = "#0a0a0a";
const EMBER = "#d94020";
const lockup = "public/brand/forge-lockup-silver.png";
const wordmark = "public/brand/forge-wordmark-silver.png";

const glow = (w: number, h: number) =>
  Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
    <defs><radialGradient id="g" cx="50%" cy="46%" r="60%">
      <stop offset="0" stop-color="#1a1a1a"/><stop offset="1" stop-color="${CANVAS}"/>
    </radialGradient></defs>
    <rect width="100%" height="100%" fill="url(#g)"/>
  </svg>`);

// Open Graph / Twitter: 1200x630, the lockup centred, a short ember rule.
{
  const [W, H] = [1200, 630];
  const logo = await sharp(lockup).resize({ width: 760 }).toBuffer();
  const { height = 0 } = await sharp(logo).metadata();
  const top = Math.round((H - height) / 2) - 16;
  await sharp(glow(W, H))
    .composite([
      { input: logo, left: (W - 760) / 2, top },
      {
        input: Buffer.from(
          `<svg xmlns="http://www.w3.org/2000/svg" width="56" height="4"><rect width="56" height="4" fill="${EMBER}"/></svg>`,
        ),
        left: (W - 56) / 2,
        top: top + height + 44,
      },
    ])
    .png({ compressionLevel: 9 })
    .toFile("public/og.png");
}

// Icons: the "F" from the wordmark, silver on the dark canvas.
{
  const { width = 0, height = 0 } = await sharp(wordmark).metadata();
  const alpha = await sharp(wordmark).extractChannel("alpha").raw().toBuffer();
  // The F is the first run of inked columns from the left.
  const inked = (x: number) => {
    for (let y = 0; y < height; y++) if (alpha[y * width + x] > 32) return true;
    return false;
  };
  let end = 0;
  while (!inked(end)) end++;
  while (inked(end)) end++;
  const f = await sharp(wordmark).extract({ left: 0, top: 0, width: end, height }).toBuffer();

  // `scale` is the F's height as a share of the icon; tab-sized icons get a
  // bigger F so it stays legible at 16px.
  const icon = async (size: number, scale: number) => {
    const glyph = await sharp(f).resize({ height: Math.round(size * scale) }).toBuffer();
    const { width: gw = 0, height: gh = 0 } = await sharp(glyph).metadata();
    return sharp({ create: { width: size, height: size, channels: 4, background: CANVAS } })
      .composite([{ input: glyph, left: Math.round((size - gw) / 2), top: Math.round((size - gh) / 2) }])
      .png({ compressionLevel: 9 })
      .toBuffer();
  };

  await writeFile("src/app/icon.png", await icon(512, 0.5));
  await writeFile("src/app/apple-icon.png", await icon(180, 0.5));

  // favicon.ico for anything that asks for /favicon.ico directly (bookmarks,
  // search results, older browsers). An ICO is a small directory of PNGs.
  const sizes = [16, 32, 48];
  const pngs = await Promise.all(sizes.map((size) => icon(size, 0.7)));
  const header = Buffer.alloc(6 + 16 * sizes.length);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(sizes.length, 4);
  let offset = header.length;
  sizes.forEach((size, i) => {
    const entry = 6 + 16 * i;
    header.writeUInt8(size, entry); // width
    header.writeUInt8(size, entry + 1); // height
    header.writeUInt16LE(1, entry + 4); // colour planes
    header.writeUInt16LE(32, entry + 6); // bits per pixel
    header.writeUInt32LE(pngs[i].length, entry + 8);
    header.writeUInt32LE(offset, entry + 12);
    offset += pngs[i].length;
  });
  await writeFile("src/app/favicon.ico", Buffer.concat([header, ...pngs]));
}

console.log("brand-assets: wrote public/og.png, src/app/{icon.png,apple-icon.png,favicon.ico}");
