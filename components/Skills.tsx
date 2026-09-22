'use client';

import { useLocale } from '@/lib/i18n-context';
import { ExternalLinkIcon } from '@/lib/icons';
import Section from './Section';
import SkillMark from './SkillMark';

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
          above. The art is what makes them worth showing, so it is given real
          size instead of being shrunk into a pill. */}
      {t.badges.length > 0 && (
        <div className="mt-14">
          <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.14em] text-fg-3">{t.sections.badges}</h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {t.badges.map((badge) => (
              <a
                key={badge.name}
                href={badge.url}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-4 rounded-card border border-line/15 bg-bg p-4 transition-colors hover:border-fg/40"
              >
                {/* The art carries its own shape on transparency, so it is left
                    unclipped rather than masked into the card's radius. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={badge.art} alt="" loading="lazy" className="h-14 w-14 shrink-0 object-contain" />
                <span className="flex min-w-0 flex-col gap-1">
                  <span className="text-sm font-medium leading-snug">{badge.name}</span>
                  <span className="flex items-center gap-1.5 font-mono text-[11px] text-fg-3">
                    {badge.year}
                    <ExternalLinkIcon className="h-3 w-3 transition-colors group-hover:text-fg" />
                  </span>
                </span>
              </a>
            ))}
          </div>
        </div>
      )}
    </Section>
  );
}
