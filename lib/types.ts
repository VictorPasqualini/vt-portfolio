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
  /**
   * Who issued it. Consecutive entries sharing one are drawn as a single group
   * under one logo, so the issuer is named once instead of opening every line.
   */
  issuer: string;
  /**
   * The credential without the issuer in front of it: "Data Governance
   * Fundamentals", not "Databricks Data Governance Fundamentals". The group
   * header already says Databricks, and the rail is too narrow to say it twice.
   * The exception is a name that is nothing without its issuer: "Databricks
   * Fundamentals" and "dbt Fundamentals" keep it, since "Fundamentals" alone
   * names no credential.
   */
  name: string;
  /** Year printed on the certificate. */
  year: string;
  /**
   * The mark under public/icons, which is the issuer's or the technology's
   * logo rather than the credential's own badge artwork: a badge is a seal
   * with its name written around the rim, and at the size these rows give it
   * the lettering is unreadable while the colours fight the rest of the rail.
   * Read off the first entry of a group, since the logo stands for the issuer.
   */
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

/**
 * A section's two-part header: the numbered eyebrow that indexes the page, and
 * the large heading that says what the block is actually about. Split because
 * the eyebrow has to stay one scannable word while the heading is a sentence.
 */
export interface SectionHeading {
  /** The word after the index, e.g. "Skills" in "03 / Skills". */
  label: string;
  /** The large heading under the eyebrow. */
  title: string;
}

export interface SiteContent {
  meta: {
    name: string;
    /** Header wordmark: the full name does not fit the row on a phone. */
    shortName: string;
    /** The hero sets the name as the largest thing on the page, over two lines. */
    firstName: string;
    lastName: string;
    role: string;
    location: string;
    /** Browser tab title (also what the tab's hover tooltip shows). */
    pageTitle: string;
    /** Meta description, reused for Open Graph and JSON-LD. Keep under ~160 chars. */
    description: string;
  };
  nav: {
    about: string;
    projects: string;
    skills: string;
    education: string;
    contact: string;
    resume: string;
  };
  hero: {
    /**
     * The one paragraph under the name: who he is and what he does. `**bold**`
     * spans are rendered in the foreground colour, so the technologies worth
     * catching in a glance can be picked out without splitting the sentence
     * into fields.
     */
    tagline: string;
  };
  /** Left-hand column of section 01, beside the experience list. */
  about: {
    /** The résumé summary, one string per paragraph. Supports `**bold**`. */
    body: string[];
    stackLabel: string;
    /** The handful of technologies worth naming up front, not the full Skills list. */
    stack: string[];
    /** Heading over the experience list in the right-hand column. */
    experienceLabel: string;
  };
  sections: {
    about: SectionHeading;
    projects: SectionHeading;
    skills: SectionHeading;
    education: SectionHeading;
    contact: SectionHeading;
    certifications: string;
    badges: string;
  };
  experience: ExperienceEntry[];
  education: EducationEntry[];
  certifications: Certification[];
  badges: SkillBadge[];
  skills: SkillGroup[];
  contact: {
    /** The large invitation, set at hero scale. One string per line. */
    headline: string[];
    /** The paragraph under the invitation: what there is to talk about. */
    intro: string;
    /** Caption under the clock in the aside, e.g. "local time". */
    localTime: string;
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
