import { createHash } from "crypto";
import { existsSync, readFileSync } from "fs";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

const DEFAULT_SITE_URL = "https://sriramkancherla.pages.dev";

function injectSiteUrl(siteUrl: string) {
  return {
    name: "inject-site-url",
    transformIndexHtml(html: string) {
      const base = (siteUrl || DEFAULT_SITE_URL).replace(/\/$/, "");
      const pngPath = path.join(__dirname, "public", "og-image.png");
      const ogVersion = existsSync(pngPath)
        ? createHash("md5").update(readFileSync(pngPath)).digest("hex").slice(0, 8)
        : "1";
      const ogImage = `${base}/og-image.png?v=${ogVersion}`;

      return html
        .replaceAll("__SITE_URL__", base)
        .replaceAll("__OG_IMAGE_URL__", ogImage)
        .replaceAll("__OG_VERSION__", ogVersion);
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const siteUrl = env.VITE_SITE_URL || "";
  const base = env.VITE_BASE_PATH || "/";

  return {
    base,
    server: {
      host: "::",
      port: 8080,
      allowedHosts: true,
      hmr: {
        overlay: false,
      },
    },
    plugins: [react(), injectSiteUrl(siteUrl), mode === "development" && componentTagger()].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
      dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
    },
  };
});
