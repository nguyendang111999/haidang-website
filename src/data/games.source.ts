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
  { appId: "ttg.woodscrew.puzzle.wood.nuts.bolts", role: "Unity Developer", tags: ["Puzzle"] },
  { appId: "com.no1.blockgemm.puzzle", role: "Unity developer", tags: ["Puzzle"] },
  { appId: "com.number.screw.jam.nuts.bolts.master.puzzle", role: "Unity Developer", tags: ["Puzzle"] },
  { appId: "com.relaxing.puzzle.color.dot.connect.em.all", role: "Unity developer", tags: ["Puzzle"] },
  { appId: "com.fc.p.tt.knit.craze.color.puzzle", role: "Unity developer", tags: ["Puzzle"] },
  { appId: "ttg.rescue.save.princess.dragon.out.puzzle", role: "Unity developer", tags: ["Puzzle"] },
  { appId: "lumi.fuit.pop.blast.cube.color.puzzle", role: "Support Unity developer", tags: ["Puzzle"] },
  { appId: "lumi.untape.away.jam.logic.game3d.puzzle", role: "Support Unity developer", tags: ["Puzzle"] },
];
