import Link from "next/link";

const options = [
  {
    slug: "collage",
    number: "01",
    title: "Corkboard Collage",
    palette: ["#f5efe3", "#1a1612", "#d8353a", "#2e4cc0"],
    paletteLabels: ["paper", "ink", "crimson", "blue"],
    blurb:
      "Keeps the riso palette you liked, but drops the magazine header. Hero is a collage — title card, author sticker, stat badges, and a big halftone disc, all lightly pinned and tilted. Compact, everything above the fold. Playful.",
  },
  {
    slug: "poster",
    number: "02",
    title: "Concert Poster",
    palette: ["#0f0b20", "#ffd93d", "#ff4d8f", "#f5efe3"],
    paletteLabels: ["plum", "acid", "hot pink", "cream"],
    blurb:
      "Gig-poster energy on deep plum. Title is one tight stacked block with an acid-yellow slab cut behind it; concentric rings and hot-pink glyphs orbit around. Bold but compact. Night-of-the-talk vibe.",
  },
  {
    slug: "neon",
    number: "03",
    title: "Neon Panels",
    palette: ["#09090d", "#00ffc8", "#ff2d95", "#f0e8d0"],
    paletteLabels: ["black", "mint", "magenta", "cream"],
    blurb:
      "Dashboard-ish but playful. Four slightly tilted neon-bordered panels fill the first screen — title, byline, stats, CTAs. Think sticker pack meets modular widgets. Uses mono + grotesk; no serif.",
  },
];

export default function PreviewIndex() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0b0a09",
        color: "#efe8da",
        padding: "56px 32px 100px",
      }}
      className="pf-sans"
    >
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <div
          style={{
            fontFamily: "var(--font-jetbrains-mono)",
            fontSize: 11,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#00ffc8",
            marginBottom: 20,
          }}
        >
          Round 2 · 3 directions
        </div>
        <h1
          className="pf-display"
          style={{
            fontSize: "clamp(36px, 5vw, 64px)",
            fontWeight: 400,
            letterSpacing: "-0.025em",
            margin: "0 0 12px",
            lineHeight: 0.95,
          }}
        >
          Three layouts. Three palettes.
        </h1>
        <p
          className="pf-serif-i"
          style={{
            fontSize: "clamp(15px, 1.3vw, 18px)",
            maxWidth: 640,
            margin: "0 0 44px",
            color: "#a39c8d",
            lineHeight: 1.5,
            fontStyle: "italic",
          }}
        >
          No more magazine mastheads. Each hero is compact enough to fit above
          the fold; each uses a genuinely different layout geometry so the
          choice isn&rsquo;t just about colour.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 20,
          }}
        >
          {options.map((o, i) => (
            <Link
              key={o.slug}
              href={`/preview/${o.slug}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div
                style={{
                  background: o.palette[0],
                  color: o.palette[1],
                  border: `1px solid ${o.palette[1]}22`,
                  padding: 24,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  minHeight: 320,
                  animationDelay: `${i * 0.08}s`,
                }}
                className="rise"
              >
                <div
                  style={{
                    fontFamily: "var(--font-jetbrains-mono)",
                    fontSize: 10.5,
                    letterSpacing: "0.2em",
                    marginBottom: 18,
                    opacity: 0.65,
                    textTransform: "uppercase",
                  }}
                >
                  {o.number} / direction
                </div>
                <h2
                  className="pf-display"
                  style={{
                    fontSize: 30,
                    fontWeight: 600,
                    margin: "0 0 12px",
                    lineHeight: 1.05,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {o.title}
                </h2>
                <p
                  style={{
                    fontSize: 13,
                    lineHeight: 1.55,
                    margin: 0,
                    opacity: 0.82,
                  }}
                >
                  {o.blurb}
                </p>
                <div style={{ marginTop: "auto", paddingTop: 24 }}>
                  <div style={{ display: "flex", gap: 0, marginBottom: 16 }}>
                    {o.palette.map((c, idx) => (
                      <div
                        key={c}
                        style={{
                          flex: 1,
                          height: 32,
                          background: c,
                          borderRight:
                            idx < o.palette.length - 1
                              ? `1px solid ${o.palette[1]}22`
                              : "none",
                          position: "relative",
                        }}
                      >
                        <span
                          style={{
                            position: "absolute",
                            bottom: -16,
                            left: 0,
                            fontFamily: "var(--font-jetbrains-mono)",
                            fontSize: 8.5,
                            letterSpacing: "0.15em",
                            textTransform: "uppercase",
                            opacity: 0.55,
                          }}
                        >
                          {o.paletteLabels[idx]}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div
                    style={{
                      marginTop: 22,
                      fontFamily: "var(--font-jetbrains-mono)",
                      fontSize: 11,
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: o.palette[2],
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    Open full preview
                    <span style={{ marginLeft: "auto" }}>→</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
