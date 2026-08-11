# AGENTS.md — Aayusa Portfolio & Birthday Surprise Site

## Project Overview
A personal portfolio for **Aayusa Nyaupane** (React 19 + Vite 8, deployed to GitHub Pages) that also hosts a hidden **birthday surprise experience**: a countdown gate at `/happybirthday/ankita` that unlocks into the lily-themed "realm" `/happybirthday/ankita/miss`. The home page is protected by a client-side `PasswordGate`; the gallery is public at the route level but entry is gated by a password modal that only opens when clicking the "Explore Full Photo Garden 🌻" button on MissPage.

## Commands
- `npm run dev` — start the dev server (`http://localhost:5173`).
- `npm run build` — **always run after layout, routing, or data changes** to catch Vite build errors.
- `npm run preview` — preview the production build.

## Tech Stack Rules
- **Framework:** React 19 + Vite 8 + React Router v7 (HashRouter).
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`), `clsx` + `tailwind-merge` (`cn` helper).
- **Animations:** Framer Motion, `@iconify/react`, `lucide-react`.
- **Backend:** Cloudinary (gallery search + uploads) via serverless `api/cloudinary-search.js`.

## Routing (src/App.jsx)
| Route | Page | Notes |
|-------|------|-------|
| `/` | Home | `PasswordGate` (password `20820804`) + `MusicPlayer` |
| `/gallery` | Gallery | Public route — entry gated only by the "Explore Full Photo Garden 🌻" modal on MissPage |
| `/happybirthday` | `CountdownPage` | Countdown; reveal button only after reaching zero (no preview button); "← Back" → `https://aayusaneupane.com.np/` |
| `/happybirthday/ankita` | `HappyBirthday` | Countdown gate → "Happy Birthday to you, Aayusa!" + button to MissPage |
| `/happybirthday/ankita/miss` | `MissPage` | Full lily-themed realm (hero photo frame, cake, story, memories, letter, CTAs); "Back Home" → `https://aayusaneupane.com.np/` |
| `/garden/hidden-bloom-0431` | Upload | Hidden photo upload |
| `*` | Home | Fallback (gated) |

**Keep the two-route MissPage flow intact:** `HappyBirthday` (gate) → `MissPage` (realm). Do not expose MissPage buttons before the countdown hits zero.

## Design System

### Global / Main Portfolio
- **60-30-10 Color Scheme:** 60% dark slate backgrounds (`#0F172A`, `#18181B`), 30% low-contrast containers (`border border-white/10`, glassmorphism), 10% accent (cyan/sunflower yellow) for CTAs and highlights.
- **No pure black text/backgrounds:** use charcoal/slate (`#111827`, `#18181B`).
- **Typography:** Inter + Playfair Display (serif reserved for quotes/featured headings). Body line-height `1.5`–`1.6`.
- **Spacing:** multiples of 8px (`p-2`, `p-4`, `p-8`, `gap-6`, `gap-8`).
- **Micro-interactions:** Framer Motion or cubic-bezier transitions (`duration-200` to `duration-300`). Never linear/abrupt.

### Birthday Lily Theme (MissPage + Gallery buttons)
- Background `#FDF9F7`; accents **pink-500** (`#ec4899`) with sky-blue touches (`#93c5fd`) — rose has been replaced by pink on MissPage.
- Section headings navy **`#1e3a8a`** — no white title boxes.
- Cards: `bg-white/70 border-pink-200/50 shadow-xl` with pink-tinted shadows; the Letter card is transparent glassmorphism (`bg-white/30 backdrop-blur-xl`).
- MemoryGallery is **navy/blue themed** (arrows/dots/glow in `#1e3a8a`/blue) even though the rest of MissPage is pink.
- MissPage section order: **Hero → CandleCake → Story → Memories → Letter → Final CTA**; the Letter + Final CTA share a full-bleed `cartoon2` backdrop (opacity-30, `object-cover`, white vertical gradient merge).
- Dark amber theme still used on CountdownPage, HappyBirthday gate, and the post-blow wish card in CandleCake (`bg-slate-900/80 border-amber-500/20`).

## Component Conventions (src/components)
- **birthday/CandleCake.jsx** — 3-tier SVG cake, mic blow-detection + "Tap to Blow" fallback, 4-song picker popup (`src/assets/song/hbd/`, default = `3hbd.mp3`), floating mini-player, confetti + Web Audio chime, dark amber wish card after blowing. **Auto-requests mic permission ~400ms after mount**; "Tap to Blow" only renders while NOT listening (`micState !== "listening"`).
- **birthday/OriginStory.jsx** — Featured "01 · Two Worlds, One Event" story card, styled exactly like the generic chapter cards; highlighted `CodeFest 2025` (rose) and `destiny` (navy).
- **birthday/MemoryGallery.jsx** — 3D coverflow carousel; cards centered with `y: "-50%"`; controls BELOW the card (`relative z-30 mt-8`); navy/blue theme; aspect-ratio 4/5; click center to open quote modal.
- **PasswordGate.jsx** — `sessionStorage` key `aayusa_auth`, password `20820804`. Used on `/` + `*` fallback only; the gallery gate is a pink-themed modal inside `MissPage.jsx` (`openGallery` / `submitGate`) reusing the same key/password.
- MissPage hero: full-screen 12-col grid; right column = tilted white polaroid photo frame (washi-tape corners, caption "Our First meet and first duo photograph together 🌸") crossfading `cartoon2`/`cartoon1` every 4s.
- Do NOT re-add `SurpriseGift.jsx` / `SunflowerBouquet.jsx` (deleted) or the sunflower SVG asset-set usage.

## Data & Assets
- **src/data/birthday.js** — birthday dates (BS/Gregorian), `getNextBirthday()`, `getBirthdayAge()`, `storyChapters` (chapter 1 content lives in `OriginStory`; the generic loop renders `storyChapters.slice(1)`), `memoryPhotos`, `wishLetter`, `CHIME_NOTES`.
- **Identity strings:** use "Your Caring Person · Tech Lead" (never the developer's personal name).
- **src/assets/lily/** — 1–7.png carousel buttons; **src/assets/song/hbd/** — 1hbd–4hbd.mp3.
- **src/assets/song/happy-birthday-song.mp3** — ambient music on CountdownPage + MissPage (imported as `happyBirthdaySong`); `song1.mp3` also kept in the folder (re-added 2026-08-12) but is NOT referenced in code.
- **src/assets/cartoon1.png / cartoon2.png** — crossfading hero-frame portraits; `cartoon2` also the Letter+Final-CTA backdrop (`hero-backdrop.png` is a copy of `cartoon2.png`).

## Code Constraints
- Keep `IntersectionObserver` scroll-spy logic intact on `Home.jsx`.
- Do NOT re-wrap `/gallery` in `PasswordGate` at the route level — the gate is the on-click modal in MissPage.
- No comments in code unless requested; follow existing component patterns.

## Git / GitHub
- Remote: `https://github.com/nabingyawali11/aaaa.git`; branch `main`; identity `nabingyawali11` / `gyawalibhagiratha@gmail.com`.
- Commit and push only when explicitly asked.
