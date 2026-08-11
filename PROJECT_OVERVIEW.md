# Aayusa Portfolio — Project Overview

A single-page portfolio app for **Aayusa Nyaupane**, a FullStack Developer from Butwal, Nepal. Built with **React 19 + Vite 8 + Tailwind CSS v4**, deployed to GitHub Pages. Includes a password-protected photo "garden" (gallery + upload) powered by Cloudinary, a personal secret music player, and a birthday surprise experience: `/happybirthday/ankita` is a live countdown gate that unlocks into `/happybirthday/ankita/miss`, a lily-themed (white/pink/blue) "realm" with a blow-the-candle cake, story, letter, and navy memory carousel.

## Tech Stack

- **Frontend:** React 19, React Router v7 (HashRouter), Vite 8
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`), clsx + tailwind-merge (`cn` helper)
- **Animations:** Framer Motion, @iconify/react (devicon icons), lucide-react icons
- **Backend/API:** Cloudinary (image storage + search API), serverless function `api/cloudinary-search.js`
- **Deploy:** GitHub Pages (`gh-pages`), homepage: `nabingyawali11.github.io/Aayusa-Portfolio`

## Routing (src/App.jsx)

| Route | Page | Notes |
|-------|------|-------|
| `/` | Home | Wrapped in `PasswordGate` (password: `20820804`, hint "First time we meet and exchange name and talk") + MusicPlayer |
| `/gallery` | Gallery | Photo gallery wrapped in `PasswordGate` — no entry without password |
| `/happybirthday` | CountdownPage | Hidden birthday countdown — reveal ("Enter Ankita Ji's Realm") only appears after reaching zero; no preview button |
| `/happybirthday/ankita` | HappyBirthday | Birthday countdown gate: live countdown to Aayusa's 20th; on completion shows "Happy Birthday to you, Aayusa!" + "Open Your Surprise" button → `/happybirthday/ankita/miss` |
| `/happybirthday/ankita/miss` | MissPage | Full lily-themed birthday "realm" (cake, story, letter, memories) — direct URL or via countdown gates |
| `/garden/hidden-bloom-0431` | Upload | Hidden photo upload page |
| `*` | Home | Fallback (also gated) |

## Pages (src/pages)

- **Home.jsx** — Single-page shell combining all sections (rendered from `sectionComponents` array); IntersectionObserver tracks active section, syncs URL hash via `history.replaceState`, exposes `window.setProgrammaticScroll`
- **Hero.jsx** (component, rendered by Home) — Dark hero: animated morphing circular photo, rotating rings, gradient text name, social links, smooth-scroll CTAs, scroll-down mouse indicator. Modernized per design guidelines (8px grid, 60-30-10 color scheme, `duration-300 ease-out` hovers, unify social hovers)
- **About.jsx** — Spotlight-text effect (cursor-following clip-path highlight), Download Resume button (PDF)
- **Education.jsx** — Vertical timeline (BCA at Butwal Kalika Campus; Higher Secondary at Jagannath Secondary School); data imported from `data/info.js`
- **Skills.jsx** — Skills grouped into Frontend / Backend / Database / Tools using devicon icons; data imported from `data/info.js`
- **Projects.jsx** — "Projects launching soon" empty state with GitHub + collaborate CTAs
- **Contact.jsx** — Dark gradient section, location/email, social links, "Get in touch" card
- **Gallery.jsx** — "A Garden of Smiles" theme; fetches Cloudinary images; desktop = responsive grid + infinite scroll + lightbox; mobile = swipe-style prev/next carousel (buttons use `lily/5.png` deep-wine prev / `lily/2.png` rose next); caches to localStorage; empty/loading states; route wrapped in `PasswordGate`
- **Upload.jsx** — Drag-and-drop image upload to Cloudinary (upload_preset `aayusa`), fake progress bar, success/error status, resets after upload
- **HappyBirthday.jsx** — Countdown gate (uses `getNextBirthday`/`getBirthdayAge`): balloons + confetti backdrop; before zero shows a live days/hours/min/sec countdown; on reaching zero replaces it with "Happy Birthday to you, Aayusa! 🌸" and an "Open Your Surprise 🌸" button that `navigate()`s to `/happybirthday/ankita/miss`. `CandleCake` no longer rendered here (it lives on MissPage)
- **birthday/CountdownPage.jsx** — Dark countdown to Ankita's 20th birthday (live days/hours/minutes/seconds ticking boxes), optional music toggle (`song1.mp3`), routed at `/happybirthday` (direct URL only); the reveal ("Enter Ankita Ji's Realm 🌸") only renders after reaching zero — the "Preview Birthday" button was removed so no buttons appear before zero
- **birthday/MissPage.jsx** — The lily-themed birthday "realm" at `/happybirthday/ankita/miss`: `#FDF9F7` background with rose/sky ambient glows and falling petals, rose music toggle, hero greeting, `CandleCake`, Story section (`OriginStory` featured card + chapters 2–3), wish letter, navy/blue 3D memory carousel, and garden/home CTAs. Section titles use navy `#1e3a8a` (no white title boxes)
- **Blogs.jsx** — Sample blog list (NOT wired into routes)
- **Experience.jsx** — Sample experience timeline (NOT wired into routes)

