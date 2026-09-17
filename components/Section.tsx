/**
 * Shell every content section is built on: a full-bleed band with a hairline at
 * its top edge, its own centred column, and a numbered header.
 *
 * The index is what turns five stacked blocks into one document — it is set in
 * mono and tinted with the accent, which is the only place the accent appears
 * outside the hero. Sections own the column rather than sitting inside a shared
 * one so that `band` can tint the full width of the viewport.
 */
export default function Section({
  id,
  index,
  title,
  band = false,
  children,
}: {
  id: string;
  /** Two-digit position in the page, e.g. "01". Decorative, hence aria-hidden. */
  index: string;
  title: string;
  /** Tints the band with --surface, to break up a long run of plain sections. */
  band?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={`border-t border-line/10 ${band ? 'bg-surface' : ''}`}>
      <div className="mx-auto max-w-content px-6 py-16 sm:py-20">
        <header className="mb-10 flex items-baseline gap-4">
          <span aria-hidden className="font-mono text-xs tracking-[0.18em] text-accent">
            {index}
          </span>
          <h2 className="text-[clamp(1.5rem,3vw,2.125rem)] font-medium leading-none tracking-[-0.03em]">{title}</h2>
          <span aria-hidden className="h-px flex-1 bg-line/10" />
        </header>
        {children}
      </div>
    </section>
  );
}
