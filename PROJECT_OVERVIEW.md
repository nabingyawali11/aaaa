# Aayusa Portfolio — Project Overview

A single-page portfolio app for **Aayusa Nyaupane**, a FullStack Developer from Butwal, Nepal. Built with **React 19 + Vite 8 + Tailwind CSS v4**, deployed to GitHub Pages. Includes a hidden, password-protected "garden" section (photo gallery + upload) powered by Cloudinary, a personal secret music player, and a birthday surprise experience (landing page + hidden countdown with interactive blow-out-the-candle).

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
| `/gallery` | Gallery | Public photo gallery from Cloudinary |
| `/happybirthday` | CountdownPage | Hidden birthday countdown — NOT linked in Navbar/Footer; direct URL/navigation only |
| `/happybirthday/ankita` | HappyBirthday | Birthday landing (message card + blow-out-the-candle) — direct URL only |
| `/happybirthday/ankita/miss` | MissPage | Full birthday "realm" (story, letter, memories) — direct URL only |
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
- **Gallery.jsx** — "A Garden of Smiles" theme; fetches Cloudinary images; desktop = responsive grid + infinite scroll + lightbox; mobile = swipe-style prev/next carousel; caches to localStorage; empty/loading states
- **Upload.jsx** — Drag-and-drop image upload to Cloudinary (upload_preset `aayusa`), fake progress bar, success/error status, resets after upload
- **HappyBirthday.jsx** — Animated balloons + falling confetti, glassmorphism message card, "Visit the Garden" / "Back Home" CTAs; renders the `CandleCake` blow-out-the-candle section below the hero card
- **birthday/CountdownPage.jsx** — Dark countdown to Ankita's 20th birthday (live days/hours/minutes/seconds ticking boxes), optional music toggle (`song1.mp3`), routed at `/happybirthday` (direct URL only); reveal/preview buttons `navigate()` to `/happybirthday/ankita/miss`
- **birthday/MissPage.jsx** — The full birthday "realm" at `/happybirthday/ankita/miss`: falling-petal backdrop, music toggle, hero greeting, `CandleCake`, story chapters (with introvert/extrovert contrast), wish letter, memory-photo grid with quotes, and garden/home CTAs
- **Blogs.jsx** — Sample blog list (NOT wired into routes)
- **Experience.jsx** — Sample experience timeline (NOT wired into routes)

## Components (src/components)

- **Navbar.jsx** — Fixed header, scroll spy highlight, lock-on-click scroll behavior, mobile menu; smooth-scrolls with navbar offset, silently updates URL
- **Footer.jsx** — 3-column footer with social links, copyright, Privacy/Terms/Sitemap links
- **MusicPlayer.jsx** — Floating bottom-left music button; password modal to unlock (password: `20610113`, hint "do you know the developer nicely"); loops `assets/song/song 2.mp3`; rotating icon + pulse when playing
- **PasswordGate.jsx** — Full-screen password lock on the home page; uses `sessionStorage` (`aayusa_auth`)
- **ScrollToTop.jsx** — Floating "scroll to top" button (bottom-right) that scrolls to hero with programmatic-scroll coordination
- **SpotlightText.jsx** — Cursor spotlight effect (dark circle with white/cyan text over gray text)
- **CustomCursor.jsx** — Custom cursor rings (not imported in App, available for reuse)
- **birthday/CandleCake.jsx** — Interactive SVG 3-tier cake with flickering candle flame; real mic blow-detection via `getUserMedia` → AudioContext/AnalyserNode RMS (threshold + streak), confetti bursts + Web Audio chime on blow, "Tap to Blow" manual fallback, mic-denied state
- **ui/Button.jsx**, **ui/ExperienceCard.jsx**, **ui/SectionTitle.jsx**, **ui/SkillBadge.jsx** — Reusable UI primitives (not all wired into current pages)

**Removed (dead code):** `Layout.jsx` (empty placeholder) and `NavbarHero.jsx` (unused hero variant) — both deleted.

## Data & Utils

- **src/data/info.js** — Single source of truth: `personalInfo`, `educationTimeline` (consumed by Education.jsx), `skillCategories` (consumed by Skills.jsx)
- **src/data/birthday.js** — Birthday data: `BIRTH_DATE_BS` / `BIRTH_DATE_GREGORIAN` (2063-04-31 BS == 2006-08-16 AD), `getNextBirthday()`, `getBirthdayAge()`, `storyChapters`, `memoryPhotos`, `wishLetter`, `CHIME_NOTES` (note/freq/start/duration chime sequence used by CandleCake)
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

## Config Files

- **package.json** — scripts: `dev`, `build`, `lint`, `preview`; deps include react, react-dom, react-router-dom, framer-motion, tailwindcss, lucide-react, @iconify/react, canvas-confetti, vercel; devDeps include vite, gh-pages, eslint
- **index.html** — Fonts (Inter, Playfair Display), custom scrollbar, title "🌻 Aayusa"
- **src/index.css** — Tailwind v4 import; base layer sets `section { scroll-mt-24 }` (96px anchor offset for fixed navbar); `spin-slow` keyframes
- **AGENTS.md** — Design system + Aayusa Portfolio guidelines (tech stack, 60-30-10 colors, code constraints)
- **public/** — `favicon.svg`, `icons.svg`
- **README.md** — One line: "Learn the fullstack fully and debug this repo yourself only."

## Notes

- Passwords are hardcoded client-side (`20820804` site gate, `20610113` music) — visible in source.
- Cloudinary API secret is no longer hardcoded in source files, but it WAS committed to git history via `vite.config.js` — credentials should be rotated.
- `Blogs.jsx` and `Experience.jsx` exist but are not rendered in the app.
- `HappyBirthday.jsx` (at `/happybirthday/ankita`) currently has no link to `/happybirthday/ankita/miss`; entry is via direct URL or the countdown page's buttons.
- ESLint has pre-existing repo-wide errors (no Node globals in eslint config → `process`/`Buffer` flags; core rule not counting `motion.div` JSX usage). Build passes clean.
