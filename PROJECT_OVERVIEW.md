# Aayusa Portfolio — Project Overview

A single-page portfolio app for **Aayusa Nyaupane**, a FullStack Developer from Butwal, Nepal. Built with **React 19 + Vite 8 + Tailwind CSS v4**, deployed to GitHub Pages. Includes a password-protected photo "garden" (gallery + upload) powered by Cloudinary, a personal secret music player, and a birthday surprise experience: `/happybirthday/ankita` is a live countdown gate that unlocks into `/happybirthday/ankita/miss`, a lily-themed (white/pink/blue) "realm" with a blow-the-candle cake, story, letter, and navy memory carousel. A further **secret realm** — `FeelingGate` at the bottom of MissPage and at `/feelings` — unlocks `/something-to-tell-you`; every keystroke and submit attempt is logged to a Neon Postgres database via `api/log-attempt.js`.

## Tech Stack

- **Frontend:** React 19, React Router v7 (HashRouter), Vite 8
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`), clsx + tailwind-merge (`cn` helper)
- **Animations:** Framer Motion, @iconify/react (devicon icons), lucide-react icons
- **Backend/API:** Cloudinary (image storage + search API), serverless function `api/cloudinary-search.js`; **attempt logging** via serverless `api/log-attempt.js` (Postgres `pg`, Neon, `DATABASE_URL`) writing to `access_logs` + `submitted_attempts`
- **Deploy:** GitHub Pages (`gh-pages`), homepage: `nabingyawali11.github.io/Aayusa-Portfolio`

## Routing (src/App.jsx)

| Route | Page | Notes |
|-------|------|-------|
| `/` | Home | Wrapped in `PasswordGate` (password: `20820804`, hint "First time we meet and exchange name and talk") + MusicPlayer |
| `/gallery` | Gallery | Public route — entry gated only by the "Explore Full Photo Garden 🌻" modal on MissPage (password `20820804`) |
| `/happybirthday` | CountdownPage | Hidden birthday countdown — reveal ("Enter Ankita Ji's Realm") only appears after reaching zero; no preview button |
| `/happybirthday/ankita` | HappyBirthday | Birthday countdown gate: live countdown to Aayusa's 20th; on completion shows "Happy Birthday to you, Aayusa!" + "Open Your Surprise" button → `/happybirthday/ankita/miss` |
| `/happybirthday/ankita/miss` | MissPage | Full lily-themed birthday "realm" (hero photo frame, cake, story, memories, letter, CTAs) + embedded `FeelingGate` at the bottom; "← Back to Countdown" → `/happybirthday/ankita`, "Back Home" → `https://aayusaneupane.com.np/` |
| `/test` | MissPage | Same MissPage (debug/direct-access route) |
| `/feelings` | FeelingGate | Secret-realm password gate (password `iloveyou@miss04`, `sessionStorage` `aayusa_feelings`, autofocus input); logs attempts; unlocks → `/something-to-tell-you` |
| `/something-to-tell-you` | SomethingToTellYou | Dark "confession" page — the realm reached after cracking the FeelingGate |
| `/test2` | SomethingToTellYou | Same page (debug/direct-access route) |
| `/garden/hidden-bloom-0431` | Upload | Hidden photo upload page |
| `*` | Home | Fallback (also gated) |

## Pages (src/pages)

