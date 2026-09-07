'use client';

import { useLocale } from '@/lib/i18n-context';
import type { ProjectData } from '@/lib/types';

export default function ProjectCard({ project }: { project: ProjectData }) {
  const { locale, t } = useLocale();
  const badges = [project.language, ...project.topics].filter(Boolean) as string[];
  const thumbnail = project.githubUrl.replace('github.com/', 'opengraph.githubassets.com/1/');

  return (
    <article className="flex gap-4 overflow-hidden rounded-xl border border-line/10 p-4">
      <div
        className="w-1 shrink-0 self-stretch rounded-full"
        style={{ background: `linear-gradient(180deg, ${project.accent[0]}, ${project.accent[1]})` }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={thumbnail}
        alt=""
        loading="lazy"
        className="hidden aspect-square w-20 shrink-0 rounded-lg border border-line/10 bg-soft/5 object-cover sm:block"
      />
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-base font-medium">{project.name}</h3>
          {project.stars > 0 && <span className="shrink-0 text-xs text-fg/50">★ {project.stars}</span>}
        </div>
        <p className="line-clamp-2 text-sm leading-relaxed text-fg/70">{project.description[locale]}</p>
        {badges.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {badges.slice(0, 4).map((badge) => (
              <span key={badge} className="rounded-full bg-soft/10 px-2 py-0.5 text-xs text-fg/70">
                {badge}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-xs italic text-fg/40">{t.projects.fewDetails}</p>
        )}
        <div className="mt-auto flex gap-4 pt-1 text-sm">
          <a href={project.githubUrl} target="_blank" rel="noreferrer" className="text-accent hover:underline">
            {t.projects.viewRepo}
          </a>
          {project.homepage && (
            <a href={project.homepage} target="_blank" rel="noreferrer" className="text-accent hover:underline">
              {t.projects.website}
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
