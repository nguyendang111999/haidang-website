/**
 * Contact links displayed in the Contact subsection.
 * Any entry with an empty string is hidden — no broken buttons.
 */

export const contact = {
  email: "haidang.gamedev@gmail.com", // e.g."hai@haidang.space"
  facebook: "https://www.facebook.com/the.kingdom.752/", // e.g. "https://www.facebook.com/haidang"
  linkedin: "https://www.linkedin.com/in/dang-nguyen-94279a268", // e.g. "https://www.linkedin.com/in/haidang"
  github: "https://github.com/nguyendang111999", // e.g. "https://github.com/haidang"
  itchio: "", // e.g. "https://haidang.itch.io"
} as const;

export type ContactKey = keyof typeof contact;
