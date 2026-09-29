# Lahcen Aharouane — Portfolio

A minimal personal portfolio built with Next.js 15.5.26, React 19, TypeScript, local PP Radio Grotesk fonts, and GSAP.

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

Internal page links use the GSAP curtain in `components/portfolio/PageTransition.tsx`: three street-poster compositions inspired by Watch Dogs 2, with torn diagonals, horizontal print bands, and vertical signal cuts. Halftone artwork, hot pink, and sliced destination typography give each sequence a shared direction. A shuffled bag uses all three before repeating, prevents consecutive repeats, and varies the direction. Sequences take approximately 2.6 seconds, including a readable poster hold. The curtain covers the current page before routing, then reveals the destination after it mounts. Same-page anchors scroll normally; external links and modifier clicks keep their default behavior. Browser back/forward navigation uses a shorter reveal, and reduced-motion preferences skip the effect.

The three artwork assets are in `public/transitions`; concepts, art direction, and generation prompts are saved in `.codex-design-v6`. Destination text stays in HTML so project names remain accurate.

ASCII monograms, eyes, and skulls briefly decode inside the transition curtain. Navigation and project titles scramble on hover or keyboard focus, project images have a small pointer-following open label, and section headings reveal as they enter the viewport. These effects respect reduced-motion preferences and add no extra sections or controls.

## Search identity

`lib/site.ts` sets `https://aharouane.com` as the canonical origin. The visible biography and Person structured data connect Aharouane, Ahrouan, Ahrwan, and أهروان to the same person. Every work page has its own title, description, canonical URL, and structured data. `/sitemap.xml` lists the ten public content URLs; `/robots.txt` points to it. `/opengraph-image` supplies the social preview card. Legacy `/about` and `/projects` routes permanently redirect to the corresponding destinations.

After deployment, verify the domain in Google Search Console and submit `https://aharouane.com/sitemap.xml`. Canonical URLs and structured data help discovery; indexing and search position are determined by search engines and cannot be guaranteed.

## Dependency security

Next.js 15.5.26 includes the fix for GHSA-2xp9-vwfh-vxw4 (AVIF image optimization). The lockfile also updates Sharp and compatible transitive dependencies. The PostCSS override keeps Next.js and the build pipeline on the patched PostCSS 8 version until the framework updates its own pin. Run `npm audit` periodically; the verified audit had zero reported vulnerabilities on 2026-09-29.

## Checks

```sh
npx tsc --noEmit
npm run lint
npm run build
```

Public project and article links are external. Email links open a draft in the visitor’s mail application. No form backend or booking calendar is configured.
