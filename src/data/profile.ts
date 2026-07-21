/**
 * Personal information used across the site.
 * Edit these values as you flesh out the content.
 * Anything left as an empty string / null renders as a placeholder or is hidden.
 */

export const profile = {
  name: "Hai Dang",
  title: "Unity Mobile Game Developer",
  focus: "Puzzle & Hyper-Casual",
  location: "", // e.g. "Ho Chi Minh City, Vietnam"
  availability: "Open to opportunities",

  /**
   * Path to your profile photo relative to `src/`.
   * e.g. "../assets/avatar.png" — put the file in src/assets/
   * Leave as empty string to show the initials placeholder.
   */
  avatar: "/IMG_0940-removebg.png", // e.g. "/profile.jpg" (place the file in public/) or use Astro image import

  /** One-line tagline shown under the hero heading. */
  tagline: "Shipping puzzle & hyper-casual games on Google Play — prototype fast, ship faster.",

  /** 2–3 short paragraphs used in the Bio subsection. */
  bio: [
    "I build mobile games in Unity with a focus on tight, satisfying gameplay loops. Over the last few years I've shipped 8 titles on Google Play across the puzzle and hyper-casual genres.",
    "I care about the whole shipping pipeline: rapid prototyping, feel, monetization stacks, live-ops iteration, and the analytics that make it all measurable. I'm comfortable owning a game from grey-box prototype to live production.",
    "Currently looking for opportunities with hyper-casual publishers and mobile studios where I can keep shipping games and learning from data.",
  ],

  /** Years of Unity experience shown in the quick-facts row. Set to 0 to hide. */
  yearsOnUnity: 0,
} as const;
