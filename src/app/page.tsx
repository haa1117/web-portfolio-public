import { Shell } from "@/components/Shell";
import { site } from "@/lib/site";

export default function Page() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.role,
    url: site.social.github,
    email: `mailto:${site.email}`,
    alumniOf: { "@type": "CollegeOrUniversity", name: "Ghulam Ishaq Khan University of Engineering Sciences and Technology (GIKI)" },
    worksFor: { "@type": "Organization", name: "Future Watch", url: site.sites.futurewatch },
    knowsAbout: ["Android development", "Flutter", "Full-stack web development", "Machine learning", "Data science", "Android TV"],
    sameAs: [site.social.github, site.social.linkedin, site.sites.futurewatch, site.sites.fwglobal, site.sites.hik],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <Shell />
    </>
  );
}
