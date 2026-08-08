# haidang.space

Personal portfolio for Hai Dang — Unity mobile game developer.

Static site built with Astro 5 + Tailwind CSS v4. Auto-fetches Google Play
metadata (title, icon, rating, installs, genre) at build time using
`google-play-scraper`, so adding a new game is a one-line change.

## Quick start

```bash
npm install
npm run dev            # http://localhost:4321
```

## Adding a game

1. Edit `src/data/games.source.ts` — append the app's Play Store ID:
   ```ts
   { appId: "com.example.mygame", role: "Solo developer", tags: ["Puzzle"] }
   ```
2. Refresh generated data & icons:
   ```bash
   npm run games:fetch
   ```
3. Commit the updated `src/data/games.generated.json` and the new icon in
   `public/games/`.

## Editing content

- `src/data/profile.ts` — name, title, tagline, bio, quick-facts
- `src/data/contact.ts` — email, LinkedIn, GitHub, itch.io (empty = hidden)
- `src/components/PersonalInfo.astro` — skill groups

## Deployment

Push to `main` → GitHub Actions builds the site and publishes `dist/` to
GitHub Pages, served at the custom domain `haidang.space`.

The custom domain is set via `public/CNAME` (copied into `dist/` on build)
and confirmed in **Settings → Pages → Custom domain**. DNS for the domain
is managed in Hostinger's DNS Zone Editor (registrar only — hosting has
moved off Hostinger):

| Type | Name | Content                        |
| ---- | ---- | ------------------------------- |
| A    | @    | `185.199.108.153`               |
| A    | @    | `185.199.109.153`               |
| A    | @    | `185.199.110.153`                |
| A    | @    | `185.199.111.153`                |
| CNAME | www | `nguyendang111999.github.io`   |

A weekly workflow (`.github/workflows/refresh-games.yml`) opens a PR
refreshing install counts and ratings automatically.

## Scripts

| Script              | What it does                                  |
| ------------------- | --------------------------------------------- |
| `npm run dev`       | Start dev server on http://localhost:4321     |
| `npm run build`     | Build production site into `dist/`            |
| `npm run preview`   | Preview the production build locally          |
| `npm run games:fetch` | Refresh Play Store metadata + icons        |
