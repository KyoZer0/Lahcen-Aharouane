import type { PortraitLookId } from "./PortraitLook";

export const heroPersonas: Record<PortraitLookId, {
  role: string;
  phrase: string;
  detail: string;
  introduction: string;
}> = {
  suit: {
    role: "Developer",
    phrase: "by curiosity.",
    detail: "React / Next.js / TypeScript",
    introduction: "I turn complex ideas into useful digital products. From the first sketch to the last detail, I like making things work beautifully.",
  },
  rider: {
    role: "Biker",
    phrase: "by instinct.",
    detail: "Two wheels / A clear mind",
    introduction: "Away from the screen, I find a different kind of focus on two wheels. Gear on, noise off, and a little room to think.",
  },
  metal: {
    role: "Metalhead",
    phrase: "on repeat.",
    detail: "Slipknot / Opeth / Tool",
    introduction: "Heavy riffs, layered sounds, and a jacket full of favorites. This is my kind of background music.",
  },
};
