# Sriram Kancherla — Portfolio

Personal portfolio site built with Vite, React, and Tailwind CSS.

**Live site:** [sriramkancherla.pages.dev](https://sriramkancherla.pages.dev)

Also works via GitHub redirect: [sriramkancherla.github.io/portfolio/](https://sriramkancherla.github.io/portfolio/) → Cloudflare.

> **Note:** `sriramkancherla.github.io` (root) returns 404 because the repo is named `portfolio`. Use **pages.dev** or **github.io/portfolio/**.

## Cloudflare Pages (primary host)

Connect this repo in **Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git**.

| Setting | Value |
|---------|--------|
| Production branch | `main` |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node.js version | `22` (from `.node-version`) |

### Environment variables (Production)

| Name | Value | Notes |
|------|--------|--------|
| `VITE_SITE_URL` | `https://sriramkancherla.pages.dev` | Build-time (canonical / OG URLs) |
| `WEB3FORMS_ACCESS_KEY` | Your Web3Forms key | **Runtime** secret for `/api/contact` — **no** `VITE_` prefix |

After changing env vars, trigger a **Retry deployment** in Cloudflare Pages.

> The contact form calls `/api/contact` (a Pages Function). That function reads `WEB3FORMS_ACCESS_KEY` at request time. If you previously set `VITE_WEB3FORMS_ACCESS_KEY`, replace it with `WEB3FORMS_ACCESS_KEY` and redeploy.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:8080](http://localhost:8080).

## Build

```bash
npm run build:pages
```

Output is written to `dist/`. SPA routing uses `public/_redirects`; security headers use `public/_headers`.

## Documents

Place source PDFs in `personal/` (gitignored). `npm run build` syncs them into `public/documents/` via `scripts/sync-documents.mjs`. Committed copies in `public/documents/` are used when `personal/` is absent (e.g. Cloudflare CI).
