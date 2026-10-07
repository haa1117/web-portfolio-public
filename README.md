# Hassan Ali Alvi — Portfolio

Futuristic, animation-heavy personal portfolio built with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4** and **Framer Motion**.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Where things live

| What | Where |
| --- | --- |
| Name, role, bio, email, social links | `src/lib/site.ts` |
| 45 projects (5 featured + 40 in the library): copy, links, status | `src/data/projects.json` (types in `src/lib/data.ts`) |
| Project images (Play Store graphics, repo screenshots, optimised WebP) | `public/projects/<repo-slug>/` |
| Website screenshots | `public/sites/` |
| Services (12 areas, offers, and which projects prove each) | `src/components/Services.tsx` |
| Skills copy | `src/components/Skills.tsx` |

## Highlights

Boot-sequence preloader · neural-network particle backdrop · custom magnetic cursor · scramble/typed hero ·
Featured case-study blocks · filterable, searchable project library with detail modal · 3D-tilt spotlight cards · ⌘K command palette ·
scroll progress bar · reduced-motion support.

## Updating projects

- Add or edit an entry in `src/data/projects.json`: `group` is one of `apps | games | ai | biz | web`, `status` one of `store | live | build | unreleased`, and `flagship: true` moves it to the Featured section.
- Every GitHub link points to `https://github.com/haa1117/<repo>-public`; Play Store links are only set where a real listing exists.
- Images are optimised WebP in `public/projects/<slug>/` (`icon`, `hero`, phone shots `p1…`, screenshots `s1…`).

## Contact form

The contact form uses EmailJS. Copy `.env.example` to `.env.local` and fill the three `NEXT_PUBLIC_EMAILJS_*` values (also set them on the hosting platform). Without them the form opens the visitor's mail app instead.

## Deploy

Zero-config on Vercel / Netlify / Cloudflare Pages (`next build`).
