export type Locale = 'en' | 'pt';

export interface ExperienceEntry {
  period: string;
  role: string;
  company: string;
  companyUrl?: string;
  /** Staffing/consulting agency the role was placed through, if any (e.g. "via Stech Soluções"). */
  viaCompany?: string;
  viaCompanyUrl?: string;
  description: string;
  stack: string[];
}

export interface EducationEntry {
  period: string;
  institution: string;
  program: string;
}

export interface Certification {
  name: string;
  /** Year printed on the certificate. */
  year: string;
  /** Issuer logo under public/icons, when the issuer has one vendored. */
  icon?: string;
  /** Public link to the certificate itself; the entry is only clickable with it. */
  url?: string;
}

/**
 * A skill badge, which is a lighter credential than a certification: earned per
 * skill rather than by sitting an exam, and issued as artwork rather than as a
 * certificate. Both the art and the verification page always exist, so unlike
 * `Certification` neither field is optional.
 */
export interface SkillBadge {
  name: string;
  /** Year the badge was issued. */
  year: string;
  /** Badge artwork under public/badges. */
  art: string;
  /** Issuer's public verification page for this badge. */
  url: string;
}

export interface SkillGroup {
  label: string;
  items: string[];
}

export interface SiteContent {
  meta: {
    name: string;
    /** Header wordmark: the full name does not fit the row on a phone. */
    shortName: string;
    role: string;
    location: string;
    /** Browser tab title (also what the tab's hover tooltip shows). */
    pageTitle: string;
    /** Meta description, reused for Open Graph and JSON-LD. Keep under ~160 chars. */
    description: string;
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
    badges: string;
    contact: string;
  };
  experience: ExperienceEntry[];
  education: EducationEntry[];
  certifications: Certification[];
  badges: SkillBadge[];
  skills: SkillGroup[];
  contact: {
    intro: string;
    phoneLabel: string;
    /** Label of the copy-to-clipboard button next to the email address. */
    copy: string;
    /** Confirmation shown for a couple of seconds after a successful copy. */
    copied: string;
  };
  footer: {
    rights: string;
  };
  projects: {
    viewRepo: string;
    website: string;
    /** Card link into a project's case study page. */
    caseStudy: string;
    /** Back link at the top of a case study page. */
    back: string;
    /** Label above the link to the following case study. */
    nextCase: string;
  };
  /** The full-screen image viewer on a case study page. */
  viewer: {
    /** Hint over a screenshot, and the label of the control that opens it. */
    expand: string;
    close: string;
    zoomIn: string;
    zoomOut: string;
    /** Back to the whole image at its original size. */
    reset: string;
  };
}

export interface ProjectData {
  slug: string;
  name: string;
  githubUrl: string;
  homepage?: string;
  language?: string;
  /**
   * The three technologies the project is actually built on, in the words its
   * own docs use. Three because that is what the card can show without the row
   * wrapping, and because a longer list stops telling the reader anything.
   */
  stack: [string, string, string];
  stars: number;
  /** [from, to] hex colors for the card's accent gradient. */
  accent: [string, string];
  description: {
    en: string;
    pt: string;
  };
}

/** One labelled fact in a case study's header grid, e.g. "License" / "Apache-2.0". */
export interface CaseFact {
  label: string;
  value: string;
}

/**
 * One beat of a case study: a heading, a paragraph or two, and — where the code
 * says it better than the prose would — the demo that makes the point.
 */
export interface CaseSection {
  title: string;
  body: string[];
  /** Short scannable facts, for a section that is a list rather than an argument. */
  bullets?: string[];
  sample?: CaseSample;
  /** A screenshot of the running product, for the sections that describe a screen. */
  shot?: CaseShot;
}

/** A captioned code demo. */
export interface CaseSample {
  caption: string;
  code: string;
}

/**
 * A screenshot under public/cases. The intrinsic size is carried here because
 * the export is unoptimised and a plain <img> without one reflows the page as
 * it loads.
 */
export interface CaseShot {
  src: string;
  width: number;
  height: number;
  /** Describes the screen for a reader who cannot see it; also the caption. */
  caption: string;
}

/** A number or claim worth pulling out of the prose, e.g. "21" / "rule types". */
export interface CaseHighlight {
  value: string;
  label: string;
}

/** The whole case study for one locale. */
export interface CaseStudyContent {
  /** One line under the project name, positioning it. */
  tagline: string;
  facts: CaseFact[];
  highlights: CaseHighlight[];
  sections: CaseSection[];
}

/**
 * A long-form write-up for a project, rendered at /[locale]/projects/[slug].
 * Only projects with an entry here are linked from their card — the rest stay
 * as a card and a repo link, which is all their public detail supports.
 */
export interface CaseStudy {
  /** Matches ProjectData.slug. */
  slug: string;
  en: CaseStudyContent;
  pt: CaseStudyContent;
}
