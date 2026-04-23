"use client";

import React from "react";

const taxonomy = [
  { n: "01", t: "Orchestration", d: "Agents that act on behalf of users to manipulate software interfaces.", c: "31", ex: "Agentforce · Copilot" },
  { n: "02", t: "Creation", d: "Generate structured documents with well-defined formats.", c: "33", ex: "Lovable · Gamma" },
  { n: "03", t: "Insight", d: "Distill knowledge into structured takeaways.", c: "87", ex: "Perplexity · Spotify AI DJ" },
];

export default function CollagePreview() {
  return (
    <div
      className="preview-root grain-paper"
      style={
        {
          "--paper": "#f5efe3",
          "--paper-2": "#ede5d1",
          "--ink": "#1a1612",
          "--crimson": "#d8353a",
          "--blue": "#2e4cc0",
          background: "var(--paper)",
          color: "var(--ink)",
          minHeight: "100vh",
          overflowX: "hidden",
          fontFamily: "var(--font-instrument-sans)",
        } as React.CSSProperties
      }
    >
      {/* HERO — collage, all visible in viewport */}
      <section
        style={{
          position: "relative",
          minHeight: "calc(100vh - 52px)",
          padding: "32px 40px 32px",
          overflow: "hidden",
        }}
      >
        {/* Big halftone disc top-right */}
        <div
          style={{
            position: "absolute",
            top: -80,
            right: -120,
            width: 480,
            height: 480,
            borderRadius: "50%",
            background: "var(--crimson)",
            mixBlendMode: "multiply",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 60,
            right: 20,
            width: 220,
            height: 220,
            color: "var(--ink)",
            opacity: 0.3,
            pointerEvents: "none",
          }}
          className="halftone-dots"
        />
        {/* Blue accent shape bottom-left */}
        <div
          style={{
            position: "absolute",
            bottom: -60,
            left: -40,
            width: 240,
            height: 240,
            background: "var(--blue)",
            mixBlendMode: "multiply",
            opacity: 0.9,
            transform: "rotate(8deg)",
          }}
        />

        {/* Title card — tilted */}
        <div
          className="rise"
          style={{
            position: "relative",
            zIndex: 10,
            display: "inline-block",
            background: "var(--paper)",
            border: "3px solid var(--ink)",
            padding: "20px 28px 24px",
            transform: "rotate(-1.8deg)",
            boxShadow: "6px 6px 0 var(--ink)",
            marginTop: 20,
            maxWidth: 680,
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-jetbrains-mono)",
              fontSize: 10.5,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "var(--crimson)",
              marginBottom: 10,
            }}
          >
            an investigation ·  ⬤ ⬤ ⬤
          </div>
          <h1
            className="pf-display"
            style={{
              fontSize: "clamp(36px, 5vw, 60px)",
              lineHeight: 0.95,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              margin: 0,
              textTransform: "uppercase",
            }}
          >
            Why Johnny{" "}
            <em
              style={{
                fontStyle: "italic",
                fontWeight: 400,
                color: "var(--crimson)",
                textTransform: "none",
              }}
            >
              can&rsquo;t
            </em>{" "}
            use agents.
          </h1>
          <p
            className="pf-serif-i"
            style={{
              fontSize: 17,
              lineHeight: 1.35,
              margin: "14px 0 0",
              fontStyle: "italic",
              maxWidth: 520,
            }}
          >
            Industry aspirations vs. user realities with AI agent software.
          </p>
        </div>

        {/* Author sticker — bottom-left of title */}
        <div
          className="rise"
          style={{
            position: "relative",
            zIndex: 10,
            display: "inline-block",
            background: "var(--ink)",
            color: "var(--paper)",
            padding: "8px 18px",
            fontFamily: "var(--font-jetbrains-mono)",
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            transform: "rotate(1.8deg)",
            marginTop: 20,
            marginLeft: 48,
            animationDelay: "0.12s",
            boxShadow: "3px 3px 0 var(--crimson)",
          }}
        >
          Shome · Krishnan · Das · CMU
        </div>

        {/* Stat badge stickers row — right of center */}
        <div
          style={{
            position: "absolute",
            top: "46%",
            right: "6%",
            display: "flex",
            gap: 20,
            zIndex: 10,
          }}
        >
          {[
            { n: "102", l: "agents", rot: -3, bg: "var(--paper)", fg: "var(--ink)" },
            { n: "31", l: "users", rot: 2, bg: "var(--ink)", fg: "var(--paper)" },
            { n: "5", l: "barriers", rot: -2, bg: "var(--crimson)", fg: "var(--paper)" },
          ].map((s, i) => (
            <div
              key={i}
              className="rise"
              style={{
                width: 98,
                height: 98,
                borderRadius: "50%",
                background: s.bg,
                color: s.fg,
                border: "2.5px solid var(--ink)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                transform: `rotate(${s.rot}deg)`,
                boxShadow: "3px 3px 0 var(--ink)",
                animationDelay: `${0.2 + i * 0.08}s`,
              }}
            >
              <span
                className="pf-display"
                style={{ fontSize: 28, fontWeight: 900, lineHeight: 1, letterSpacing: "-0.04em" }}
              >
                {s.n}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-jetbrains-mono)",
                  fontSize: 9.5,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  marginTop: 4,
                }}
              >
                {s.l}
              </span>
            </div>
          ))}
        </div>

        {/* CTAs as stickers */}
        <div
          style={{
            position: "absolute",
            bottom: 48,
            left: 40,
            display: "flex",
            gap: 14,
            zIndex: 10,
            flexWrap: "wrap",
          }}
        >
          <a
            href="#"
            className="rise"
            style={{
              padding: "10px 20px",
              background: "var(--ink)",
              color: "var(--paper)",
              fontFamily: "var(--font-jetbrains-mono)",
              fontSize: 12,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              textDecoration: "none",
              boxShadow: "4px 4px 0 var(--crimson)",
              transform: "rotate(-0.8deg)",
              animationDelay: "0.4s",
            }}
          >
            ↓ Download paper
          </a>
          <a
            href="#"
            className="rise"
            style={{
              padding: "10px 20px",
              background: "var(--paper)",
              color: "var(--ink)",
              border: "2px solid var(--ink)",
              fontFamily: "var(--font-jetbrains-mono)",
              fontSize: 12,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              textDecoration: "none",
              boxShadow: "4px 4px 0 var(--blue)",
              transform: "rotate(1.2deg)",
              animationDelay: "0.48s",
            }}
          >
            → X thread
          </a>
          <a
            href="#"
            className="rise"
            style={{
              padding: "10px 20px",
              background: "var(--paper)",
              color: "var(--ink)",
              border: "2px solid var(--ink)",
              fontFamily: "var(--font-jetbrains-mono)",
              fontSize: 12,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              textDecoration: "none",
              boxShadow: "4px 4px 0 var(--ink)",
              transform: "rotate(-0.5deg)",
              animationDelay: "0.56s",
            }}
          >
            → LinkedIn
          </a>
        </div>

        {/* Small tagline bottom-right */}
        <div
          style={{
            position: "absolute",
            bottom: 44,
            right: 40,
            fontFamily: "var(--font-jetbrains-mono)",
            fontSize: 10,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            opacity: 0.5,
            textAlign: "right",
          }}
        >
          arXiv:2509.14528<br />
          scroll ↓
        </div>
      </section>

      {/* Taxonomy — 3 tilted index cards */}
      <section style={{ padding: "60px 40px 80px", background: "var(--paper-2)", borderTop: "3px solid var(--ink)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div
            style={{
              fontFamily: "var(--font-jetbrains-mono)",
              fontSize: 11,
              letterSpacing: "0.25em",
              color: "var(--crimson)",
              marginBottom: 10,
              textTransform: "uppercase",
            }}
          >
            Three kinds of agent
          </div>
          <h2
            className="pf-display"
            style={{
              fontSize: "clamp(28px, 3.5vw, 44px)",
              fontWeight: 800,
              margin: "0 0 40px",
              lineHeight: 1,
              textTransform: "uppercase",
              letterSpacing: "-0.02em",
            }}
          >
            A taxonomy, {" "}
            <em style={{ color: "var(--crimson)", fontStyle: "italic", fontWeight: 400, textTransform: "none" }}>
              clipped
            </em>{" "}
            from the field.
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
            {taxonomy.map((t, i) => (
              <div
                key={t.n}
                style={{
                  background: i === 1 ? "var(--ink)" : "var(--paper)",
                  color: i === 1 ? "var(--paper)" : "var(--ink)",
                  border: "3px solid var(--ink)",
                  padding: "22px 22px 20px",
                  transform: `rotate(${(i - 1) * 1.2}deg)`,
                  boxShadow: `6px 6px 0 ${i === 0 ? "var(--blue)" : i === 1 ? "var(--crimson)" : "var(--ink)"}`,
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-jetbrains-mono)",
                    fontSize: 10.5,
                    letterSpacing: "0.22em",
                    opacity: 0.75,
                    textTransform: "uppercase",
                    marginBottom: 10,
                  }}
                >
                  Category № {t.n}
                </div>
                <h3
                  className="pf-display"
                  style={{
                    fontSize: 24,
                    fontWeight: 800,
                    margin: "0 0 8px",
                    textTransform: "uppercase",
                    letterSpacing: "-0.015em",
                  }}
                >
                  {t.t}
                </h3>
                <p style={{ fontSize: 13.5, lineHeight: 1.5, margin: "0 0 18px" }}>{t.d}</p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: 10,
                    borderTop: `1px solid ${i === 1 ? "var(--paper)" : "var(--ink)"}`,
                    paddingTop: 10,
                  }}
                >
                  <span
                    className="pf-display"
                    style={{
                      fontSize: 36,
                      fontWeight: 900,
                      lineHeight: 1,
                      color: "var(--crimson)",
                    }}
                  >
                    {t.c}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-jetbrains-mono)",
                      fontSize: 10,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      opacity: 0.75,
                    }}
                  >
                    agents · {t.ex}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
