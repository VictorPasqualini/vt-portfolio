'use client';

import { useLocale } from '@/lib/i18n-context';
import { projects } from '@/content/projects';
import ProjectCard from './ProjectCard';

export default function Projects() {
  const { t } = useLocale();

  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-16">
      <h2 className="mb-8 text-xl font-semibold tracking-tight">{t.sections.projects}</h2>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