## Components (src/components)

- **Navbar.jsx** — Fixed header, scroll spy highlight, lock-on-click scroll behavior, mobile menu; smooth-scrolls with navbar offset, silently updates URL
- **Footer.jsx** — 3-column footer with social links, copyright, Privacy/Terms/Sitemap links
- **MusicPlayer.jsx** — Floating bottom-left music button; password modal to unlock (password: `20610113`, hint "do you know the developer nicely"); loops `assets/song/song 2.mp3`; rotating icon + pulse when playing
- **PasswordGate.jsx** — Full-screen password lock on the home page and `/gallery`; uses `sessionStorage` (`aayusa_auth`)
- **ScrollToTop.jsx** — Floating "scroll to top" button (bottom-right) that scrolls to hero with programmatic-scroll coordination
- **SpotlightText.jsx** — Cursor spotlight effect (dark circle with white/cyan text over gray text)
- **CustomCursor.jsx** — Custom cursor rings (not imported in App, available for reuse)
- **birthday/CandleCake.jsx** — Interactive SVG 3-tier cake with flickering candle flame; real mic blow-detection via `getUserMedia` → AudioContext/AnalyserNode RMS (threshold + streak), confetti bursts + Web Audio chime on blow, "Tap to Blow" manual fallback, mic-denied state; 4-song picker popup (`src/assets/song/hbd/` `1hbd`–`4hbd.mp3`, default `3hbd.mp3`) that auto-plays the chosen song, floating mini-player, dark amber wish card after blowing
- **birthday/OriginStory.jsx** — Featured story card "01 · Two Worlds, One Event" rendered as the first card of the MissPage story section (styled like the generic chapter cards); highlights `CodeFest 2025` in rose and `destiny` in navy
- **birthday/MemoryGallery.jsx** — 3D coverflow carousel of `memoryPhotos`; cards centered with `y: "-50%"`, nav arrows + pagination BELOW the card (`relative z-30 mt-8`), aspect-ratio 4/5, click center card to open a light quote modal; fully navy/blue themed (arrows, dots, glow, modal) to contrast the rose MissPage
- **ui/Button.jsx**, **ui/ExperienceCard.jsx**, **ui/SectionTitle.jsx**, **ui/SkillBadge.jsx** — Reusable UI primitives (not all wired into current pages)

**Removed (dead code):** `Layout.jsx`, `NavbarHero.jsx`, `birthday/SurpriseGift.jsx`, `birthday/SunflowerBouquet.jsx` (sunflower SVG asset-set usage removed).

## Data & Utils

