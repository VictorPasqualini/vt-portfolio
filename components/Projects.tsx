'use client';

import { useLocale } from '@/lib/i18n-context';
import { projects } from '@/content/projects';
import ProjectCard from './ProjectCard';

export default function Projects() {
  const { t } = useLocale();

  return (
    <section id="projects" className="py-16">
      <h2 className="mb-8 text-xl font-semibold tracking-tight">{t.sections.projects}</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
