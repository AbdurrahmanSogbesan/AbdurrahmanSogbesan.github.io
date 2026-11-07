// Content model for the portfolio. Every piece of copy on the site lives in /content and is typed here.
// Components never hard-code copy; they import from these files.

export type CompanyKey = 'tempo' | 'codygo' | 'zerocomplex' | 'pramie';

export type LogoTile = 'light' | 'dark';

export interface Company {
  key: CompanyKey;
  name: string;
  url: string;
  /** Initial shown in the 18px logo chip until a real logo is supplied. */
  initial: string;
  /** Path under /public, e.g. '/logos/tempo.svg'. null = use the initial chip. */
  logo: string | null;
  /** Background tone baked into the logo file. Default 'light' (white tile); 'dark' tiles never get the chip border. */
  logoTile?: LogoTile;
  /** Hover card (desktop only). */
  card: {
    domain: string;
    blurb: string;
    /** Landing-page screenshot under /public, 16:10. null = placeholder tile. */
    screenshot: string | null;
  };
}

/** A paragraph is a list of plain strings and company references (rendered as CompanyLink). */
export type RichSegment = string | { company: CompanyKey };
export type RichParagraph = RichSegment[];

export type Platform = 'web' | 'mobile';

export interface Project {
  slug: string;
  name: string;
  /** Describes the product itself, not the author's role. Keep it at or under ~70 characters so it never truncates. */
  description: string;
  platforms: Platform[];
  year: string;
  /** Visual placeholder used until a screenshot exists. */
  preview: {
    frame: 'browser' | 'phones';
    /** Text shown in the mock browser address pill (browser frame only). */
    path?: string;
    /** Hue (0–360) for the tinted frame background. */
    hue: number;
    /** Skeleton layout inside the browser frame. */
    look?: 'chart' | 'list';
  };
  /** Real screenshot(s) under /public. Empty = render the skeleton preview. */
  screenshots: string[];
}

export interface ExperienceEntry {
  company: CompanyKey;
  role: string;
  dates: string;
  summary: string;
}

export type IconRef =
  | { set: 'simple-icons'; slug: string }
  | { set: 'devicon'; name: string }
  | { set: 'custom'; name: 'cicd' };

export interface ToolRow {
  label: string;
  items: { name: string; icon: IconRef }[];
}
