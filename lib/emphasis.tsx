import { Fragment } from 'react';

/** Splits on `**bold**`, keeping the delimiters so the odd chunks are the spans. */
const BOLD = /\*\*([^*]+)\*\*/g;

/**
 * Renders the one piece of markup the copy is allowed to carry: `**bold**`,
 * which comes out in the foreground colour against the muted text around it.
 *
 * The hero tagline and the about paragraphs are long sentences whose point is
 * carried by a handful of words — the technologies, the current role. Marking
 * them inline keeps the sentence a sentence in `content/`, where it is written
 * and translated, instead of breaking it into lead/highlight/tail fields that
 * only reassemble correctly in one language.
 */
export function withEmphasis(text: string) {
  return text.split(BOLD).map((chunk, index) =>
    index % 2 === 1 ? (
      <strong key={index} className="font-medium text-fg">
        {chunk}
      </strong>
    ) : (
      <Fragment key={index}>{chunk}</Fragment>
    ),
  );
}
