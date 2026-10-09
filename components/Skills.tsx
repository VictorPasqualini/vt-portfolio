'use client';

import { useLocale } from '@/lib/i18n-context';
import { ChevronDownIcon, ExternalLinkIcon } from '@/lib/icons';
import type { SkillBadge } from '@/lib/types';
import Section from './Section';
import SkillMark from './SkillMark';

/**
 * The skill badges folded into one card per issuer.
 *
 * They were a grid of one card per badge, which was fine at eight and stopped
 * being fine at fifteen: seven of the new ones are AWS course completions that
 * share one tile, so the section turned into a wall of the same artwork, and
 * every badge added made it a row taller. One card per issuer keeps the grid as
 * long as the list of issuers, which grows far more slowly than the list of
 * badges, and the stacked art still shows at a glance what kind of badges they
 * are. The individual badges are a click away, inside the card.
 *
 * Only consecutive entries fold, as with the certifications in About.tsx, so
 * the content files stay in charge of the order.
 */
interface BadgeGroup {
  issuer: string;
  items: SkillBadge[];
}

function groupByIssuer(badges: SkillBadge[]): BadgeGroup[] {
  const groups: BadgeGroup[] = [];

  for (const badge of badges) {
    const open = groups.at(-1);
    if (open?.issuer === badge.issuer) open.items.push(badge);
    else groups.push({ issuer: badge.issuer, items: [badge] });
  }

  return groups;
}

/** "2026", or "2025–2026" when the badges span more than one year. */
function yearSpan(items: SkillBadge[]): string {
  const years = items.map((badge) => badge.year).sort();
  const first = years[0];
  const last = years[years.length - 1];
  return first === last ? first : `${first}–${last}`;
}

/** Most badges any stack draws; past this the overlap hides too much of each. */
const STACK_MAX = 4;

const CARD = 'rounded-card border border-line/15 bg-bg p-5 transition-colors hover:border-fg/40';

/**
 * The issuer's artwork, overlapped like a hand of cards, newest on top. An
 * issuer that gives every badge the same art (the AWS courses share one tile)
 * draws it once rather than as a pile of identical copies. The stack fans out
 * a little on hover, which is the hint that there is more inside.
 *
 * On a phone the card is a row, so the stack takes the width of a full one
 * whatever it holds, and the titles beside it line up down the column. The fan
 * is left out there: it would push into the title, and there is no hover.
 */
function ArtStack({ arts }: { arts: string[] }) {
  return (
    <span className="flex h-12 w-[7.5rem] shrink-0 items-center sm:w-auto">
      {arts.slice(0, STACK_MAX).map((art, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={art}
          src={art}
          alt=""
          loading="lazy"
          style={{ zIndex: STACK_MAX - i }}
          className="relative h-12 w-12 shrink-0 object-contain transition-[margin] duration-300 [&:not(:first-child)]:-ml-6 sm:group-hover:[&:not(:first-child)]:-ml-4 motion-reduce:transition-none"
        />
      ))}
    </span>
  );
}

/**
 * What a card shows closed, whichever kind it is: the art, a title, a line of
 * metadata, and a mark in the corner saying what a click does. A row on a
 * phone, where four cards stacked in one column would otherwise take more than
 * a screen, and a column from sm up, where the cards sit side by side and the
 * art can lead.
 */
function CardHead({
  arts,
  title,
  meta,
  mark,
}: {
  arts: string[];
  title: string;
  meta: string;
  mark: React.ReactNode;
}) {
  return (
    <span className="relative flex items-center gap-4 pr-8 sm:flex-col sm:items-start sm:pr-0">
      <ArtStack arts={arts} />
      <span className="flex min-w-0 flex-col gap-1">
        <span className="text-sm font-medium leading-snug">{title}</span>
        <span className="font-mono text-[11px] text-fg-3">{meta}</span>
      </span>
      {/* Centred on the row on a phone, level with the art from sm up. */}
      <span className="absolute right-0 top-1/2 -translate-y-1/2 text-fg-3 transition-colors group-hover:text-fg sm:top-4 sm:translate-y-0">
        {mark}
      </span>
    </span>
  );
}

/**
 * A card that folds several badges. A native disclosure, so it opens without
 * script and the expanded state is announced for free; it grows in place
 * rather than opening a panel elsewhere, which keeps the grid from reflowing
 * under the pointer.
 */
