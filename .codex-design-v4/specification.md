# Minimal portfolio implementation specification

Reference: user-supplied minimal portrait website. Coordinated concepts: hero.png (1536x1024), work.png, about.png, services.png, journal.png. All concepts inspected before implementation.

## Design system
- Background #f4f4f3; ink #202020; muted #6b6b6b; rule #d0d0ce; services inverse #202020.
- Local PP Radio Grotesk, weights 300 and 400. Display tracking -.055em, line-height 1.02; body 18–22px / 1.55; labels 14px.
- Desktop gutters 4vw, content max-width 1600px; section spaces 110–140px. Open editorial regions with square project media. No shadows, badges or metric cards.
- Native thin arrow glyphs, plus/minus on disclosure controls. Underlined text links; visible keyboard focus.
- Hero: compact LA. + About me / Portfolio / Services / Journal + Let’s talk. Left rail. Verified role/location facts. Huge Hello. Intro and scroll link. Grayscale cutout right, static body, eight registered head layers with GSAP opacity blend.
- Portfolio: large Selected work. heading, four project covers with attribution captions, two editorial columns; click real external project/source links. Use original repository screenshots, never the AI-recreated screenshots from the concept.
- About: left index rail; wide right two-line heading, two-column prose, ruled background rows, LinkedIn.
- Services: dark band, large left statement + email CTA, three accessible animated accordion rows on right.
- Journal: three publication rows linking original articles. Contact: oversized question + real email, social links and back-to-top.

## Intentional corrections to generated concepts
Concepts incorrectly add repeated headers and sometimes rename navigation to Blog or booking. Use the HERO navigation once only across the continuous page and keep Journal / Let’s talk from the brief. No verified booking calendar exists.
Use actual project screenshots instead of generated facsimiles. The PlayTad art is illustrative; Agent71 is typography-only because confidential.
Gallery columns are subtly staggered to follow the requested varied layouts and original section brief.
Holberton row uses "Training" instead of claiming a specific awarded credential not confirmed by the public profile.

## Responsive and functional requirements
Desktop and small-laptop hero preserves text/image separation. Mobile reflows intro above portrait, compact accessible menu, all sections one column, no horizontal overflow. Navigation uses real anchors, articles and projects have real URLs, email opens mail client. Reduced-motion disables tracking/reveal motion; keyboard controls preserve portrait access. GSAP on scoped client components, content stays server rendered.

