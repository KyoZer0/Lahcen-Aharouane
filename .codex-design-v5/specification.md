# Page transition direction

Reference: the user's Watch Dogs 2 punk print collage. Preserve the minimal portfolio itself.

- Black #101010, warm paper #f4f4f3, hot pink #ff006c.
- Full viewport curtain, three overlapping diagonal strips with jagged edges.
- Coarse halftone, print grain, white tears and outlined LA artwork.
- Centre destination in PP Radio Grotesk 800, cut into two offset halves.
- Small LA signature at top left and name at bottom left.
- GSAP cover: 360 ms with 35 ms stagger. Hold a complete frame for at least 160 ms, then peel away over 640 ms. Only navigate once covered; reveal when the destination mounts.
- Same-page anchors keep native scrolling. Keyboard navigation, modifier clicks and external links keep normal semantics. Reduced motion skips the curtain. Release input and focus the destination after transitions.
- On narrow screens, keep the artwork left-aligned and scale destination typography to fit.

Concept: transition-concept.png. Production artwork: public/transitions/ink-collage.png. The production background removes the concept's foreground text so labels remain live HTML.
