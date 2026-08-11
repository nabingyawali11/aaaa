# OpenCode UI/UX & Frontend Guidelines

## Design System Rules
- **Grid & Spacing:** Always stick to an 8px spatial grid (8px, 16px, 24px, 32px, 48px).
- **Color Philosophy (60-30-10):**
  - 60% Dominant Neutral (Backgrounds, off-whites, dark slate)
  - 30% Structural Secondary (Cards, sidebars, muted borders)
  - 10% Vibrant Accent (Primary CTAs, focal points only)
  - Never use pure `#000000` for text; use charcoal/slate shades (`#111827` or `#18181B`).
- **Typography:**
  - Max 2 font families.
  - Set distinct weight contrast between headings and body text.
  - Body text must always have comfortable line height (`1.5` to `1.6`).

## Component & Styling Practices
- Prefer subtle `1px` borders over heavy drop shadows.
- Micro-interactions must use smooth cubic-bezier transitions (`duration-200` to `duration-300`). Avoid linear timing curves.
- Use mobile-first responsive utilities.

## Quality Assurance
- After editing components, verify that there are no broken imports or missing TypeScript types.

---

## Option — Aayusa Portfolio Design Guidelines

### Tech Stack Rules
- **Framework:** React 19 + Vite 8 + React Router v7 (HashRouter).
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`), `clsx` + `tailwind-merge` (`cn` helper).
- **Animations:** Framer Motion, `@iconify/react`, `lucide-react`.

### UI/UX Rules
- **60-30-10 Color Scheme:**
  - 60% Dark background slate/gray (e.g., `#0F172A`, `#18181B`).
  - 30% Low-contrast containers with `border border-white/10` or soft glassmorphism.
  - 10% Accent color (cyan/sunflower yellow) strictly for CTAs and highlights.
- **No Pure Black Text/Backgrounds:** Use charcoal/slate shades (`#111827`, `#18181B`).
- **Spacing Grid:** Multiples of 8px (`p-2`, `p-4`, `p-8`, `gap-6`, `gap-8`).
- **Micro-interactions:** Smooth Framer Motion transitions or CSS cubic-beziers (`duration-200` to `duration-300`). Avoid linear/abrupt transitions.

### Code Constraints
- Keep `IntersectionObserver` scroll-spy logic intact on `Home.jsx`.
- Always run `npm run build` after making layout or routing updates to catch Vite build errors.
