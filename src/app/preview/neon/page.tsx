"use client";

import React from "react";

const taxonomy = [
  { n: "01", t: "Orchestration", d: "Agents that act on behalf of users to manipulate software interfaces.", c: "31", ex: "Agentforce · Copilot" },
  { n: "02", t: "Creation", d: "Generate structured documents with well-defined formats.", c: "33", ex: "Lovable · Gamma" },
  { n: "03", t: "Insight", d: "Distill knowledge into structured takeaways.", c: "87", ex: "Perplexity · Spotify AI DJ" },
];

export default function NeonPreview() {
  return (
    <div
      className="preview-root"
      style={
        {
          "--bg": "#09090d",
          "--bg-2": "#0f0f14",
          "--mint": "#00ffc8",
          "--magenta": "#ff2d95",
          "--cream": "#f0e8d0",
          "--muted": "#8a8a96",
          background: "var(--bg)",
          color: "var(--cream)",
          minHeight: "100vh",
          fontFamily: "var(--font-space-grotesk)",
          overflowX: "hidden",
        } as React.CSSProperties
      }
    >
      {/* Ambient grid */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          opacity: 0.06,
          backgroundImage:
            "linear-gradient(to right, #00ffc8 1px, transparent 1px), linear-gradient(to bottom, #00ffc8 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          zIndex: 1,
        }}
      />

      {/* HERO — 4-panel grid, everything visible */}
      <section
        style={{
          position: "relative",
          zIndex: 2,
          minHeight: "calc(100vh - 52px)",
          padding: "24px 28px",
          display: "grid",
          gridTemplateColumns: "1.6fr 1fr",
          gridTemplateRows: "auto 1fr auto",
          gap: 16,
        }}
      >
        {/* TOP-LEFT — Title panel (spans 2 rows) */}
        <div
          className="rise"
          style={{
            gridColumn: "1",
            gridRow: "1 / 3",
            background: "var(--bg-2)",
            border: "1px solid var(--mint)",
            padding: "28px 28px 32px",
            position: "relative",
            transform: "rotate(-0.4deg)",
            boxShadow: "0 0 0 1px rgba(0,255,200,0.2), 6px 6px 0 rgba(0,255,200,0.12)",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-jetbrains-mono)",
              fontSize: 10.5,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "var(--mint)",
              marginBottom: 24,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>◉ rec · field study</span>
            <span style={{ color: "var(--magenta)" }}>▲ arXiv:2509.14528</span>
          </div>

          <h1
            style={{
              fontSize: "clamp(36px, 4.6vw, 66px)",
              lineHeight: 0.92,
              fontWeight: 500,
              letterSpacing: "-0.035em",
              margin: 0,
              fontFamily: "var(--font-space-grotesk)",
            }}
          >
            Why Johnny{" "}
            <span
              style={{
                color: "var(--magenta)",
                fontFamily: "var(--font-fraunces)",
                fontStyle: "italic",
                fontWeight: 400,
              }}
            >
              can&rsquo;t
            </span>{" "}
            use agents.
          </h1>

          <p
            style={{
              fontSize: "clamp(14px, 1.1vw, 17px)",
              lineHeight: 1.5,
              margin: "22px 0 0",
              color: "var(--muted)",
              maxWidth: 520,
            }}
          >
            Industry aspirations versus user realities with AI agent software.{" "}
            <span style={{ color: "var(--cream)" }}>
              A systematic review of 102 agents, observed across 31 users.
            </span>
          </p>

          <div
            style={{
              marginTop: 28,
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
            }}
          >
            <a
              href="#"
              style={{
                padding: "9px 16px",
                background: "var(--mint)",
                color: "var(--bg)",
                fontFamily: "var(--font-jetbrains-mono)",
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              ↓ download.pdf
            </a>
            <a
              href="#"
              style={{
                padding: "9px 16px",
                background: "transparent",
                color: "var(--magenta)",
                border: "1px solid var(--magenta)",
                fontFamily: "var(--font-jetbrains-mono)",
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                textDecoration: "none",
              }}
            >
              → x_thread
            </a>
            <a
              href="#"
              style={{
                padding: "9px 16px",
                background: "transparent",
                color: "var(--cream)",
                border: "1px solid var(--cream)",
                fontFamily: "var(--font-jetbrains-mono)",
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                textDecoration: "none",
              }}
            >
              → linkedin
            </a>
          </div>

          {/* Bracket corner marks */}
          {[
            { top: 8, left: 8, borderTop: "2px solid var(--mint)", borderLeft: "2px solid var(--mint)", borderRight: 0, borderBottom: 0 },
            { top: 8, right: 8, borderTop: "2px solid var(--mint)", borderRight: "2px solid var(--mint)", borderLeft: 0, borderBottom: 0 },
            { bottom: 8, left: 8, borderBottom: "2px solid var(--mint)", borderLeft: "2px solid var(--mint)", borderTop: 0, borderRight: 0 },
            { bottom: 8, right: 8, borderBottom: "2px solid var(--mint)", borderRight: "2px solid var(--mint)", borderTop: 0, borderLeft: 0 },
          ].map((p, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                width: 14,
                height: 14,
                ...p,
              }}
            />
          ))}
        </div>

        {/* TOP-RIGHT — Byline panel */}
        <div
          className="rise"
          style={{
            gridColumn: "2",
            gridRow: "1",
            background: "var(--bg-2)",
            border: "1px solid var(--magenta)",
            padding: "18px 20px",
            transform: "rotate(0.8deg)",
            animationDelay: "0.08s",
            boxShadow: "-4px 4px 0 rgba(255,45,149,0.15)",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-jetbrains-mono)",
              fontSize: 10,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "var(--magenta)",
              marginBottom: 12,
            }}
          >
            ▲ authors
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {["Pradyumna Shome", "Sashreek Krishnan", "Sauvik Das"].map((name) => (
              <div
                key={name}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  fontFamily: "var(--font-space-grotesk)",
                  fontSize: 15,
                  fontWeight: 500,
                  letterSpacing: "-0.01em",
                }}
              >
                <span>{name}</span>
                <span
                  style={{
                    fontFamily: "var(--font-jetbrains-mono)",
                    fontSize: 9,
                    letterSpacing: "0.2em",
                    color: "var(--muted)",
                  }}
                >
                  CMU
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* MIDDLE-RIGHT — Stats panel */}
        <div
          className="rise"
          style={{
            gridColumn: "2",
            gridRow: "2",
            background: "var(--bg-2)",
            border: "1px solid var(--cream)",
            padding: "20px 22px",
            transform: "rotate(-0.6deg)",
            animationDelay: "0.16s",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-jetbrains-mono)",
              fontSize: 10,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "var(--cream)",
              marginBottom: 14,
              opacity: 0.75,
            }}
          >
            ◉ corpus
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              { n: "102", l: "agents analysed", c: "var(--mint)" },
              { n: "031", l: "participants", c: "var(--magenta)" },
              { n: "005", l: "barriers found", c: "var(--cream)" },
            ].map((s) => (
              <div
                key={s.l}
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                  borderBottom: "1px dashed rgba(240,232,208,0.15)",
                  paddingBottom: 10,
                }}
              >
                <span
                  style={{
                    fontSize: 34,
                    fontWeight: 500,
                    color: s.c,
                    lineHeight: 1,
                    letterSpacing: "-0.03em",
                    fontFamily: "var(--font-space-grotesk)",
                  }}
                >
                  {s.n}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-jetbrains-mono)",
                    fontSize: 10,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    opacity: 0.7,
                  }}
                >
                  {s.l}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM — Quote ticker panel (full width) */}
        <div
          className="rise"
          style={{
            gridColumn: "1 / span 2",
            gridRow: "3",
            background: "var(--bg-2)",
            border: "1px solid var(--mint)",
            padding: "14px 20px",
            display: "flex",
            alignItems: "center",
            gap: 20,
            animationDelay: "0.24s",
            overflow: "hidden",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-jetbrains-mono)",
              fontSize: 10,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "var(--mint)",
              flexShrink: 0,
              padding: "4px 10px",
              border: "1px solid var(--mint)",
            }}
          >
            ● LIVE · user quote
          </span>
          <blockquote
            style={{
              margin: 0,
              fontSize: 15,
              fontFamily: "var(--font-fraunces)",
              fontStyle: "italic",
              color: "var(--cream)",
              letterSpacing: "-0.005em",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            &ldquo;It&rsquo;s kind of like I&rsquo;m giving you a job, and
            you&rsquo;re throwing the job back at me.&rdquo;
          </blockquote>
          <span
            style={{
              fontFamily: "var(--font-jetbrains-mono)",
              fontSize: 10,
              letterSpacing: "0.2em",
              color: "var(--magenta)",
              flexShrink: 0,
              marginLeft: "auto",
            }}
          >
            P-14
          </span>
        </div>
      </section>

      {/* Taxonomy — 3 neon panels */}
      <section
        style={{
          position: "relative",
          zIndex: 2,
          padding: "48px 28px 80px",
          borderTop: "1px solid rgba(0,255,200,0.15)",
        }}
      >
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div
            style={{
              fontFamily: "var(--font-jetbrains-mono)",
              fontSize: 11,
              letterSpacing: "0.28em",
              color: "var(--mint)",
              marginBottom: 10,
              textTransform: "uppercase",
            }}
          >
            ◉ taxonomy.json
          </div>
          <h2
            style={{
              fontSize: "clamp(28px, 3.8vw, 48px)",
              lineHeight: 0.95,
              fontWeight: 500,
              margin: "0 0 36px",
              letterSpacing: "-0.025em",
              fontFamily: "var(--font-space-grotesk)",
            }}
          >
            Three kinds of agent,{" "}
            <span
              style={{
                color: "var(--magenta)",
                fontFamily: "var(--font-fraunces)",
                fontStyle: "italic",
                fontWeight: 400,
              }}
            >
              categorised.
            </span>
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 16,
            }}
          >
            {taxonomy.map((t, i) => {
              const c = i === 0 ? "var(--mint)" : i === 1 ? "var(--magenta)" : "var(--cream)";
              return (
                <div
                  key={t.n}
                  style={{
                    background: "var(--bg-2)",
                    border: `1px solid ${c}`,
                    padding: "22px 22px 20px",
                    position: "relative",
                    transform: `rotate(${(i - 1) * 0.5}deg)`,
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 10,
                      right: 12,
                      fontFamily: "var(--font-jetbrains-mono)",
                      fontSize: 10,
                      letterSpacing: "0.22em",
                      color: c,
                    }}
                  >
                    [{t.n}]
                  </div>
                  <h3
                    style={{
                      fontSize: 26,
                      fontWeight: 500,
                      margin: "6px 0 10px",
                      letterSpacing: "-0.015em",
                      color: c,
                      fontFamily: "var(--font-space-grotesk)",
                    }}
                  >
                    {t.t}
                  </h3>
                  <p style={{ fontSize: 13.5, lineHeight: 1.55, margin: "0 0 20px", color: "var(--muted)" }}>
                    {t.d}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: 10,
                      borderTop: `1px dashed ${c}55`,
                      paddingTop: 12,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 32,
                        fontWeight: 500,
                        lineHeight: 1,
                        color: c,
                        letterSpacing: "-0.03em",
                        fontFamily: "var(--font-space-grotesk)",
                      }}
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