- **Home.jsx** — Single-page shell combining all sections (rendered from `sectionComponents` array); IntersectionObserver tracks active section (rootMargin `-40% 0px -40% 0px`), syncs URL hash via `history.replaceState`, exposes `window.setProgrammaticScroll`
- **Hero.jsx** (component, rendered by Home) — Dark hero: animated morphing circular photo, rotating rings, gradient text name, social links, smooth-scroll CTAs, scroll-down mouse indicator. Modernized per design guidelines (8px grid, 60-30-10 color scheme, `duration-300 ease-out` hovers, unify social hovers)
- **About.jsx** — Spotlight-text effect (cursor-following clip-path highlight), Download Resume button (PDF)
- **Education.jsx** — Vertical timeline (BCA at Butwal Kalika Campus; Higher Secondary at Jagannath Secondary School); data imported from `data/info.js`
- **Skills.jsx** — Skills grouped into Frontend / Backend / Database / Tools using devicon icons; data imported from `data/info.js`
- **Projects.jsx** — "Projects launching soon" empty state with GitHub + collaborate CTAs
- **Contact.jsx** — Dark gradient section, location/email, social links, "Get in touch" card
- **Gallery.jsx** — "A Garden of Smiles" theme; fetches Cloudinary images; desktop = responsive grid + infinite scroll + lightbox; mobile = swipe-style prev/next carousel (buttons use `lily/5.png` deep-wine prev / `lily/2.png` rose next); caches to localStorage; empty/loading states; public at the route level — entry is gated by the on-click password modal inside MissPage
- **Upload.jsx** — Drag-and-drop image upload to Cloudinary (upload_preset `aayusa`), fake progress bar, success/error status, resets after upload
- **HappyBirthday.jsx** — Countdown gate (uses `getNextBirthday`/`getBirthdayAge`, unlocks at Aug 16, 10:01 PM): balloons + confetti backdrop; before zero shows a live days/hours/min/sec countdown; on reaching zero replaces it with "Happy Birthday to you, Aayusa! 🌸" and an "Open Your Surprise 🌸" button that `navigate()`s to `/happybirthday/ankita/miss`. `CandleCake` no longer rendered here (it lives on MissPage)
- **birthday/CountdownPage.jsx** — Dark countdown to Ankita's 20th birthday (live days/hours/minutes/seconds ticking boxes), optional music toggle (`happy-birthday-song.mp3`), routed at `/happybirthday` (direct URL only); the reveal ("Enter Ankita Ji's Realm 🌸") only renders after reaching zero — the "Preview Birthday" button was removed so no buttons appear before zero
- **birthday/MissPage.jsx** — The lily-themed birthday "realm" at `/happybirthday/ankita/miss`, now in **white/pink/sky** (rose replaced by pink-500 accents; navy `#1e3a8a` section headings). Section order: **Hero → CandleCake → Story → Memories → Letter → Final CTA → MissLetter reply → FeelingGate**, with **`<FeelingGate />` embedded after the Final CTA** (the bottom of the page hosts the secret-realm gate; its input does NOT autofocus here). Hero = full-screen two-column layout (`lg:grid-cols-12`): left is text (pink "Happy Birthday," + sky "Ankita Ji! 🌸" heading, "Hi Neupnae Miss! I'm one of your's friend which you tag name as your bestfriend" intro), right is a **physical photo frame** (tilted white polaroid mount, washi-tape corners, serif caption "Our First meet and first duo photograph together 🌸") that **crossfades between `cartoon2`/`cartoon1` every 4s**. A **Letter + Final CTA** share a full-bleed `cartoon2` backdrop (opacity-30, `object-cover`, vertical white gradient merge); the Letter card is **transparent glassmorphism** (`bg-white/30 backdrop-blur-xl`), and the **`<MissLetter />`** reply card sits just before the embedded `<FeelingGate />` in the same backdrop. The story section shows a byline ("Written with love by Your Caring Person for his Ankita Miss / Madam Ji 📖"). The "Explore Full Photo Garden 🌻" button opens a **lily-themed password modal** (password `20820804`, reuses `sessionStorage` `aayusa_auth`) and navigates to `/gallery` on success; top-left "← Back to Countdown" → `/happybirthday/ankita`, and "Back Home" (Final CTA) links out to `https://aayusaneupane.com.np/`
- **Blogs.jsx** — Sample blog list (NOT wired into routes)
- **Experience.jsx** — Sample experience timeline (NOT wired into routes)

## Components (src/components)

