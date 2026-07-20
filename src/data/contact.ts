/**
 * Contact links displayed in the Contact subsection.
 * Any entry with an empty string is hidden — no broken buttons.
 */

export const contact = {
  email: "", // e.g. "hai@haidang.space"
  linkedin: "", // e.g. "https://www.linkedin.com/in/haidang"
  github: "", // e.g. "https://github.com/haidang"
  itchio: "", // e.g. "https://haidang.itch.io"
} as const;

export type ContactKey = keyof typeof contact;
