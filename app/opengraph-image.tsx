import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Lahcen Aharouane — Digital product developer in Casablanca";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const regular = await readFile(join(process.cwd(), "public/fonts/PPRadioGrotesk-Regular.otf"));
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", padding: "50px 64px", background: "#f4f4f3", color: "#202020", fontFamily: "Radio" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 27 }}><span>LA.</span><span>aharouane.com</span></div>
      <div style={{ display: "flex", flexDirection: "column", marginTop: "auto", marginBottom: "auto", fontSize: 104, letterSpacing: "-5px", lineHeight: 1.05 }}><span>Lahcen</span><span>Aharouane.</span></div>
      <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #bdbdbb", paddingTop: 24, fontSize: 26 }}><span>Digital product developer</span><span>Casablanca, Morocco</span></div>
    </div>,
    { ...size, fonts: [{ name: "Radio", data: regular, weight: 400, style: "normal" }] },
  );
}
