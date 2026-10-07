/**
 * Single source of truth for the portfolio's identity.
 * Edit the values here — every section reads from this file.
 */
export const site = {
  name: "Hassan Ali Alvi",
  initials: "HA",
  role: "Full-Stack Software Developer",
  roles: [
    "Full-Stack Developer",
    "Mobile & TV App Developer",
    "AI & Data Applications",
    "Business Systems Builder",
  ],
  tagline:
    "Products engineered end to end across mobile, TV, web, AI/data and business systems — from Google Play apps to live web platforms and full-stack software.",
  bio: [
    "Hassan Ali Alvi is a software developer building full-stack web, mobile, Android TV, AI-enabled and custom business applications.",
    "The portfolio spans Flutter apps with public Google Play listings, Android TV experiences, full-stack web platforms, AI and data tools, and business systems such as ledgers, dashboards and ticketing.",
  ],
  email: "hassan@futurewatch.co",
  sites: {
    futurewatch: "https://futurewatch.co",
    fwglobal: "https://fwglobal.co",
    hik: "https://hiktextiles.com",
    kalendra: "https://getkalendra.com",
  },
  social: {
    github: "https://github.com/haa1117",
    linkedin: "https://www.linkedin.com/in/hassan-alvi-ba398111b",
  },
} as const;

export const nav = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "featured", label: "Featured" },
  { id: "services", label: "Services" },
  { id: "projects", label: "Projects" },
  { id: "websites", label: "Websites" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
] as const;
