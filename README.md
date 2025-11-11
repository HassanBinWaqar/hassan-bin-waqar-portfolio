# Hassan Bin Waqar — Developer Portfolio

This repository is a personalized developer portfolio built with Next.js (App Router), React and Tailwind CSS. It contains the site code, content data files, and static assets used to power the portfolio hosted from this repository.

This README has been updated to match the current project state and the personalization you've applied (profile image, resume, certifications, skills, and experience entries).

---

## Quick overview

- Project: Personal developer portfolio site
- Main features added/updated:
  - Personalized content (name, profile image, contact, description)
  - Experience entries: Buildables (MERN Fellow), Siber Koza (Web Dev intern), Bytewise (Frontend intern), NUML (ongoing), and Self-Employed (project work)
  - Certifications section and data
  - Skills cleaned (removed unwanted items) and mapped icons including a new `software-architecture` icon
  - Resume placed at `public/resume.pdf` and configured for download
  - Favicons generated from `public/profile.jpeg` and wired into metadata
  - Animated AI Chatbot powered by Gemini; floating assistant widget available on all pages

---

## Run locally (Windows PowerShell)

Prerequisites:
- Node.js 18.17+ (Node 20+ recommended)
- pnpm (recommended) or npm

Install dependencies:

```powershell
pnpm install
# or
npm install
```

Turbopack note: during development some machines can experience Turbopack instability with this repo. If you hit a dev server crash or internal panic, disable Turbopack for the dev run:

```powershell
$env:NEXT_DISABLE_TURBOPACK = "1"  # disable Turbopack for this session
npm run dev
```

If you prefer pnpm:

```powershell
$env:NEXT_DISABLE_TURBOPACK = "1"; pnpm dev
```

Open http://localhost:3000 in your browser. If you still see stale assets (favicons or images), do a hard refresh or clear the browser cache.

---

## Important local assets

- Resume: `public/resume.pdf` — the Hero "Get Resume" CTA is wired to download this file when present.
- Profile image / favicon: `public/profile.jpeg` and generated favicons `public/favicon-16.png`, `public/favicon-32.png`.
- SVG skill icon: `app/assets/svg/skills/software-architecture.svg` (newly added for software design & architecture skill).

---

## Where to edit content

All content is data-driven in the `utils/data/` folder. Update these files to personalize the site:

- `utils/data/personal-data.js` — name, bio, social links, resume path
- `utils/data/experience.js` — experience entries shown on the homepage
- `utils/data/educations.js` — education entries
- `utils/data/projects-data.js` — project cards and links
- `utils/data/skills.js` — skills list (icons mapped in `utils/skill-image.js`)
- `utils/data/certifications.js` — certifications / credentials list

Changes to those files will reflect on the site automatically (rebuild needed for production).

---

## Deployment

Deployments to Vercel are recommended for easiest Next.js support. Connect the repository, set any required environment variables, and deploy. The site works with Vercel's default settings for Next.js apps.

If you deploy elsewhere, ensure the build command is `npm run build` and the publish directory is `.next`.

---

## Notes about contact & notifications

- Contact form uses the server endpoint at `app/api/contact/route.js` and sends messages via email (Nodemailer/Gmail SMTP).
- To enable sending you'll need to set `EMAIL_ADDRESS` (the recipient) and `GMAIL_PASSKEY` (a Gmail App Password) in a local `.env.local` file. See `.env.example` for the expected variables.

---

## AI Chatbot (Gemini)

- The floating assistant uses the Gemini API via `@google/generative-ai` and the API route at `app/api/chat/route.js`.
- To enable it locally or on Vercel, set `GEMINI_API_KEY` in `.env.local` (local) or Project Environment Variables (Vercel).
- The assistant is themed to match the site and appears on all pages via `app/layout.js`.

Example `.env.local` entries:

```
GEMINI_API_KEY=your_api_key_here
EMAIL_ADDRESS=you@example.com
GMAIL_PASSKEY=your_gmail_app_password
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## Recent changes (summary)

- Experience section updated with Buildables, Siber Koza, Bytewise, NUML, and Self-Employed entries.
- Certifications UI and data added.
- Skills list cleaned (removed: Go, MaterialUI, Nginx, Strapi, AWS, PostgreSQL) and icon mapping improved (C++, Java, SQL, Full Stack, Software Design & Architecture).
- Resume added to `public/resume.pdf` and the hero CTA set to download it.
- Favicons generated from your profile image and linked in `app/layout.js` metadata.

---

## Troubleshooting

- Dev server crashing with Turbopack: set `NEXT_DISABLE_TURBOPACK=1` (see run instructions above) and restart dev server.
- Images or favicon still showing old version: clear browser cache and reload (Ctrl+F5 / hard refresh).
- Build errors after edits: run `npm run build` locally to see type or lint errors; fix any code changes you made or share the error output and I can help.

---

If you'd like, I can:

- Start the dev server and verify the Experience and Certifications sections render correctly.
- Update the README further with your personal links (LinkedIn, GitHub, live demo URL) — just provide the URLs.

Thanks — tell me which follow-up you'd like next.
