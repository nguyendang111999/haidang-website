// @ts-check
/**
 * Build-time Play Store metadata fetcher.
 *
 * Reads `src/data/games.source.ts` (via `tsx`), calls google-play-scraper for each
 * appId, downloads each icon into `public/games/<appId>.png`, and writes a
 * normalized `src/data/games.generated.json`.
 *
 * Run manually with:  npm run games:fetch
 *
 * Design goals:
 *   - Deterministic: commits generated JSON + icons so builds work offline.
 *   - Graceful: on any network failure, keeps the previous JSON and exits 0 so
 *     `npm run build` never fails because of scraping.
 *   - Polite: throttles requests and uses a real-looking User-Agent.
 */

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import gplay from "google-play-scraper";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const SOURCE_FILE = resolve(ROOT, "src/data/games.source.ts");
const OUT_FILE = resolve(ROOT, "src/data/games.generated.json");
const ICONS_DIR = resolve(ROOT, "public/games");

// google-play-scraper works in both `default` and namespace ESM shapes.
const gp = /** @type {any} */ (/** @type {any} */ (gplay).default ?? gplay);

/**
 * Rewrite a Play Store icon URL to request a specific pixel width from the CDN.
 * These URLs use the `googleusercontent.com` size directive `=wN`.
 * @param {string} url
 * @param {number} [width]
 */
function withIconSize(url, width = 512) {
  if (!url) return url;
  // Common patterns: "...=w480-h480" or "...=s512-rw"
  return url
    .replace(/=w\d+(-h\d+)?(-[a-z0-9]+)*$/i, `=w${width}`)
    .replace(/=s\d+(-[a-z0-9]+)*$/i, `=w${width}`);
}

/**
 * @param {string} url
 * @param {string} appId
 * @returns {Promise<string>} public-relative icon path
 */
async function downloadIcon(url, appId) {
  await mkdir(ICONS_DIR, { recursive: true });
  const dest = resolve(ICONS_DIR, `${appId}.png`);
  const sized = withIconSize(url, 512);
  const res = await fetch(sized, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (compatible; haidang-website-build/1.0; +https://haidang.space)",
    },
  });
  if (!res.ok) {
    throw new Error(`Icon download failed for ${appId}: HTTP ${res.status}`);
  }
  const buf = new Uint8Array(await res.arrayBuffer());
  await writeFile(dest, buf);
  return `/games/${appId}.png`;
}

/**
 * Load `games.source.ts` at runtime. Uses a dynamic import; when executed via
 * `tsx`, the .ts file is compiled on the fly.
 */
async function loadSource() {
  const mod = await import(pathToFileURL(SOURCE_FILE).href);
  const list = mod.games;
  if (!Array.isArray(list)) {
    throw new Error("games.source.ts must export `games` as an array.");
  }
  return list;
}

async function loadPrevious() {
  try {
    const raw = await readFile(OUT_FILE, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function main() {
  const source = await loadSource();
  const previous = await loadPrevious();
  const previousByAppId = new Map(previous.map((g) => [g.appId, g]));

  if (source.length === 0) {
    console.log("[games:fetch] No entries in games.source.ts — nothing to do.");
    if (!existsSync(OUT_FILE)) {
      await writeFile(OUT_FILE, "[]\n", "utf8");
    }
    return;
  }

  console.log(`[games:fetch] Fetching metadata for ${source.length} game(s)...`);
  const results = [];
  let failures = 0;

  for (const entry of source) {
    const { appId, role, tags, highlight } = entry;
    try {
      const data = await gp.app({ appId, throttle: 2 });
      const iconPath = await downloadIcon(data.icon, appId);
      const game = {
        appId,
        title: data.title,
        iconPath,
        url: data.url,
        genre: data.genre ?? null,
        installs: data.installs ?? null,
        minInstalls: typeof data.minInstalls === "number" ? data.minInstalls : null,
        score: typeof data.score === "number" ? data.score : null,
        ratings: typeof data.ratings === "number" ? data.ratings : null,
        summary: data.summary ?? null,
        role: role ?? null,
        tags: Array.isArray(tags) ? tags : [],
        highlight: highlight ?? null,
        fetchedAt: new Date().toISOString(),
      };
      results.push(game);
      console.log(`  ✓ ${appId} — ${data.title}`);
    } catch (err) {
      failures++;
      const prev = previousByAppId.get(appId);
      if (prev) {
        // Reuse previous entry so the site still builds with cached data.
        results.push({ ...prev, role: role ?? null, tags: tags ?? [], highlight: highlight ?? null });
        console.warn(
          `  ! ${appId} — fetch failed (${err instanceof Error ? err.message : String(err)}). Keeping previous entry.`,
        );
      } else {
        console.warn(
          `  ✗ ${appId} — fetch failed (${err instanceof Error ? err.message : String(err)}). No previous entry; skipping.`,
        );
      }
    }
  }

  if (results.length === 0 && failures > 0) {
    console.warn(
      "[games:fetch] All fetches failed and no previous data available. Leaving existing JSON untouched.",
    );
    return;
  }

  await writeFile(OUT_FILE, JSON.stringify(results, null, 2) + "\n", "utf8");
  console.log(
    `[games:fetch] Wrote ${results.length} game(s) to ${OUT_FILE} (${failures} failure(s)).`,
  );
}

main().catch((err) => {
  // Never fail the build. Log and exit 0 so `npm run build` still works.
  console.error("[games:fetch] Unexpected error:", err);
  process.exit(0);
});
