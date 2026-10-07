# Personalization Checklist

Owner: Hassan Ali Alvi. Verified and in use: GitHub (`haa1117`), LinkedIn (`hassan-alvi-ba398111b`), email from the CV, the CV PDF, and the CV's work history, education, projects and activities. Anything not listed here is omitted from the UI rather than faked.

## Required before publication

- [ ] **Deployment target (Vercel/Netlify/Cloudflare account, project and optional custom domain)** — the portfolio is not deployed yet and needs its own URL; set `NEXT_PUBLIC_SITE_URL` there so social previews resolve correctly.
- [ ] **Set the three `NEXT_PUBLIC_EMAILJS_*` environment variables on the new deployment** — they live in the git-ignored `.env.local`, so the contact form falls back to opening the visitor's mail app until they are set.

## Recommended

- [ ] **EmailJS template recipient** — the shared EmailJS template decides where form messages are delivered, so confirm it sends to hassanalialvi1117@gmail.com.
- [ ] **Job titles for each role** — the CV gives none, so the Experience section shows company, dates and focus only.
- [ ] **Upwork profile URL** — the Services section mentions freelance availability but links nowhere.
- [ ] **Freelancer profile URL** — same reason as Upwork.

## Optional

- [ ] **Availability status wording** — the contact section says "Open to project enquiries and collaborations"; adjust if that is not accurate.
- [ ] **Location** — only add if you want it public.
- [ ] **Refresh the CV** — `public/Hassan-Ali-Alvi-CV.pdf` is the Nov 2025 version; replace the file when the CV changes.
- [ ] **Other profiles (X, Medium, Dribbble, etc.)** — only if you have them and want them listed.
