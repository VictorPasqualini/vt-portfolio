'use client';

import { useLocale } from '@/lib/i18n-context';
import type { ProjectData } from '@/lib/types';

export default function ProjectCard({ project }: { project: ProjectData }) {
  const { locale, t } = useLocale();
  const badges = [project.language, ...project.topics].filter(Boolean) as string[];

  return (
    <article className="flex flex-col gap-3 rounded-xl border border-black/10 p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-medium">{project.name}</h3>
        {project.stars > 0 && <span className="text-xs text-black/50">★ {project.stars}</span>}
      </div>
      <p className="text-sm leading-relaxed text-black/70">{project.description[locale]}</p>
      {badges.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {badges.slice(0, 6).map((badge) => (
            <span key={badge} className="rounded-full bg-black/5 px-2.5 py-1 text-xs text-black/70">
              {badge}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-xs italic text-black/40">{t.projects.fewDetails}</p>
      )}
      <div className="mt-auto flex gap-4 pt-2 text-sm">
        <a href={project.githubUrl} target="_blank" rel="noreferrer" className="text-accent hover:underline">
          {t.projects.viewRepo}
        </a>
        {project.homepage && (
          <a href={project.homepage} target="_blank" rel="noreferrer" className="text-accent hover:underline">
            {t.projects.viewDemo}
          </a>
        )}
      </div>
    </article>
  );
}
