# FORGE website

The public one-page site for FORGE — a community of builders in Johannesburg.
Live at [forgecommunity.dev](https://forgecommunity.dev).

Next.js (App Router, TypeScript) statically exported, Tailwind 4, hosted on Vercel.

## Develop

```bash
npm ci
npm run dev      # http://localhost:3000
npm run build    # static export to ./out
npm run check    # everything CI runs (except Lighthouse)
```

## Brand assets

- `assets/brand/` — original logo files (do not edit)
- `public/brand/` — transparent silver (`#C8C4BC`) versions derived from the originals, used on the site
- `public/og.png`, `src/app/icon.png`, `src/app/apple-icon.png` — link preview and icons, generated from the logo by `npm run brand-assets` (re-run if the logo changes)
- `assets/photos/` — original photos (metadata stripped); `npm run images` (runs automatically before `dev`/`build`) sizes them into `public/photos/`, which is not committed

See [CONTRIBUTING.md](CONTRIBUTING.md) for the branch → PR → CI → deploy workflow.
