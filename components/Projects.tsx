'use client';

import { useLocale } from '@/lib/i18n-context';
import { projects } from '@/content/projects';
import ProjectCard from './ProjectCard';
import Section from './Section';

export default function Projects() {
  const { t } = useLocale();

  return (
    <Section id="projects" index="02" heading={t.sections.projects}>
      <div className="grid gap-5 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </Section>
  );
}
