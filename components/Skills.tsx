'use client';

import { useLocale } from '@/lib/i18n-context';
import { getSkillIcon, type InlineIconName } from '@/lib/skill-icons';
import { DatabaseIcon, ExternalLinkIcon, LayersIcon, PipelineIcon, SyncIcon, TagIcon } from '@/lib/icons';
import Section from './Section';

const INLINE_ICONS: Record<InlineIconName, (props: { className?: string }) => JSX.Element> = {
  database: DatabaseIcon,
  sync: SyncIcon,
  layers: LayersIcon,
  pipeline: PipelineIcon,
  tag: TagIcon,
};

function SkillGlyph({ name }: { name: InlineIconName }) {
  const Icon = INLINE_ICONS[name];
  return <Icon className="h-4 w-4 text-fg-3" />;
}

export default function Skills() {
  const { t } = useLocale();

  return (
    <Section id="skills" index="03" title={t.sections.skills} band>
      <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {t.skills.map((group) => (
          <div key={group.label}>
            <h3 className="mb-3 border-b border-line/10 pb-2 font-mono text-xs uppercase tracking-[0.14em] text-fg-3">
              {group.label}
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {group.items.map((item) => {
                const icon = getSkillIcon(item);
                return (
                  <span
                    key={item}
                    className="flex items-center gap-1.5 rounded-full border border-line/15 bg-bg px-2.5 py-1 text-xs text-fg-2"
                  >
                    {icon.kind === 'img' ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={icon.src} alt="" loading="lazy" className="h-4 w-4 object-contain" />
                    ) : (
                      <SkillGlyph name={icon.name} />
                    )}
                    {item}
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Skill badges live here rather than under Education: they are issued per
          skill, not by sitting an exam, so they read as evidence for the lists
          above. The art is what makes them worth showing, so it is given real
          size instead of being shrunk into a pill. */}
      {t.badges.length > 0 && (
        <div className="mt-12 border-t border-line/10 pt-8">
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
