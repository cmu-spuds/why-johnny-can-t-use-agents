"use client";

import React from "react";

const taxonomy = [
  { n: "I", t: "Orchestration", d: "Agents that act on behalf of users to manipulate software interfaces.", c: "31", ex: "Agentforce · Copilot" },
  { n: "II", t: "Creation", d: "Generate structured documents with well-defined formats.", c: "33", ex: "Lovable · Gamma" },
  { n: "III", t: "Insight", d: "Distill knowledge into structured takeaways.", c: "87", ex: "Perplexity · AI DJ" },
];

export default function PosterPreview() {
  return (
    <div
      className="preview-root"
      style={
        {
          "--plum": "#0f0b20",
          "--plum-2": "#16102c",
          "--acid": "#ffd93d",
          "--hot": "#ff4d8f",
          "--mint": "#85ffc2",
          "--cream": "#f5efe3",
          background: "var(--plum)",
          color: "var(--cream)",
          minHeight: "100vh",
          overflowX: "hidden",
          fontFamily: "var(--font-instrument-sans)",
        } as React.CSSProperties
      }
    >
      {/* HERO — poster composition */}
      <section
        style={{
          position: "relative",
          minHeight: "calc(100vh - 52px)",
          padding: "36px 48px 36px",
          overflow: "hidden",
        }}
      >
        {/* Concentric rings top-right */}
        <svg
          style={{ position: "absolute", top: 30, right: 30, opacity: 0.85, pointerEvents: "none" }}
          width="220"
          height="220"
          viewBox="0 0 220 220"
          fill="none"
        >
          {[100, 82, 64, 46, 28].map((r, i) => (
            <circle
              key={r}
              cx="110"
              cy="110"
              r={r}
              stroke={i % 2 === 0 ? "var(--hot)" : "var(--acid)"}
              strokeWidth="1.5"
              fill={i === 4 ? "var(--acid)" : "none"}
            />
          ))}
        </svg>

        {/* Bottom-left mint circle */}
        <div
          style={{
            position: "absolute",
            bottom: -120,
            left: -120,
            width: 340,
            height: 340,
            borderRadius: "50%",
            background: "var(--mint)",
            opacity: 0.15,
            filter: "blur(2px)",
          }}
        />

        {/* Asterisk-like decorations */}
        <div
          style={{
            position: "absolute",
            top: 80,
            left: "50%",
            color: "var(--hot)",
            fontSize: 32,
            fontFamily: "var(--font-space-grotesk)",
            opacity: 0.7,
          }}
        >
          ✦
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 160,
            right: 140,
            color: "var(--mint)",
            fontSize: 24,
            opacity: 0.6,
          }}
        >
          ✦
        </div>

        {/* Top meta bar (NOT a masthead — just small CTAs / label) */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "var(--font-jetbrains-mono)",
            fontSize: 11,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--mint)",
            marginBottom: 60,
          }}
        >
          <span>A research dispatch</span>
          <span style={{ color: "var(--acid)" }}>arXiv:2509.14528</span>
        </div>

        {/* TITLE BLOCK */}
        <div style={{ position: "relative", maxWidth: 960 }} className="rise">
          <h1
            className="pf-display"
            style={{
              fontSize: "clamp(44px, 7vw, 96px)",
              lineHeight: 0.9,
              fontWeight: 900,
              letterSpacing: "-0.035em",
              margin: 0,
              textTransform: "uppercase",
            }}
          >
            <span style={{ display: "block" }}>Why Johnny</span>
            <span
              style={{
                display: "inline-block",
                position: "relative",
                textTransform: "none",
                fontStyle: "italic",
                fontWeight: 400,
                color: "var(--plum)",
                padding: "0 0.18em",
                margin: "0.02em 0",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  inset: "0.12em -0.04em 0.08em -0.04em",
                  background: "var(--acid)",
                  zIndex: -1,
                  transform: "skewX(-6deg)",
                }}
              />
              can&rsquo;t
            </span>
            <span style={{ display: "block" }}>use agents.</span>
          </h1>

          <p
            className="pf-serif-i rise"
            style={{
              fontSize: "clamp(16px, 1.5vw, 21px)",
              lineHeight: 1.4,
              margin: "28px 0 0",
              maxWidth: 620,
              fontStyle: "italic",
              color: "var(--cream)",
              opacity: 0.9,
              animationDelay: "0.14s",
            }}
          >
            <span style={{ color: "var(--hot)" }}>↯</span> Industry
            aspirations versus user realities with AI agent software. A field
            study of <span style={{ color: "var(--acid)" }}>102 agents</span>{" "}
            and <span style={{ color: "var(--hot)" }}>31 participants</span>.
          </p>
        </div>

        {/* Bottom bar — authors + stats + CTA strip */}
        <div
          style={{
            position: "absolute",
            bottom: 36,
            left: 48,
            right: 48,
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: 40,
            alignItems: "end",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "var(--font-jetbrains-mono)",
                fontSize: 10,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "var(--mint)",
                marginBottom: 10,
              }}
            >
              ✦ featuring
            </div>
            <div
              className="pf-display"
              style={{
                fontSize: 22,
                fontWeight: 500,
                letterSpacing: "-0.01em",
              }}
            >
              Pradyumna Shome · Sashreek Krishnan · Sauvik Das
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 18, flexWrap: "wrap" }}>
              <a
                href="#"
                style={{
                  padding: "9px 18px",
                  background: "var(--acid)",
                  color: "var(--plum)",
                  fontFamily: "var(--font-jetbrains-mono)",
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  fontWeight: 500,
                }}
              >
                ↓ Download
              </a>
              <a
                href="#"
                style={{
                  padding: "9px 18px",
                  background: "transparent",
                  color: "var(--cream)",
                  border: "1px solid var(--hot)",
                  fontFamily: "var(--font-jetbrains-mono)",
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                }}
              >
                → X
              </a>
              <a
                href="#"
                style={{
                  padding: "9px 18px",
                  background: "transparent",
                  color: "var(--cream)",
                  border: "1px solid var(--mint)",
                  fontFamily: "var(--font-jetbrains-mono)",
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                }}
              >
                → LinkedIn
              </a>
            </div>
          </div>

          {/* Stat triptych */}
          <div
            style={{
              display: "flex",
              gap: 24,
              alignItems: "baseline",
            }}
          >
            {[
              { n: "102", l: "agents", c: "var(--acid)" },
              { n: "31", l: "users", c: "var(--hot)" },
              { n: "5", l: "barriers", c: "var(--mint)" },
            ].map((s) => (
              <div key={s.l} style={{ textAlign: "center" }}>
                <div
                  className="pf-display"
                  style={{
                    fontSize: 52,
                    fontWeight: 900,
                    lineHeight: 1,
                    color: s.c,
                    letterSpacing: "-0.04em",
                  }}
                >
                  {s.n}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-jetbrains-mono)",
                    fontSize: 10,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    marginTop: 4,
                    opacity: 0.8,
                  }}
                >
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Taxonomy — poster panels */}
      <section
        style={{
          padding: "64px 48px 80px",
          background: "var(--plum-2)",
          borderTop: "1px solid rgba(245,239,227,0.12)",
        }}
      >
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div
            style={{
              fontFamily: "var(--font-jetbrains-mono)",
              fontSize: 11,
              letterSpacing: "0.28em",
              color: "var(--acid)",
              marginBottom: 10,
              textTransform: "uppercase",
            }}
          >
            ✦ A three-part taxonomy
          </div>
          <h2
            className="pf-display"
            style={{
              fontSize: "clamp(28px, 4vw, 52px)",
              fontWeight: 800,
              margin: "0 0 40px",
              lineHeight: 0.98,
              letterSpacing: "-0.025em",
              textTransform: "uppercase",
            }}
          >
            What the industry{" "}
            <em
              style={{
                color: "var(--hot)",
                fontStyle: "italic",
                fontWeight: 400,
                textTransform: "none",
              }}
            >
              sells.
            </em>
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 16,
            }}
          >
            {taxonomy.map((t, i) => {
              const accents = ["var(--acid)", "var(--hot)", "var(--mint)"];
              const c = accents[i];
              return (
                <div
                  key={t.n}
                  style={{
                    background: "var(--plum)",
                    border: `2px solid ${c}`,
                    padding: "22px 22px 20px",
                    position: "relative",
                  }}
                >
                  <div
                    className="pf-display"
                    style={{
                      position: "absolute",
                      top: -20,
                      right: 16,
                      background: c,
                      color: "var(--plum)",
                      fontSize: 22,
                      fontWeight: 900,
                      padding: "4px 12px",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {t.n}
                  </div>
                  <h3
                    className="pf-display"
                    style={{
                      fontSize: 26,
                      fontWeight: 800,
                      margin: "8px 0 10px",
                      textTransform: "uppercase",
                      letterSpacing: "-0.015em",
                      color: c,
                    }}
                  >
                    {t.t}
                  </h3>
                  <p style={{ fontSize: 13.5, lineHeight: 1.55, margin: "0 0 20px", opacity: 0.85 }}>
                    {t.d}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: 10,
                      borderTop: `1px solid ${c}33`,
                      paddingTop: 12,
                    }}
                  >
                    <span
                      className="pf-display"
                      style={{ fontSize: 32, fontWeight: 900, lineHeight: 1, color: c }}
                    >
                      {t.c}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-jetbrains-mono)",
                        fontSize: 10,
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        opacity: 0.65,
                      }}
                    >
                      agents · {t.ex}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
