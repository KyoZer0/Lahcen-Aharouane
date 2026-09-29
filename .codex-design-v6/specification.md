# Street-poster takeover

Evolve the supplied Watch Dogs 2 / DedSec art direction into three personal portfolio interstitials. Concepts were generated and inspected before implementation. The minimal destination pages remain the visual baseline.

- Palette: #101010, #f4f4f3, #ff006c. Type: existing PP Radio Grotesk Black, with outline duplicates and clipped misregistration.
- Torn diagonals: three opposing diagonal tears, white split destination, giant outline LA in the background.
- Poster press: five horizontal torn strips arriving from alternating sides. Black destination on a white tilted poster with a pink print offset.
- Signal cut: four uneven vertical strips, solid centre destination and two quiet outline echoes above and below.
- Every full composition uses its extracted concept background. Destination and corner labels are live HTML. Only WORK (or actual route name), LA. and Lahcen Aharouane are foreground copy.
- Shuffle all three sequences; prevent repeats at shuffle boundaries. Approximately 2.5–2.7 seconds on cached navigation, including a 660–740 ms full-art hold. No strobe or rapid full-screen color toggles.
- Animate transforms and opacity with GSAP. Preserve coverage before route push, release after destination mounts, and cleanup across browser history, interrupted motion and failed requests.
- Narrow-screen adaptations: readable wrapped destination titles and fewer spatial offsets; same three artwork styles. Reduced-motion preferences bypass the curtain entirely.

Production assets: public/transitions/torn-diagonals.png, poster-press.png and signal-cut.png. Original generated assets remain in the Codex generated-images directory. Exact concept and extraction prompts are in prompts.md.

Art research: Ubisoft's Watch Dogs 2 DedSec fankit and the user's supplied collage reference. https://news.ubisoft.com/en-us/article/13qrfvKY8TBLMHHDSe2zdh/watch-dogs-2-grab-the-dedsec-fankit-and-marcus-holloway-cosplay-guide
