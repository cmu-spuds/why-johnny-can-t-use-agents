import {
  Fraunces,
  Instrument_Sans,
  Instrument_Serif,
  JetBrains_Mono,
  Space_Grotesk,
} from "next/font/google";
import Link from "next/link";
import "./preview.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const fontVars = `${fraunces.variable} ${instrumentSans.variable} ${instrumentSerif.variable} ${jetBrainsMono.variable} ${spaceGrotesk.variable}`;

const links = [
  { href: "/preview", label: "index" },
  { href: "/preview/collage", label: "01 · collage" },
  { href: "/preview/poster", label: "02 · poster" },
  { href: "/preview/neon", label: "03 · neon" },
];

export default function PreviewLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={fontVars}>
      <nav
        style={{
          position: "fixed",
          top: 12,
          left: 12,
          right: 12,
          zIndex: 999,
          background: "rgba(10,8,6,0.9)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          color: "#efe8da",
          padding: "10px 16px",
          fontFamily: "var(--font-jetbrains-mono), monospace",
          fontSize: 11,
          letterSpacing: "0.08em",
          border: "1px solid rgba(239,232,218,0.15)",
          borderRadius: 2,
          display: "flex",
          gap: 20,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <span style={{ opacity: 0.5, textTransform: "uppercase" }}>Preview ›</span>
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            style={{ color: "inherit", textDecoration: "none", opacity: 0.85 }}
          >
            {l.label}
          </Link>
        ))}
        <span style={{ opacity: 0.4, marginLeft: "auto" }}>
          ←{" "}
          <Link href="/" style={{ color: "inherit", textDecoration: "underline" }}>
            live site
          </Link>
        </span>
      </nav>
      <div style={{ paddingTop: 52 }}>{children}</div>
    </div>
  );
}
