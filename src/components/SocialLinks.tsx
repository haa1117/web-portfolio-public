import { site } from "@/lib/site";
import { GithubIcon, LinkedinIcon } from "./icons";

export const SOCIALS = [
  { name: "GitHub", handle: "haa1117", href: site.social.github, Icon: GithubIcon },
  { name: "LinkedIn", handle: "hassan-alvi-ba398111b", href: site.social.linkedin, Icon: LinkedinIcon },
] as const;

/** Compact icon row for the footer. */
export function SocialIcons() {
  return (
    <ul className="flex items-center gap-3">
      {SOCIALS.map(({ name, href, Icon }) => (
        <li key={name}>
          <a href={href} target="_blank" rel="noreferrer me" aria-label={`${name} profile`} title={name} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/75 transition hover:border-neon hover:text-neon focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon">
            <Icon className="h-[1.125rem] w-[1.125rem]" />
          </a>
        </li>
      ))}
    </ul>
  );
}
