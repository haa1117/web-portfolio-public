import projectsJson from "@/data/projects.json";

export type GroupId = "apps" | "games" | "ai" | "biz" | "web";
export type Status = "store" | "live" | "build" | "unreleased";

export type Img = { src: string; w: number; h: number };

export type Project = {
  id: string;
  name: string;
  group: GroupId;
  status: Status;
  caveat: string | null;
  tagline: string;
  summary: string;
  platforms: string[];
  stack: string[];
  features: string[];
  highlights: string[];
  flagship: boolean;
  relation?: string | null;
  links: { github?: string; play?: string; appStore?: string; live?: string };
  media: { icon: string | null; hero: Img | null; shots: Img[] };
};

export const projects = projectsJson.projects as Project[];
export const groupLabel = projectsJson.groups as Record<GroupId, string>;

/** The four case-study projects, in display order. */
export const flagships = projects.filter((p) => p.flagship);
/** Everything else, shown in the filterable library. */
export const library = projects.filter((p) => !p.flagship);

export const groupOrder: GroupId[] = ["apps", "games", "ai", "biz", "web"];

export const statusLabel: Record<Status, string> = {
  store: "On Google Play",
  live: "Live",
  build: "Portfolio build",
  unreleased: "Unreleased",
};

export const stats = {
  projects: projects.length,
  github: projects.filter((p) => p.links.github).length,
  play: projects.filter((p) => p.links.play).length,
  live: projects.filter((p) => p.links.live).length,
  platforms: 4,
  /** futurewatch.co, fwglobal.co, getkalendra.com and hiktextiles.com */
  websites: 4,
};
