import {
  DatabaseIcon,
  LayersIcon,
  NetworkIcon,
  PipelineIcon,
  StepsIcon,
  SyncIcon,
  TagIcon,
} from '@/lib/icons';
import { getSkillIcon, type InlineIconName } from '@/lib/skill-icons';

const INLINE_ICONS: Record<InlineIconName, (props: { className?: string }) => JSX.Element> = {
  database: DatabaseIcon,
  sync: SyncIcon,
  layers: LayersIcon,
  network: NetworkIcon,
  pipeline: PipelineIcon,
  steps: StepsIcon,
  tag: TagIcon,
};

/**
 * The mark for one tool, whichever kind it turns out to be: a vendored brand
 * SVG for anything with a logo, a hand-drawn glyph for the concepts that have
 * none. Both kinds are resolved in `lib/skill-icons.ts`, and this is the one
 * place that knows how to draw either, so the skills list and the project
 * covers can't drift apart.
 *
 * `tone="invert"` is for the covers, where the marks sit on a saturated
 * gradient: the brand files are flattened to white silhouettes rather than
 * shown in colours that would fight the background.
 */
export default function SkillMark({
  label,
  className = 'h-5 w-5',
  tone = 'default',
}: {
  label: string;
  className?: string;
  tone?: 'default' | 'invert';
}) {
  const icon = getSkillIcon(label);
  const invert = tone === 'invert';

  if (icon.kind === 'img') {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={icon.src}
        alt=""
        loading="lazy"
        className={`shrink-0 object-contain ${invert ? 'brightness-0 invert' : ''} ${className}`}
      />
    );
  }

  const Icon = INLINE_ICONS[icon.name];
  return <Icon className={`shrink-0 ${invert ? 'text-white' : 'text-fg-3'} ${className}`} />;
}
