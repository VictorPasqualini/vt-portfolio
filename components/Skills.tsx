'use client';

import { useLocale } from '@/lib/i18n-context';
import { getSkillIcon, type InlineIconName } from '@/lib/skill-icons';
import {
  AwsIcon,
  ChartIcon,
  CodeIcon,
  DatabaseIcon,
  InfraIcon,
  LayersIcon,
  PipelineIcon,
  ScheduleIcon,
  SyncIcon,
  TagIcon,
} from '@/lib/icons';

const INLINE_ICONS: Record<InlineIconName, (props: { className?: string }) => JSX.Element> = {
  aws: AwsIcon,
  database: DatabaseIcon,
  code: CodeIcon,
  sync: SyncIcon,
  layers: LayersIcon,
  schedule: ScheduleIcon,
  pipeline: PipelineIcon,
  chart: ChartIcon,
  infra: InfraIcon,
  tag: TagIcon,
};

function SkillGlyph({ name }: { name: InlineIconName }) {
  const Icon = INLINE_ICONS[name];
  return <Icon className="h-3.5 w-3.5 text-fg/40" />;
}

export default function Skills() {
  const { t } = useLocale();

  return (
    <section id="skills" className="py-16">
      <h2 className="mb-8 text-xl font-semibold tracking-tight">{t.sections.skills}</h2>
      <div className="grid gap-6 sm:grid-cols-2">
        {t.skills.map((group) => (
          <div key={group.label}>
            <h3 className="mb-2 text-sm font-medium text-fg/50">{group.label}</h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => {
                const icon = getSkillIcon(item);
                return (
                  <span
                    key={item}
                    className="flex items-center gap-1.5 rounded-full bg-soft/10 px-2.5 py-1 text-xs text-fg/70"
                  >
                    {icon.kind === 'brand' ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={`https://cdn.simpleicons.org/${icon.slug}`}
                        alt=""
                        loading="lazy"
                        className="h-3.5 w-3.5"
                      />
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
    </section>
  );
}
