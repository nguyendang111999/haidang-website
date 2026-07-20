/**
 * The ONLY file to edit when adding or removing a game.
 *
 * `appId` is the value of the `?id=` query param on the Play Store URL.
 * e.g. https://play.google.com/store/apps/details?id=com.example.mygame
 *                                                    ^^^^^^^^^^^^^^^^^^^
 * All other metadata (title, icon, installs, rating, genre, summary) is
 * fetched at build time by `scripts/fetch-games.mjs` and written to
 * `games.generated.json`.
 *
 * Optional per-game overrides:
 *   - role      : your role on the game, e.g. "Solo developer", "Gameplay & UI"
 *   - tags      : short labels, e.g. ["Puzzle", "Match-3"]
 *   - highlight : one-line note surfaced on hover, e.g. "Editor's Choice"
 */

export interface GameSource {
  appId: string;
  role?: string;
  tags?: string[];
  highlight?: string;
}

export const games: GameSource[] = [
  // TODO: replace these placeholders with your 8 Play Store app IDs.
  // Example:
  // { appId: "com.example.puzzle1", role: "Solo developer", tags: ["Puzzle"] },
];
