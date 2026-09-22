import type { SectionHeading } from '@/lib/types';

/**
 * Shell every content section is built on: a full-bleed band with a hairline at
 * its top edge, its own centred column, and a two-part header.
 *
 * The header is an index and a heading, not one line doing both jobs. The
 * eyebrow — `01 / About`, set in mono and tinted with the accent — is what
 * turns five stacked blocks into one document, and it stays one scannable word
 * wide. Under it the heading is allowed to be a sentence and is set large
 * enough to be the thing the eye lands on.
 *
 * Sections own their column rather than sitting inside a shared one so that
 * `band` can tint the full width of the viewport.
 */
export default function Section({
  id,
  index,
  heading,
  band = false,
  aside,
  footer,
  children,
}: {
  id: string;
  /** Two-digit position in the page, e.g. "01". Decorative, hence aria-hidden. */
  index: string;
  heading: SectionHeading;
  /** Tints the band with --surface, to break up a long run of plain sections. */
  band?: boolean;
  /** Optional control parked at the baseline of the heading, on the right. */
  aside?: React.ReactNode;
  /** Rendered against the bottom edge of the band, outside the centred column. */
  footer?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    // One screen tall at least, so that an anchor jump puts this section alone
    // on the display: a shorter block would leave the tail of the previous one
    // above it, which is exactly what the jump is meant to get rid of. Content
    // is centred in whatever is left over rather than sitting against the top,
    // so a short section reads as a spread instead of as a half-empty band.
    <section
      id={id}
      className={`flex min-h-[calc(100svh-var(--header-h))] flex-col border-t border-line/10 ${band ? 'bg-surface' : ''}`}
    >
      {/* Tighter when a footer shares the band: the section is one screen tall
          and the footer is inside it, so the usual padding would push the small
          print below the fold, which is the one place it must not be. */}
      <div
        className={`mx-auto flex w-full max-w-content flex-1 flex-col justify-center px-6 ${
          footer ? 'py-14 sm:py-16' : 'py-20 sm:py-28'
        }`}
      >
        <header className="mb-10 sm:mb-14">
          {/* A short rule, not one that runs to the edge: it closes the eyebrow
              off rather than underlining the whole header. */}
          <div className="mb-5 flex items-center gap-3">
            <span
              aria-hidden
              className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-accent"
            >
              {index} / {heading.label}
            </span>
            <span aria-hidden className="h-px w-14 bg-line/20" />
          </div>
          <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
            <h2 className="max-w-2xl text-[clamp(1.75rem,4vw,3rem)] font-medium leading-[1.05] tracking-[-0.035em]">
              {heading.title}
            </h2>
            {aside}
          </div>
        </header>
        {children}
      </div>
      {footer}
    </section>
  );
}
