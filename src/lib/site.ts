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
    "Data Science graduate and software developer building mobile, Android TV, full-stack web, AI/ML and business applications — from Google Play apps to live web platforms.",
  bio: [
    "Hassan Ali Alvi is a Data Science graduate (BS, GIKI) and software developer who builds full-stack web platforms, mobile and Android TV apps, AI-enabled tools, SaaS products and custom business software for clients and for the Google Play store.",
    "Currently at Future Watch, the work centres on Android applications: Google Play Billing, AdMob, Firebase Authentication, Firestore real-time sync and automated releases. Earlier work covers AI/ML at Confiz Limited and ADDO AI, and Power BI and ERP analysis at Lucrum.",
    "This portfolio pairs that background with shipped work: consumer apps with public Google Play listings, Android TV experiences, full-stack web platforms, and AI and data projects, each linked to a public case-study repository.",
  ],
  email: "hassanalialvi1117@gmail.com",
  sites: {
    futurewatch: "https://futurewatch.co",
    fwglobal: "https://fwglobal.co",
    hik: "https://hiktextiles.com",
    kalendra: "https://getkalendra.com",
  },
  cv: "/Hassan-Ali-Alvi-CV.pdf",
  social: {
    github: "https://github.com/haa1117",
    linkedin: "https://www.linkedin.com/in/hassan-alvi-ba398111b",
  },
} as const;

export const nav = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "featured", label: "Featured" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
] as const;

/** Sections reachable from the command palette and in-page links but not shown in the top bar. */
export const moreSections = [
  { id: "services", label: "Services" },
  { id: "websites", label: "Websites" },
] as const;
