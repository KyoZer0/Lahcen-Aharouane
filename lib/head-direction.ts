export const headDirections = [
  "top", "top-right", "right", "bottom-right",
  "bottom", "bottom-left", "left", "top-left",
] as const;

export type HeadDirection = (typeof headDirections)[number] | "neutral";

/** Screen coordinates, clockwise from up. A small dead zone lets the face rest. */
export function getHeadDirection(dx: number, dy: number, previous: HeadDirection = "neutral"): HeadDirection {
  if (Math.hypot(dx, dy) < 24) return "neutral";
  const angle = (Math.atan2(dx, -dy) * 180 / Math.PI + 360) % 360;
  if (previous !== "neutral") {
    const previousAngle = headDirections.indexOf(previous) * 45;
    const difference = Math.abs(((angle - previousAngle + 540) % 360) - 180);
    // Avoid flickering when the pointer rests along a sector boundary.
    if (difference < 27) return previous;
  }
  return headDirections[Math.round(angle / 45) % 8];
}
