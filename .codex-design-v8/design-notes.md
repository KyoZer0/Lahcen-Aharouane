# Centered portrait hero

The final direction is `personality-hero-concept.png`, generated with the built-in Image Gen tool. The original centered concept is retained as the preceding composition study. Exact prompts are adjacent.

## Design system

- Paper #f4f4f3, ink #202020, muted #6b6b6b; restrained #df0060 punctuation. Full-screen transition accent #ff006c.
- Existing PP Radio Grotesk for navigation, body and bold role. Georgia italic for the personal phrase; no additional font download.
- Desktop: centered portrait with face anchored at 50% horizontal / 37% hero height, facts above, role on the left, personal introduction on the right, social links and work link at the bottom.
- Header keeps LA. and contact at the edges, with the navigation independently centered.
- Mobile stacks role and detail above the portrait; introduction, facts and links continue below. The redundant personal motto is omitted at this size.

## Allowed content

Navigation, factual employment/location details and contact destinations remain from the existing site. Each look has a role, italic phrase, short first-person introduction and one detail line defined in `components/Hero/hero-personas.ts`. Phrases: Developer / by curiosity.; Biker / by instinct.; Metalhead / on repeat. No invented achievements, counts, clients or availability claims.

## Motion

A single React look state commits the portrait and its text at the covered point of the transition. The current portrait stays visible until the next neutral frame decodes. A body portal renders the artwork at viewport size, above the header, independently of hero clipping or scroll position. Seven overlapping paper strips animate in randomized orders without immediate repeats; oversized lettering appears in the middle. The overlay lasts about 2.7 seconds, and staggered hero letters and supporting copy reveal as it opens. Reduced-motion preferences skip the collage and text movement. Failure and interruption cleanup restore the idle state.

## Fidelity review

| Element | Implementation |
| --- | --- |
| Paper and monochrome portrait | Exact existing palette and approved transparent portrait assets |
| Centered navigation | Center of the link group aligns with the hero center independently of logo and contact widths |
| Typography contrast | Existing black grotesk role, pink punctuation and expressive serif italic phrase |
| Content density | One short introduction and one personal detail; no added panels or badges |
| Composition | Portrait centered, facts and copy arranged around it, clear face area |
| Footer | Work link left, social links right, portrait control centered |
| Responsive adaptation | Stacked content on mobile; compact hero height on portrait tablets prevents a floating cutout |

Intentional adaptations from the concept: responsive font sizing, existing approved images rather than the concept's generated portrait, and a stacked mobile reading order. All downstream sections remain intact.

## Verification

- Production build passes, including lint/type checks and all 21 prerendered routes. Webpack emitted a non-fatal cache snapshot warning.
- Browser checked at 1280x720, 1440x1000, 820x1180, 390x844 and 320x700; no horizontal overflow.
- Desktop navigation and portrait centers both measured at x=712.4 in the 1424.8px content area.
- All three looks show matching role, phrase, description and detail. One portrait remains visible after each transition; the overlay is hidden and input unlocked.
- Rapid clicks, Enter/Space switching, mobile menu opening/closing and all eight actual cursor directions plus neutral verified.
- Full-screen overlay measured at viewport origin and full content width/height, including on a scrolled mobile page. The title appears while fully covered and the hero copy animates as the strips open.
- No browser console errors or warnings. Active portrait images loaded successfully.
- Reviewed the final concept and browser capture together with view_image. Final desktop, mobile and transition captures are saved alongside this record.