- **src/data/info.js** — Single source of truth: `personalInfo`, `educationTimeline` (consumed by Education.jsx), `skillCategories` (consumed by Skills.jsx)
- **src/data/birthday.js** — Birthday data: `BIRTH_DATE_BS` / `BIRTH_DATE_GREGORIAN` (2063-04-31 BS == 2006-08-16 AD), `getNextBirthday()`, `getBirthdayAge()`, `storyChapters` (chapter 1 content is rendered by `OriginStory`; the generic loop renders `storyChapters.slice(1)`), `memoryPhotos`, `wishLetter`, `CHIME_NOTES` (note/freq/start/duration chime sequence used by CandleCake)
- **src/utils/cloudinary.js** — Cloudinary constants from env; `fetchGalleryImages()` paginates via `/api/cloudinary-search`
- **src/utils/cn.js** — `cn()` class merge helper

## API / Backend

- **api/cloudinary-search.js** — Serverless function proxying Cloudinary Search API with Basic auth; reads `CLOUDINARY_API_KEY || VITE_CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`, `CLOUDINARY_CLOUD_NAME || VITE_CLOUDINARY_CLOUD_NAME`; queries `folder=sunflower`
- **vite.config.js** — Dev proxy for `/api/cloudinary-search` → Cloudinary; credentials read from env via `loadEnv()` (no hardcoded secrets)
- **.env** — Gitignored (`*.env` in .gitignore); server-only `CLOUDINARY_API_KEY` + `CLOUDINARY_API_SECRET`, client-exposed `VITE_CLOUDINARY_CLOUD_NAME` + `VITE_CLOUDINARY_UPLOAD_PRESET` (neither is secret)

## Assets (src/assets)

- `Aiyesa_Reusme.pdf`, `MyResume.pdf` — resumes
- `hero.jpg`, `profile.jpg` — profile images
- `me/` — 6 personal photos (1.webp–4.webp, 5.jpg, 6.jpg)
- `song/` — `song 2.mp3` (used), `song1.mp3`, `song3.mp3`
- `song/hbd/` — `1hbd.mp3`–`4hbd.mp3` (CandleCake song picker)
- `lily/` — `1.png`–`7.png` (mobile gallery carousel prev/next buttons)

## Config Files

- **package.json** — scripts: `dev`, `build`, `lint`, `preview`; deps include react, react-dom, react-router-dom, framer-motion, tailwindcss, lucide-react, @iconify/react, canvas-confetti, vercel; devDeps include vite, gh-pages, eslint
- **index.html** — Fonts (Inter, Playfair Display), custom scrollbar, title "🌻 Aayusa"
- **src/index.css** — Tailwind v4 import; base layer sets `section { scroll-mt-24 }` (96px anchor offset for fixed navbar); `spin-slow` keyframes
- **AGENTS.md** — Design system + Aayusa Portfolio guidelines (tech stack, 60-30-10 colors, code constraints)
- **public/** — `favicon.svg`, `icons.svg`
- **README.md** — One line: "Learn the fullstack fully and debug this repo yourself only."

## Notes

- Passwords are hardcoded client-side (`20820804` site + gallery gate, `20610113` music) — visible in source.
- Cloudinary API secret is no longer hardcoded in source files, but it WAS committed to git history via `vite.config.js` — credentials should be rotated.
- `Blogs.jsx` and `Experience.jsx` exist but are not rendered in the app.
- `HappyBirthday.jsx` (at `/happybirthday/ankita`) is a countdown gate: after the countdown hits zero it shows "Happy Birthday to you, Aayusa!" and an "Open Your Surprise" button to `/happybirthday/ankita/miss`; `CandleCake` was removed from it (it lives on MissPage).
- `CountdownPage.jsx` (at `/happybirthday`) reveals its "Enter Ankita Ji's Realm 🌸" button only after reaching zero — the old "Preview Birthday" button was removed.
- `storyChapters[0]` in `birthday.js` still carries the introvert/extrovert `contrast` blocks, but since the generic loop renders `storyChapters.slice(1)`, those contrast boxes are no longer displayed (OriginStory replaces chapter 1).
- ESLint has pre-existing repo-wide errors (no Node globals in eslint config → `process`/`Buffer` flags; core rule not counting `motion.div` JSX usage). Build passes clean.
- Deployed/pushed to `https://github.com/nabingyawali11/aaaa.git` (branch `main`).