- **Navbar.jsx** — Fixed header, scroll spy highlight, lock-on-click scroll behavior, mobile menu; smooth-scrolls with navbar offset, silently updates URL. Nav items: 01 About → 02 Education → 03 Skills → 04 Projects → 05 Contact
- **Footer.jsx** — 3-column footer with social links, copyright, Privacy/Terms/Sitemap links
- **MusicPlayer.jsx** — Floating bottom-left music button; password modal to unlock (password: `20610113`, hint "do you know the developer nicely"); loops `assets/song/song 2.mp3`; rotating icon + pulse when playing
- **PasswordGate.jsx** — Full-screen password lock used on the home page and `*` fallback only; uses `sessionStorage` (`aayusa_auth`, password `20820804`). The gallery is no longer route-wrapped — entry is gated by the on-click password modal inside MissPage
- **ScrollToTop.jsx** — Floating "scroll to top" button (bottom-right) that scrolls to hero with programmatic-scroll coordination
- **SpotlightText.jsx** — Cursor spotlight effect (dark circle with white/cyan text over gray text)
- **CustomCursor.jsx** — Custom cursor rings (not imported in App, available for reuse)
- **birthday/CandleCake.jsx** — Interactive SVG 3-tier cake with flickering candle flame; **auto-requests mic permission on mount** (getUserMedia → AudioContext/AnalyserNode RMS threshold + streak) so blowing the candle works immediately; the **"Tap to Blow" fallback button only renders when the mic is NOT listening** (idle/denied); confetti bursts + Web Audio chime on blow; 4-song picker popup (`src/assets/song/hbd/` `1hbd`–`4hbd.mp3`, default `3hbd.mp3`), floating mini-player, dark amber wish card after blowing
- **birthday/OriginStory.jsx** — Featured story card "01 · Two Worlds, One Event" rendered as the first card of the MissPage story section (styled like the generic chapter cards); highlights `CodeFest 2025` in rose and `destiny` in navy
- **birthday/MemoryGallery.jsx** — 3D coverflow carousel of `memoryPhotos`; cards centered with `y: "-50%"`, nav arrows + pagination BELOW the card (`relative z-30 mt-8`), aspect-ratio 4/5, click center card to open a light quote modal; fully navy/blue themed (arrows, dots, glow, modal) to contrast the pink MissPage
- **FeelingGate.jsx** — Dark-slate secret-realm password gate (password `iloveyou@miss04`, `sessionStorage` key `aayusa_feelings`) that logs every keystroke + submission to `/api/log-attempt` (Neon Postgres) and unlocks `/something-to-tell-you`. Rendered inside MissPage at the very bottom (no autofocus) and directly at `/feelings` (autofocus via `autoFocusInput` prop)
- **birthday/SomethingToTellYou.jsx** — Dark slate + pink "confession" page (big "What do you think that special thing I am going to tell?" headline → letter-writing section); floating hearts; the letter is saved to localStorage and POSTed to `/api/save-letter` (Neon `letters` table); routed at `/something-to-tell-you` and `/test2`
- **ui/Button.jsx**, **ui/ExperienceCard.jsx**, **ui/SectionTitle.jsx**, **ui/SkillBadge.jsx**, **ui/Hbd.jsx** — Reusable UI primitives (not all wired into current pages; `Hbd.jsx` is unused/not imported anywhere)

**Removed (dead code):** `Layout.jsx`, `NavbarHero.jsx`, `birthday/SurpriseGift.jsx`, `birthday/SunflowerBouquet.jsx` (sunflower SVG asset-set usage removed).

## Data & Utils

- **src/data/info.js** — Single source of truth: `personalInfo`, `educationTimeline` (consumed by Education.jsx), `skillCategories` (consumed by Skills.jsx)
- **src/data/birthday.js** — Birthday data: `BIRTH_DATE_BS` / `BIRTH_DATE_GREGORIAN` (2063-04-31 BS == 2006-08-16 AD), `getNextBirthday()` (next Aug 16 at **10:01 PM**), `getBirthdayAge()`, `storyChapters` (chapter 1 content is rendered by `OriginStory`; the generic loop renders `storyChapters.slice(1)`), `memoryPhotos` (1–3 local, 4–6 Cloudinary-hosted), `wishLetter`, `CHIME_NOTES` (note/freq/start/duration chime sequence used by CandleCake)
- **src/utils/cloudinary.js** — Cloudinary constants from env; `fetchGalleryImages()` paginates via `/api/cloudinary-search`
- **src/utils/cn.js** — `cn()` class merge helper

## API / Backend

- **api/cloudinary-search.js** — Serverless function proxying Cloudinary Search API with Basic auth; reads `CLOUDINARY_API_KEY || VITE_CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`, `CLOUDINARY_CLOUD_NAME || VITE_CLOUDINARY_CLOUD_NAME`; queries `folder=sunflower`
- **api/log-attempt.js** — Serverless function (Postgres `pg`, Neon `DATABASE_URL`) that logs FeelingGate attempts: `POST /api/log-attempt` with `{ type: "keystroke"|"submission", value, is_correct }` writes to tables `access_logs` and `submitted_attempts` (auto-created) with IP + user-agent
- **api/save-letter.js** — Serverless function (Postgres `pg`, Neon `DATABASE_URL`) that saves letters written on the SomethingToTellYou page: `POST /api/save-letter` with `{ letter }` writes to the `letters` table (auto-created) with IP + user-agent
- **api/save-birthday-letter.js** — Serverless function (Postgres `pg`, Neon `DATABASE_URL`) that saves letters written on the MissPage reply section: `POST /api/save-birthday-letter` with `{ letter }` writes to the `birthday_letters` table (auto-created) with IP + user-agent
- **vite.config.js** — Dev proxy for `/api/cloudinary-search` → Cloudinary; credentials read from env via `loadEnv()` (no hardcoded secrets). Also mounts `api-log-attempt-dev`, `api-save-letter-dev` and `api-save-birthday-letter-dev` middleware plugins exposing `/api/log-attempt`, `/api/save-letter` and `/api/save-birthday-letter` in dev (each loads `DATABASE_URL` from env)
- **.env** — Gitignored (`*.env` in .gitignore); server-only `CLOUDINARY_API_KEY` + `CLOUDINARY_API_SECRET` + `DATABASE_URL`, client-exposed `VITE_CLOUDINARY_CLOUD_NAME` + `VITE_CLOUDINARY_UPLOAD_PRESET` (neither is secret); `.env.example` documents all of these

