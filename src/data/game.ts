/**
 * Shape of an entry in `games.generated.json`, produced by `scripts/fetch-games.mjs`.
 */
export interface Game {
  appId: string;
  title: string;
  /** Path relative to `/` (public root), e.g. "/games/com.example.mygame.png". */
  iconPath: string;
  /** Full Play Store URL. */
  url: string;
  genre: string | null;
  /** Human-readable installs, e.g. "10,000,000+". */
  installs: string | null;
  minInstalls: number | null;
  /** 0-5 float rating. */
  score: number | null;
  /** Total number of ratings. */
  ratings: number | null;
  summary: string | null;
  /** User overrides passed through from games.source.ts. */
  role: string | null;
  tags: string[];
  highlight: string | null;
  /** ISO timestamp of when the metadata was fetched. */
  fetchedAt: string;
}
