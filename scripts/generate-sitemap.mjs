import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = join(root, "public");
const DEFAULT_SITE_URL = "https://sriramkancherla.pages.dev";

const siteUrl = (process.env.VITE_SITE_URL || DEFAULT_SITE_URL).replace(/\/$/, "");
const routes = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/resume", changefreq: "monthly", priority: "0.8" },
];

if (!siteUrl) {
  console.warn("VITE_SITE_URL not set — using default production URL.");
}
const lastmod = new Date().toISOString().slice(0, 10);

const urlEntries = routes
  .map(
    ({ path, changefreq, priority }) => `  <url>
    <loc>${siteUrl}${path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`,
  )
  .join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`;

writeFileSync(join(publicDir, "sitemap.xml"), sitemap);

const robotsPath = join(publicDir, "robots.txt");
const robotsBase = readFileSync(robotsPath, "utf8").replace(/\n*Sitemap:.*\n?/g, "\n").trimEnd();
const robots = siteUrl ? `${robotsBase}\n\nSitemap: ${siteUrl}/sitemap.xml\n` : `${robotsBase}\n`;

writeFileSync(robotsPath, robots);
console.log(`Generated public/sitemap.xml${siteUrl ? ` (${siteUrl})` : ""}`);
