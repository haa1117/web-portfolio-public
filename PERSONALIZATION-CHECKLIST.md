# Personalization Checklist

Owner: Hassan Ali Alvi. Verified so far: GitHub (`haa1117`) and LinkedIn (`hassan-alvi-ba398111b`). Nothing else is shown in the UI; missing items are omitted rather than faked.

## Required before publication

- [ ] **Deployment target (Vercel/Netlify/Cloudflare account, project and optional custom domain)** — the portfolio is not deployed yet and needs its own URL; set `NEXT_PUBLIC_SITE_URL` there so social previews resolve correctly.
- [ ] **Set the three `NEXT_PUBLIC_EMAILJS_*` environment variables on the new deployment** — they live in the git-ignored `.env.local`, so the contact form falls back to opening the visitor's mail app until they are set.

## Recommended

- [ ] **Short personal bio (2–3 sentences)** — the About text is a portfolio-based introduction and carries no personal story.
- [ ] **Professional headshot** — the hero shows an "HA" monogram instead of a photo.
- [ ] **Upwork profile URL** — the Services section mentions freelance availability but links nowhere.
- [ ] **Freelancer profile URL** — same reason as Upwork.
- [ ] **Resume/CV URL or PDF** — recruiters often look for a downloadable CV.

## Optional

- [ ] **Availability status wording** — the contact section says "Open to project enquiries and collaborations"; adjust if that is not accurate.
- [ ] **Location** — only add if you want it public.
- [ ] **EmailJS template recipient** — the shared EmailJS template decides where form messages are delivered, so confirm it sends to hassan@futurewatch.co.
- [ ] **Other profiles (X, Medium, Dribbble, etc.)** — only if you have them and want them listed.
