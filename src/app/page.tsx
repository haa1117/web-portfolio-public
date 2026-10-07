import { Shell } from "@/components/Shell";
import { site } from "@/lib/site";

export default function Page() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.role,
    url: site.social.github,
    sameAs: [site.social.github, site.social.linkedin, site.sites.futurewatch, site.sites.fwglobal, site.sites.hik],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <Shell />
    </>
  );
}