function BadgeGroupCard({ group, count }: { group: BadgeGroup; count: string }) {
  const arts = Array.from(new Set(group.items.map((badge) => badge.art)));
  // Per-row art and years only say something when they differ: the AWS rows
  // would be seven copies of the tile already shown above them, and a year
  // the summary already gives would only take width from the names, which
  // are what wrap in a card a quarter of the column wide.
  const showRowArt = arts.length > 1;
  const showRowYear = new Set(group.items.map((badge) => badge.year)).size > 1;

  return (
    <details className={`group ${CARD} open:border-fg/25`}>
      <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
        <CardHead
          arts={arts}
          title={group.issuer}
          meta={`${count.replace('{n}', String(group.items.length))} · ${yearSpan(group.items)}`}
          mark={<ChevronDownIcon className="h-4 w-4 transition-transform group-open:rotate-180" />}
        />
      </summary>

      <ul className="mt-4 flex flex-col gap-1 border-t border-line/10 pt-3">
        {group.items.map((badge) => (
          <li key={badge.name}>
            <a
              href={badge.url}
              target="_blank"
              rel="noreferrer"
              className="group/row -mx-2 flex items-center gap-3 rounded-card px-2 py-1.5 transition-colors hover:bg-surface"
            >
              {showRowArt && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={badge.art} alt="" loading="lazy" className="h-8 w-8 shrink-0 object-contain" />
              )}
              <span className="min-w-0 flex-1 text-[13px] leading-snug text-fg-2 transition-colors group-hover/row:text-fg">
                {badge.name}
              </span>
              <span className="flex shrink-0 items-center gap-1.5 font-mono text-[11px] text-fg-3">
                {showRowYear && badge.year}
                <ExternalLinkIcon className="h-3 w-3 transition-colors group-hover/row:text-fg" />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}

/**
 * An issuer with one badge has nothing to fold, so its card is that badge: the
 * same shape as the folding cards, but a link straight to the badge, named for
 * the badge with the issuer under it.
 */
function SingleBadgeCard({ badge }: { badge: SkillBadge }) {
  return (
    <a href={badge.url} target="_blank" rel="noreferrer" className={`group block ${CARD}`}>
      <CardHead
        arts={[badge.art]}
        title={badge.name}
        meta={`${badge.issuer} · ${badge.year}`}
        mark={<ExternalLinkIcon className="h-3.5 w-3.5" />}
      />
    </a>
  );
}

/**
 * Section 03: the inventory, read as a document rather than as a bag of pills.
 *
 * One row per group, hairline-separated, with the group name in a left gutter
 * and the tools themselves as plain text beside their marks. It is the same
 * shape the job history and the education list already use, so the three
 * sections stop looking like three different websites. Dropping the pill
 * border is what lets the logos carry the block: they line up in a column of
 * their own instead of each one sitting in its own little box.
 */
export default function Skills() {
  const { t } = useLocale();

  return (
    <Section id="skills" index="03" heading={t.sections.skills} band>
      <ul className="divide-y divide-line/10 border-y border-line/10">
        {t.skills.map((group) => (
          <li key={group.label} className="grid gap-x-10 gap-y-3 py-6 sm:grid-cols-[11rem_1fr]">
            <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-fg-3 sm:pt-0.5">{group.label}</h3>
            {/* gap-x is wide enough that the names read as a list and not as a
                run-on sentence, which is the one thing the pill border was
                doing that the border itself was not needed for. */}
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {group.items.map((item) => (
                <span key={item} className="flex items-center gap-2 text-sm text-fg-2">
                  <SkillMark label={item} />
                  {item}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>

      {/* Skill badges live here rather than under Education: they are issued per
          skill, not by sitting an exam, so they read as evidence for the lists
          above. */}
      {t.badges.length > 0 && (
        <div className="mt-14">
          <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.14em] text-fg-3">{t.sections.badges}</h3>
          {/* items-start, so opening one card does not stretch the rest of its
              row to the same height. */}
          <div className="grid items-start gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {groupByIssuer(t.badges).map((group) =>
              group.items.length === 1 ? (
                <SingleBadgeCard key={group.issuer} badge={group.items[0]} />
              ) : (
                <BadgeGroupCard key={group.issuer} group={group} count={t.badgeStack.count} />
              ),
            )}
          </div>
        </div>
      )}
    </Section>
  );
}
