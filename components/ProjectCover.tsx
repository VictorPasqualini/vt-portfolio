import { getSkillIcon } from '@/lib/skill-icons';
import type { ProjectData } from '@/lib/types';
import SkillMark from './SkillMark';

/**
 * One mark per distinct icon. "Apache Spark" and "PySpark" both resolve to the
 * Spark logo, and the same mark twice in a row on a cover reads as a mistake.
 */
function coverMarks(stack: readonly string[]): string[] {
  const seen = new Set<string>();
  return stack.filter((tech) => {
    const icon = getSkillIcon(tech);
    const key = icon.kind === 'img' ? icon.src : icon.name;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/**
 * The cover of a project card.
 *
 * Not a screenshot: two of these four projects are libraries with no screen to
 * photograph, and a set where half the cards have a picture and half have a
 * placeholder looks worse than a set with no pictures at all. So the cover is
 * built from what every project already has — the accent pair it was given in
 * `content/projects.ts` and the three tools it is written with — which makes
 * the four covers a family instead of four unrelated images.
 *
 * The marks are flattened to white silhouettes (`tone="invert"`) because brand
 * colours on a saturated gradient turn into noise; as shapes they still read
 * as Spark, Python, React at a glance. They head the band and the name closes
 * it, which is what lets the band be a strip: stacked together they would need
 * the height back.
 */
export default function ProjectCover({ project }: { project: ProjectData }) {
  return (
    <div
      className="relative h-24 shrink-0 overflow-hidden sm:h-32"
      style={{ background: `linear-gradient(135deg, ${project.accent[0]}, ${project.accent[1]})` }}
    >
      {/* A dot grid, at the density of a print screen: enough to keep a large
          flat gradient from looking like an empty div, quiet enough that the
          name stays the thing you read. */}
      <span
        aria-hidden
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)',
          backgroundSize: '14px 14px',
        }}
      />
      {/* Darkened towards the bottom so the name has something to sit on
          whichever two colours the gradient was given. */}
      <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

      {project.stars > 0 && (
        <span className="absolute right-4 top-4 rounded-full bg-black/25 px-2.5 py-1 font-mono text-[11px] text-white backdrop-blur-sm">
          ★ {project.stars}
        </span>
      )}

      <div className="absolute left-5 top-4 flex items-center gap-2.5">
        {coverMarks(project.stack).map((tech) => (
          <SkillMark
            key={tech}
            label={tech}
            tone="invert"
            className="h-5 w-5 opacity-90 transition-transform duration-300 group-hover:-translate-y-0.5"
          />
        ))}
      </div>

      <h3 className="absolute inset-x-5 bottom-3.5 truncate text-[clamp(1.25rem,2.8vw,1.625rem)] font-semibold leading-none tracking-[-0.035em] text-white">
        {project.name}
      </h3>
    </div>
  );
}
