// Pre-sizes the photos in assets/photos for the static export. next/image's
// built-in optimizer needs a server, so src/lib/image-loader.ts points the
// srcset at the files generated here: public/photos/<name>-<width>.webp.
// Runs before `dev` and `build`. A photo is regenerated when its content
// hash changes (mtimes miss renames and swaps).
import { createHash } from "node:crypto";
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import sizes from "../image-sizes.json" with { type: "json" };

const SRC = "assets/photos";
const OUT = "public/photos";
const MANIFEST = path.join(OUT, ".manifest.json");
const widths = [...sizes.imageSizes, ...sizes.deviceSizes];
const settings = JSON.stringify({ widths, saturation: 0.8, quality: 72 });

const previous: Record<string, string> = await readFile(MANIFEST, "utf8").then(
  JSON.parse,
  () => ({}),
);
const manifest: Record<string, string> = {};

await mkdir(OUT, { recursive: true });
let written = 0;

for (const file of await readdir(SRC)) {
  if (!/\.(jpe?g|png)$/i.test(file)) continue;
  const name = path.parse(file).name;
  const input = await readFile(path.join(SRC, file));
  const hash = createHash("sha256").update(input).update(settings).digest("hex");
  manifest[name] = hash;
  if (previous[name] === hash) continue;

  for (const width of widths) {
    await sharp(input)
      .rotate() // honour EXIF orientation; metadata is not copied to the output
      .resize({ width, withoutEnlargement: true })
      .modulate({ saturation: 0.8 }) // brand direction: slightly desaturated
      .webp({ quality: 72 })
      .toFile(path.join(OUT, `${name}-${width}.webp`));
    written++;
  }
}

await writeFile(MANIFEST, JSON.stringify(manifest, null, 2));
console.log(`optimize-images: ${written} file(s) written to ${OUT}`);
