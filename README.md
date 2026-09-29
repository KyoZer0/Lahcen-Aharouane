# Lahcen Aharouane — Portfolio

A minimal personal portfolio built with Next.js 14, React, TypeScript, local PP Radio Grotesk fonts, and GSAP.

## Run

```sh
npm install
npm run dev
```

Open http://localhost:3000. For a production preview, run `npm run build` followed by `npm start`. Stop the development server before building because both use the same `.next` directory.

## Content and layout

- `app/page.tsx`: homepage composition.
- `components/Hero`: navigation, intro animation, and cursor-following portrait.
- `components/portfolio`: selected work, biography, services, journal, contact, and scroll reveals.
- `lib/portfolio.ts`: project and article content, including eight project detail routes.
- `app/work/page.tsx`: complete work archive; `/projects` redirects here.
- `lib/technologies.ts`: grouped technologies from the LinkedIn About section.
- `public/work`: six real project screenshots from live sites and local previews.
- `lib/site.ts`: email and social links.
- `content-sources.md`: public research sources and attribution notes.
- `.codex-design-v4`: section concepts, design specification, and verification report.

## Portrait

The eight requested directions and neutral cutout are stored in `public/generated/head-cutouts`. Original full-photo variants remain in `public/generated/head-directions`; the original photograph is `public/lahcen2.jpg`.

The suit is a single fixed image. Only the masked head layers crossfade with GSAP. CSS registration aligns each generated cutout at the collar; complementary alpha masks and additive blending prevent a bright neck seam. Cursor direction uses a dead zone and angular hysteresis. Rapid movements retarget the current opacity values instead of snapping or queuing animations.

Keyboard: focus the portrait and use Left/Right to cycle, Up/Down to look vertically, Escape/Home to reset. Reduced-motion users see the neutral portrait. Touch input does not drive head tracking.

## Page transitions

Internal page links use the GSAP curtain in `components/portfolio/PageTransition.tsx`: diagonal torn-paper layers, halftone artwork, hot pink and sliced destination typography. The curtain covers the current page before routing, then reveals the destination after it mounts. Same-page anchors scroll normally; external links and modifier clicks keep their default behavior. Browser back/forward navigation uses a shorter reveal, and reduced-motion preferences skip the effect.

The artwork is `public/transitions/ink-collage.png`; the concept and generation prompts are saved in `.codex-design-v5`.

## Checks

```sh
npx tsc --noEmit
npm run lint
npm run build
```

Public project and article links are external. Email links open a draft in the visitor’s mail application. No form backend or booking calendar is configured.
