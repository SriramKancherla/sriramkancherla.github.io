import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const svgPath = join(root, "public", "og-image.svg");
const pngPath = join(root, "public", "og-image.png");

const svg = readFileSync(svgPath);

// Truecolor PNG — indexed/palette PNGs break some chat link previews (iMessage, WhatsApp).
await sharp(svg, { density: 72 })
  .png({ compressionLevel: 6, effort: 10, palette: false })
  .toFile(pngPath);

const meta = await sharp(pngPath).metadata();
const hash = createHash("md5").update(readFileSync(pngPath)).digest("hex").slice(0, 8);
console.log(`Generated public/og-image.png (${meta.width}x${meta.height}, v=${hash})`);
