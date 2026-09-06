export type Locale = 'en' | 'pt';

export interface ExperienceEntry {
  period: string;
  role: string;
  company: string;
  description: string;
  stack: string[];
}

export interface EducationEntry {
  period: string;
  institution: string;
  program: string;
}

export interface SkillGroup {
  label: string;
  items: string[];
}

export interface SiteContent {
  meta: {
    name: string;
    role: string;
    location: string;
  };
  nav: {
    experience: string;
    projects: string;
    skills: string;
    education: string;
    contact: string;
    resume: string;
  };
  hero: {
    greeting: string;
    summary: string;
  };
  sections: {
    experience: string;
    projects: string;
    skills: string;
    education: string;
    certifications: string;
    contact: string;
  };
  experience: ExperienceEntry[];
  education: EducationEntry[];
  certifications: string[];
  skills: SkillGroup[];
  contact: {
    intro: string;
    emailLabel: string;
    phoneLabel: string;
  };
  footer: {
    rights: string;
  };
  projects: {
    viewRepo: string;
    viewDemo: string;
    fewDetails: string;
  };
}

export interface ProjectData {
  slug: string;
  name: string;
  githubUrl: string;
  homepage?: string;
  language?: string;
  topics: string[];
  stars: number;
  description: {
    en: string;
    pt: string;
  };
}