## Assets (src/assets)

- `Aiyesa_Reusme.pdf`, `MyResume.pdf` — resumes
- `hero.jpg`, `profile.jpg` — profile images (unused directly; Hero.jsx imports `me/5.jpg`)
- `me/` — 6 personal photos (1.webp–4.webp, 5.jpg, 6.jpg); `me/5.jpg` is the morphing hero photo
- `song/` — `happy-birthday-song.mp3` (ambient music used on CountdownPage + MissPage; imported as `happyBirthdaySong`), `song 2.mp3`, `song1.mp3` (unused, kept on disk), `song3.mp3`
- `song/hbd/` — `1hbd.mp3`–`4hbd.mp3` (CandleCake song picker)
- `lily/` — `1.png`–`7.png` (mobile gallery carousel prev/next buttons)
- `cartoon1.png`, `cartoon2.png` — animated couple portraits; `cartoon2` is the hero backdrop (`hero-backdrop.png` is an identical copy) used in the hero frame crossfade and the Letter/Final-CTA backdrop

## Config Files

- **package.json** — scripts: `dev`, `build`, `lint`, `preview`; deps include react, react-dom, react-router-dom, framer-motion, tailwindcss, lucide-react, @iconify/react, canvas-confetti, pg, react-scroll, vercel; devDeps include vite, gh-pages, eslint, @types/react, @types/react-dom
- **index.html** — Fonts (Inter, Playfair Display), custom scrollbar, title "🌻 Aayusa"
- **src/index.css** — Tailwind v4 import; base layer sets `section { scroll-mt-24 }` (96px anchor offset for fixed navbar); `spin-slow` keyframes
- **AGENTS.md** — Design system + Aayusa Portfolio guidelines (tech stack, 60-30-10 colors, code constraints)
- **public/** — `favicon.svg`, `icons.svg`
- **README.md** — One line: "Learn the fullstack fully and debug this repo yourself only."

## Notes

- Passwords are hardcoded client-side (`20820804` site + gallery gate, `20610113` music, `iloveyou@miss04` feeling gate) — visible in source.
- Cloudinary API secret is no longer hardcoded in source files, but it WAS committed to git history via `vite.config.js` — credentials should be rotated.
- `Blogs.jsx` and `Experience.jsx` exist but are not rendered in the app.
- The secret realm flow: `FeelingGate` (`/feelings` route, autofocus, or embedded at the bottom of MissPage without autofocus) → correct password `iloveyou@miss04` stores `sessionStorage.aayusa_feelings` and unlocks `/something-to-tell-you` (also `/test2`). Every keystroke + submission is POSTed to `/api/log-attempt`.
- `HappyBirthday.jsx` (at `/happybirthday/ankita`) is a countdown gate: after the countdown hits zero it shows "Happy Birthday to you, Aayusa!" and an "Open Your Surprise" button to `/happybirthday/ankita/miss`; `CandleCake` was removed from it (it lives on MissPage).
- `CountdownPage.jsx` (at `/happybirthday`) counts down to Aug 16, 10:01 PM and reveals its "Enter Ankita Ji's Realm 🌸" button only after reaching zero — the old "Preview Birthday" button was removed; the "← Back" link was removed too.
- MissPage navigation: top-left "← Back to Countdown" → `/happybirthday/ankita`; the "Back Home" button (Final CTA) → `https://aayusaneupane.com.np/`; the gallery gate unlock ("Explore Full Photo Garden 🌻") navigates to `/gallery` after the password.
- `storyChapters[0]` in `birthday.js` still carries the introvert/extrovert `contrast` blocks, but since the generic loop renders `storyChapters.slice(1)`, those contrast boxes are no longer displayed (OriginStory replaces chapter 1).
- ESLint has pre-existing repo-wide errors (no Node globals in eslint config → `process`/`Buffer` flags; core rule not counting `motion.div` JSX usage). Build passes clean.
- Deployed/pushed to `https://github.com/nabingyawali11/aaaa.git` (branch `main`); recent commits: `a18e057`, `67f62aa`, `2802fc7`, `0236981`.
