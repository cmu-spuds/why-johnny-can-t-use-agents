"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Download,
  Copy,
  Check,
  Menu,
  X,
  ArrowRight,
  ArrowDown,
} from "lucide-react";
import { getAssetPath } from "@/utils/basePath";

const AUTHORS = [
  {
    name: "Pradyumna Shome",
    role: "First author",
    affiliation: "Carnegie Mellon University",
    image: "/pradyumna-shome.webp",
    link: "https://pradyumnashome.com",
  },
  {
    name: "Sashreek Krishnan",
    role: "Co-author",
    affiliation: "Carnegie Mellon University",
    image: "/sashreek-krishnan.jpeg",
    link: "https://www.linkedin.com/in/sashreek-krishnan/",
  },
  {
    name: "Sauvik Das",
    role: "Principal investigator",
    affiliation: "Carnegie Mellon University",
    image: "/sauvik-das.png",
    link: "https://sauvikdas.com",
  },
];

const TAXONOMY = [
  {
    n: "2.1.1",
    title: "Orchestration",
    desc: "Agents that act on behalf of users to manipulate software interfaces across applications and websites.",
    count: 31,
    examples: "Salesforce Agentforce, Microsoft Copilot",
  },
  {
    n: "2.1.2",
    title: "Creation",
    desc: "Agents that generate structured documents with well-defined formats (slides, websites, designs).",
    count: 33,
    examples: "Lovable, Gamma, Beautiful.AI",
  },
  {
    n: "2.1.3",
    title: "Insight",
    desc: "Agents that distill large amounts of information into structured, user-facing takeaways.",
    count: 87,
    examples: "Perplexity, Spotify AI DJ",
  },
];

const SUS = [
  { task: "Holiday planning", op: 88.8, ma: 78.0, note: "Excellent / Good" },
  { task: "Stipend budgeting", op: 84.2, ma: 71.2, note: "Good / Good" },
  { task: "Slide making", op: 69.8, ma: 90.6, note: "Fair / Excellent" },
];

const BARRIERS = [
  {
    title: "Misaligned mental models",
    blurb: "Users cannot predict what an agent is actually able to do.",
    quote:
      "You've got to sit there and make sure that your initial prompt is perfect.",
    explanation:
      "Users can't predict the agent's actual capabilities, turning delegation into frustrating 'prompt gambling.'",
  },
  {
    title: "Presuming trust",
    blurb: "Agents expect delegation before earning user confidence.",
    quote: "I was waiting for it to ask me for some more information.",
    explanation:
      "Agents expect immediate delegation without first establishing credibility through preference-elicitation or demonstrating competence for sensitive tasks.",
  },
  {
    title: "Inflexible collaboration",
    blurb: "Agents do not adapt their interaction style to the user or task.",
    quote:
      "It's kind of like I'm giving you a job, and you're throwing the job back at me.",
    explanation:
      "They act as 'lone wolf' execution tools that fail to adapt to a user's need for hands-on guidance or mid-task oversight.",
  },
  {
    title: "Communication overhead",
    blurb: "Agents overwhelm users with output and ask for inarticulable input.",
    quote:
      "Oh, my God! It threw out so much stuff... it's almost an overwhelming amount of information.",
    explanation:
      "Agents generate excessive, poorly-formatted output and force users to articulate complex, subjective preferences in a cognitively demanding way.",
  },
  {
    title: "Metacognitive gaps",
    blurb: "Agents lack self-awareness of their errors and limitations.",
    quote:
      "It just was kind of circling... it's seeking to provide an answer rather than to say 'I don't know.'",
    explanation:
      "They lack the self-awareness to recognise their own errors, leading to time-wasting 'try-fail cycles' that require manual human debugging.",
  },
];

const RECS = [
  {
    title: "Know your user",
    desc: "Actively collect preferences, skills, and collaboration styles before executing a task.",
  },
  {
    title: "Know yourself",
    desc: "Develop metacognitive abilities to recognise capability limits and stop confidently.",
  },
  {
    title: "Be adaptable",
    desc: "Adapt the interface and interaction style based on task type and user signals.",
  },
  {
    title: "Measure twice, cut once",
    desc: "Surface planning and checkpoints so users can steer before and during execution.",
  },
  {
    title: "Show, don't tell",
    desc: "Support multiple input modalities beyond free-form text prompts.",
  },
  {
    title: "Next time's the charm",
    desc: "Enable precise iteration on outputs via contextual, direct-manipulation controls.",
  },
];

const CITATION = `@inproceedings{shome2026johnny,
  title={Why Johnny Can't Use Agents: Industry Aspirations vs. User Realities with AI Agent Software},
  author={Shome, Pradyumna and Krishnan, Sashreek and Das, Sauvik},
  booktitle={Proceedings of the ACM Conference on AI and Agentic Systems (CAIS '26)},
  year={2026}
}`;

/* ---- Small shared components ---- */

function SectionNumber({ num, label }: { num: string; label: string }) {
  return (
    <div
      style={{
        fontFamily: "var(--font-jetbrains-mono)",
        fontSize: 11,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: "var(--crimson)",
        display: "flex",
        alignItems: "center",
        gap: 10,
        marginBottom: 14,
      }}
    >
      <span style={{ color: "var(--crimson)" }}>§ {num}</span>
      <span style={{ width: 28, height: 1, background: "var(--crimson)" }} />
      <span style={{ color: "var(--ink-muted)" }}>{label}</span>
    </div>
  );
}

function SectionHeading({
  num,
  title,
}: {
  num: string;
  title: React.ReactNode;
}) {
  return (
    <h2
      className="font-display"
      style={{
        fontFamily: "var(--font-fraunces)",
        fontSize: "clamp(30px, 3.6vw, 44px)",
        fontWeight: 500,
        letterSpacing: "-0.018em",
        lineHeight: 1.1,
        margin: "0 0 8px",
        color: "var(--ink)",
      }}
    >
      <span style={{ color: "var(--crimson)", marginRight: 12, fontWeight: 400 }}>
        {num}.
      </span>
      {title}
    </h2>
  );
}

function SubHeading({
  num,
  title,
}: {
  num: string;
  title: React.ReactNode;
}) {
  return (
    <h3
      style={{
        fontFamily: "var(--font-fraunces)",
        fontSize: 22,
        fontWeight: 500,
        letterSpacing: "-0.01em",
        lineHeight: 1.2,
        margin: "36px 0 10px",
        color: "var(--ink)",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-jetbrains-mono)",
          fontSize: 13,
          color: "var(--crimson)",
          marginRight: 10,
          letterSpacing: "0.05em",
        }}
      >
        {num}
      </span>
      {title}
    </h3>
  );
}

function Figure({
  id,
  caption,
  children,
}: {
  id: string;
  caption: string;
  children: React.ReactNode;
}) {
  return (
    <figure style={{ margin: "32px 0" }}>
      <div
        style={{
          border: "1px solid var(--ink)",
          background: "var(--paper-2)",
          padding: "28px 24px",
        }}
      >
        {children}
      </div>
      <figcaption
        style={{
          marginTop: 10,
          fontFamily: "var(--font-newsreader)",
          fontSize: 14,
          fontStyle: "italic",
          color: "var(--ink-muted)",
          lineHeight: 1.5,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-jetbrains-mono)",
            fontStyle: "normal",
            fontSize: 11,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--crimson)",
            marginRight: 10,
          }}
        >
          {id}
        </span>
        {caption}
      </figcaption>
    </figure>
  );
}

/* ---- Page ---- */

export default function Home() {
  const [copied, setCopied] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [flipped, setFlipped] = useState<number[]>([]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CITATION);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  const toggleFlip = (i: number) =>
    setFlipped((p) => (p.includes(i) ? p.filter((x) => x !== i) : [...p, i]));

  const navLinks = [
    ["#abstract", "Abstract"],
    ["#methodology", "Methodology"],
    ["#findings", "Findings"],
    ["#barriers", "Barriers"],
    ["#recommendations", "Recommendations"],
    ["#citation", "Cite"],
  ];

  const bodyStyle: React.CSSProperties = {
    fontFamily: "var(--font-newsreader)",
    fontSize: 18,
    lineHeight: 1.65,
    color: "var(--ink)",
  };

  return (
    <div
      style={{
        background: "var(--paper)",
        color: "var(--ink)",
        minHeight: "100vh",
      }}
    >
      {/* ===================== NAV ===================== */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(245,239,227,0.92)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          borderBottom: "1px solid var(--ink)",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "12px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
          }}
        >
          <a
            href="#top"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              color: "var(--ink)",
              textDecoration: "none",
            }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                background: "var(--crimson)",
                display: "inline-block",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-fraunces)",
                fontSize: 16,
                fontWeight: 500,
                letterSpacing: "-0.01em",
              }}
            >
              Why Johnny Can&rsquo;t Use Agents
            </span>
          </a>

          <div
            className="hidden md:flex"
            style={{ alignItems: "center", gap: 22 }}
          >
            {navLinks.map(([href, label]) => (
              <a
                key={href}
                href={href}
                style={{
                  fontFamily: "var(--font-jetbrains-mono)",
                  fontSize: 11.5,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--ink-soft)",
                  textDecoration: "none",
                }}
              >
                {label}
              </a>
            ))}
          </div>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden"
            aria-label="Toggle menu"
            style={{
              background: "transparent",
              border: "1px solid var(--ink)",
              padding: 6,
              color: "var(--ink)",
              cursor: "pointer",
            }}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
        {mobileOpen && (
          <div
            className="md:hidden"
            style={{
              background: "var(--paper)",
              borderTop: "1px solid var(--ink)",
              padding: "12px 24px 18px",
            }}
          >
            {navLinks.map(([href, label]) => (
              <a
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: "block",
                  padding: "8px 0",
                  fontFamily: "var(--font-jetbrains-mono)",
                  fontSize: 12.5,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--ink)",
                  textDecoration: "none",
                }}
              >
                {label}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* ===================== HERO / TITLE PAGE ===================== */}
      <header
        id="top"
        style={{
          borderBottom: "1px solid var(--ink)",
          padding: "64px 24px 48px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* one subtle halftone disc bottom-right — the *only* riso flourish here */}
        <div
          style={{
            position: "absolute",
            bottom: -80,
            right: -60,
            width: 260,
            height: 260,
            color: "var(--crimson)",
            opacity: 0.18,
            pointerEvents: "none",
          }}
          className="halftone-dots"
        />

        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            position: "relative",
            zIndex: 2,
          }}
        >
          <div
            className="rise"
            style={{
              fontFamily: "var(--font-jetbrains-mono)",
              fontSize: 11,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--crimson)",
              marginBottom: 24,
            }}
          >
            ACM Conference on AI and Agentic Systems (
            <a
              href="https://caisconf.org"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "var(--crimson)",
                textDecoration: "underline",
                textUnderlineOffset: 3,
              }}
            >
              CAIS
            </a>
            ), May 2026
          </div>

          <h1
            className="rise"
            style={{
              fontFamily: "var(--font-fraunces)",
              fontSize: "clamp(36px, 5.2vw, 64px)",
              lineHeight: 1.02,
              fontWeight: 500,
              letterSpacing: "-0.025em",
              margin: "0 0 16px",
              maxWidth: 920,
              animationDelay: "0.05s",
            }}
          >
            Why Johnny{" "}
            <em
              style={{
                fontStyle: "italic",
                fontWeight: 400,
                color: "var(--crimson)",
              }}
            >
              can&rsquo;t
            </em>{" "}
            use agents
          </h1>

          <p
            className="rise"
            style={{
              fontFamily: "var(--font-newsreader)",
              fontSize: "clamp(18px, 1.7vw, 22px)",
              fontStyle: "italic",
              lineHeight: 1.45,
              color: "var(--ink-soft)",
              maxWidth: 760,
              margin: "0 0 36px",
              animationDelay: "0.12s",
            }}
          >
            Industry aspirations versus user realities with AI agent software.
          </p>

          {/* Authors with photos — inline in hero, replaces separate Team section */}
          <div
            id="team"
            className="rise"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "18px 32px",
              marginBottom: 40,
              animationDelay: "0.18s",
            }}
          >
            {AUTHORS.map((a) => (
              <a
                key={a.name}
                href={a.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  textDecoration: "none",
                  color: "var(--ink)",
                }}
              >
                <div
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: "50%",
                    border: "1.5px solid var(--ink)",
                    overflow: "hidden",
                    flexShrink: 0,
                    background: "var(--paper-2)",
                  }}
                >
                  <Image
                    src={getAssetPath(a.image)}
                    alt={a.name}
                    width={144}
                    height={144}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-newsreader)",
                      fontSize: 16,
                      textDecoration: "underline",
                      textUnderlineOffset: 3,
                      textDecorationThickness: 1,
                      lineHeight: 1.2,
                    }}
                  >
                    {a.name}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-jetbrains-mono)",
                      fontSize: 11,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "var(--ink-muted)",
                      marginTop: 4,
                    }}
                  >
                    Carnegie Mellon University
                  </span>
                </div>
              </a>
            ))}
          </div>

          {/* Download / links */}
          <div
            className="rise"
            style={{
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
              marginBottom: 44,
              animationDelay: "0.28s",
            }}
          >
            <a
              href="https://arxiv.org/pdf/2509.14528"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 18px",
                background: "var(--ink)",
                color: "var(--paper)",
                fontFamily: "var(--font-jetbrains-mono)",
                fontSize: 12,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                textDecoration: "none",
              }}
            >
              <Download className="w-4 h-4" /> Download PDF
            </a>
            <a
              href="https://x.com/PradyumnaShome/status/1969163098507362790"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 18px",
                background: "transparent",
                color: "var(--ink)",
                border: "1px solid var(--ink)",
                fontFamily: "var(--font-jetbrains-mono)",
                fontSize: 12,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                textDecoration: "none",
              }}
            >
              X thread ↗
            </a>
            <a
              href="https://www.linkedin.com/posts/pradyumna-shome_aiagents-generativeai-ux-activity-7374933110213398530-6Cie"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 18px",
                background: "transparent",
                color: "var(--ink)",
                border: "1px solid var(--ink)",
                fontFamily: "var(--font-jetbrains-mono)",
                fontSize: 12,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                textDecoration: "none",
              }}
            >
              LinkedIn ↗
            </a>
          </div>

          {/* Stats inline */}
          <div
            className="rise"
            style={{
              borderTop: "1px solid var(--ink)",
              borderBottom: "1px solid var(--ink)",
              padding: "20px 0",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 180px), 1fr))",
              gap: 24,
              animationDelay: "0.34s",
            }}
          >
            {[
              { n: "102", l: "commercial agents reviewed", s: "Systematic corpus" },
              { n: "31", l: "participants observed", s: "Think-aloud study" },
              { n: "5", l: "usability barriers identified", s: "Thematic analysis" },
            ].map((s) => (
              <div key={s.l}>
                <div
                  style={{
                    fontFamily: "var(--font-fraunces)",
                    fontSize: 42,
                    fontWeight: 500,
                    lineHeight: 1,
                    letterSpacing: "-0.03em",
                    color: "var(--ink)",
                  }}
                >
                  {s.n}
                </div>
                <div
                  style={{
                    marginTop: 6,
                    fontSize: 14,
                    fontFamily: "var(--font-newsreader)",
                    color: "var(--ink)",
                  }}
                >
                  {s.l}
                </div>
                <div
                  style={{
                    marginTop: 2,
                    fontFamily: "var(--font-jetbrains-mono)",
                    fontSize: 10,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--ink-muted)",
                  }}
                >
                  {s.s}
                </div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* ===================== ABSTRACT ===================== */}
      <section
        id="abstract"
        style={{ padding: "64px 24px 56px", borderBottom: "1px solid var(--ink)" }}
      >
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <SectionNumber num="0" label="Abstract" />
          <h2
            style={{
              fontFamily: "var(--font-fraunces)",
              fontSize: "clamp(26px, 3vw, 36px)",
              fontWeight: 500,
              letterSpacing: "-0.015em",
              lineHeight: 1.15,
              margin: "0 0 24px",
            }}
          >
            An investigation into delegated work.
          </h2>
          <p style={{ ...bodyStyle, margin: "0 0 18px" }}>
            There is growing imprecision about what &ldquo;AI agents&rdquo; are,
            what they can do, and how effectively they can be used by their
            intended users. We pose two research questions:{" "}
            <em style={{ fontStyle: "italic" }}>
              (i) how does the tech industry conceive of and market &ldquo;AI
              agents,&rdquo;
            </em>{" "}
            and{" "}
            <em style={{ fontStyle: "italic" }}>
              (ii) what challenges do end-users face when attempting to use
              commercial AI agents for their advertised uses?
            </em>
          </p>
          <p style={{ ...bodyStyle, margin: 0 }}>
            We performed a systematic review of marketed use cases for{" "}
            <strong>102 commercial AI agents</strong>, finding that they fall
            into three umbrella categories —{" "}
            <strong style={{ color: "var(--crimson)" }}>orchestration</strong>,{" "}
            <strong style={{ color: "var(--crimson)" }}>creation</strong>, and{" "}
            <strong style={{ color: "var(--crimson)" }}>insight</strong>. We
            then observed <strong>N = 31 participants</strong> attempting
            representative tasks for each category on two popular commercial AI
            agent tools, surfacing five usability barriers and six design
            recommendations.
          </p>
        </div>
      </section>

      {/* ===================== 1. METHODOLOGY ===================== */}
      <section
        id="methodology"
        style={{ padding: "72px 24px", borderBottom: "1px solid var(--ink)" }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <SectionNumber num="1" label="Methodology" />
          <SectionHeading
            num="1"
            title={<>A mixed-methods approach.</>}
          />
          <p
            style={{
              ...bodyStyle,
              maxWidth: 760,
              margin: "16px 0 0",
              color: "var(--ink-soft)",
            }}
          >
            Our study proceeds in two parts. First, a systematic review of
            commercial agents yields a taxonomy of marketed use cases. Second,
            a think-aloud and interview study observes real users attempting
            representative tasks drawn from that taxonomy.
          </p>

          <Figure
            id="Fig. 1"
            caption="Research process, from research question to findings. Each question is answered through a complementary chain of methods."
          >
            <FlowDiagram />
          </Figure>
        </div>
      </section>

      {/* ===================== 2. FINDINGS ===================== */}
      <section
        id="findings"
        style={{ padding: "72px 24px", borderBottom: "1px solid var(--ink)" }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <SectionNumber num="2" label="Findings" />
          <SectionHeading
            num="2"
            title={<>What the industry sells &amp; how well users can use it.</>}
          />

          <SubHeading num="2.1" title="Taxonomy of commercial AI agents" />
          <p
            style={{
              ...bodyStyle,
              maxWidth: 760,
              margin: "10px 0 20px",
              color: "var(--ink-soft)",
            }}
          >
            Across 102 reviewed tools, marketed use cases cluster into three
            categories. Counts exceed 102 because many agents span more than
            one category.
          </p>

          {/* Table 1 — taxonomy */}
          <div
            style={{
              border: "1px solid var(--ink)",
              borderBottom: "none",
              marginTop: 16,
            }}
          >
            <div
              className="tx-header"
              style={{
                background: "var(--ink)",
                color: "var(--paper)",
                display: "grid",
                gridTemplateColumns: "100px 1.5fr 1fr 80px",
                padding: "10px 16px",
                fontFamily: "var(--font-jetbrains-mono)",
                fontSize: 11,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
              }}
            >
              <span>§</span>
              <span>Category</span>
              <span>Examples</span>
              <span style={{ textAlign: "right" }}>N</span>
            </div>
            {TAXONOMY.map((t, i) => (
              <div
                key={t.n}
                className="tx-row"
                style={{
                  display: "grid",
                  gridTemplateColumns: "100px 1.5fr 1fr 80px",
                  padding: "20px 16px",
                  borderBottom: "1px solid var(--ink)",
                  alignItems: "baseline",
                  background: i === 1 ? "var(--paper-2)" : "transparent",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-jetbrains-mono)",
                    fontSize: 12,
                    color: "var(--crimson)",
                    letterSpacing: "0.05em",
                  }}
                >
                  {t.n}
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-fraunces)",
                      fontSize: 22,
                      fontWeight: 500,
                      letterSpacing: "-0.01em",
                      marginBottom: 6,
                    }}
                  >
                    {t.title}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-newsreader)",
                      fontSize: 15,
                      lineHeight: 1.5,
                      color: "var(--ink-soft)",
                      maxWidth: 520,
                    }}
                  >
                    {t.desc}
                  </div>
                </div>
                <div
                  className="tx-examples"
                  style={{
                    fontFamily: "var(--font-newsreader)",
                    fontSize: 14,
                    fontStyle: "italic",
                    color: "var(--ink-muted)",
                  }}
                >
                  <span className="mobile-only" style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 10.5, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-muted)", fontStyle: "normal", marginRight: 8 }}>e.g.</span>
                  {t.examples}
                </div>
                <div
                  className="tx-count"
                  style={{
                    textAlign: "right",
                    fontFamily: "var(--font-fraunces)",
                    fontSize: 28,
                    fontWeight: 500,
                    letterSpacing: "-0.02em",
                    color: "var(--crimson)",
                  }}
                >
                  {t.count}
                  <span className="mobile-only" style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ink-muted)", fontWeight: 400, marginLeft: 8 }}>agents</span>
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              fontFamily: "var(--font-newsreader)",
              fontSize: 13,
              fontStyle: "italic",
              color: "var(--ink-muted)",
              marginTop: 10,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-jetbrains-mono)",
                fontStyle: "normal",
                fontSize: 11,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--crimson)",
                marginRight: 10,
              }}
            >
              Tab. 1
            </span>
            Taxonomy of 102 commercial AI agents by primary marketed use case.
          </div>

          <SubHeading num="2.2" title="Usability ratings by task" />
          <p
            style={{
              ...bodyStyle,
              maxWidth: 760,
              margin: "10px 0 20px",
              color: "var(--ink-soft)",
            }}
          >
            Participants rated the usability of two tools — OpenAI Operator and
            Manus — on three representative tasks using the System Usability
            Scale (SUS, 0–100, higher is better).
          </p>

          <SusTable />
        </div>
      </section>

      {/* ===================== 3. BARRIERS ===================== */}
      <section
        id="barriers"
        style={{ padding: "72px 24px", borderBottom: "1px solid var(--ink)" }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <SectionNumber num="3" label="Usability barriers" />
          <SectionHeading
            num="3"
            title={<>Five barriers to agent delegation.</>}
          />
          <p
            style={{
              ...bodyStyle,
              maxWidth: 760,
              margin: "16px 0 28px",
              color: "var(--ink-soft)",
            }}
          >
            Despite generally positive usability scores, participants reported
            recurring frustrations. Five themes emerged from the qualitative
            data; click a card to reveal a representative quote.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
              gap: 14,
            }}
          >
            {BARRIERS.map((b, i) => {
              const isFlipped = flipped.includes(i);
              return (
                <div
                  key={i}
                  className="perspective-1200"
                  style={{ minHeight: 260 }}
                >
                  <div
                    onClick={() => toggleFlip(i)}
                    className="preserve-3d"
                    style={{
                      position: "relative",
                      width: "100%",
                      height: 260,
                      cursor: "pointer",
                      transition: "transform 0.7s cubic-bezier(0.2,0.8,0.2,1)",
                      transform: isFlipped
                        ? "rotateY(180deg)"
                        : "rotateY(0deg)",
                    }}
                  >
                    {/* Front */}
                    <div
                      className="backface-hidden"
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "var(--paper-2)",
                        border: "1px solid var(--ink)",
                        padding: "18px 20px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontFamily: "var(--font-jetbrains-mono)",
                            fontSize: 11,
                            letterSpacing: "0.18em",
                            textTransform: "uppercase",
                            color: "var(--crimson)",
                            marginBottom: 14,
                          }}
                        >
                          Barrier {String(i + 1).padStart(2, "0")}
                        </div>
                        <h3
                          style={{
                            fontFamily: "var(--font-fraunces)",
                            fontSize: 22,
                            fontWeight: 500,
                            letterSpacing: "-0.015em",
                            lineHeight: 1.2,
                            margin: "0 0 10px",
                          }}
                        >
                          {b.title}
                        </h3>
                        <p
                          style={{
                            fontFamily: "var(--font-newsreader)",
                            fontSize: 15,
                            lineHeight: 1.5,
                            margin: 0,
                            color: "var(--ink-soft)",
                          }}
                        >
                          {b.blurb}
                        </p>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          fontFamily: "var(--font-jetbrains-mono)",
                          fontSize: 10.5,
                          letterSpacing: "0.16em",
                          textTransform: "uppercase",
                          color: "var(--ink-muted)",
                        }}
                      >
                        Click for quote
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    {/* Back */}
                    <div
                      className="backface-hidden rotate-y-180"
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "var(--ink)",
                        color: "var(--paper)",
                        border: "1px solid var(--ink)",
                        padding: "18px 20px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontFamily: "var(--font-jetbrains-mono)",
                            fontSize: 11,
                            letterSpacing: "0.18em",
                            textTransform: "uppercase",
                            color: "#ff8a8f",
                            marginBottom: 12,
                          }}
                        >
                          Quote · B{String(i + 1).padStart(2, "0")}
                        </div>
                        <blockquote
                          style={{
                            fontFamily: "var(--font-newsreader)",
                            fontSize: 16.5,
                            fontStyle: "italic",
                            lineHeight: 1.45,
                            margin: "0 0 10px",
                            color: "var(--paper)",
                          }}
                        >
                          &ldquo;{b.quote}&rdquo;
                        </blockquote>
                        <p
                          style={{
                            fontFamily: "var(--font-newsreader)",
                            fontSize: 13.5,
                            lineHeight: 1.5,
                            margin: 0,
                            color: "rgba(245,239,227,0.92)",
                          }}
                        >
                          {b.explanation}
                        </p>
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-jetbrains-mono)",
                          fontSize: 10.5,
                          letterSpacing: "0.16em",
                          textTransform: "uppercase",
                          color: "rgba(245,239,227,0.78)",
                        }}
                      >
                        ← back
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================== 4. RECOMMENDATIONS ===================== */}
      <section
        id="recommendations"
        style={{ padding: "72px 24px", borderBottom: "1px solid var(--ink)" }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <SectionNumber num="4" label="Design recommendations" />
          <SectionHeading
            num="4"
            title={<>Six recommendations for next-generation agents.</>}
          />

          <div
            style={{
              marginTop: 32,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              borderTop: "1px solid var(--ink)",
              borderLeft: "1px solid var(--ink)",
            }}
          >
            {RECS.map((r, i) => (
              <div
                key={r.title}
                style={{
                  padding: "22px 22px 24px",
                  borderRight: "1px solid var(--ink)",
                  borderBottom: "1px solid var(--ink)",
                  background: i % 2 === 0 ? "transparent" : "var(--paper-2)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-jetbrains-mono)",
                    fontSize: 11,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--crimson)",
                    marginBottom: 10,
                  }}
                >
                  4.{i + 1}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-fraunces)",
                    fontSize: 21,
                    fontWeight: 500,
                    letterSpacing: "-0.01em",
                    margin: "0 0 8px",
                  }}
                >
                  {r.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-newsreader)",
                    fontSize: 15,
                    lineHeight: 1.55,
                    margin: 0,
                    color: "var(--ink-soft)",
                  }}
                >
                  {r.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== CITATION ===================== */}
      <section
        id="citation"
        style={{ padding: "72px 24px", borderBottom: "1px solid var(--ink)" }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "var(--font-fraunces)",
              fontSize: "clamp(30px, 3.6vw, 44px)",
              fontWeight: 500,
              letterSpacing: "-0.018em",
              lineHeight: 1.1,
              margin: "0 0 8px",
              color: "var(--ink)",
            }}
          >
            Citation.
          </h2>

          <div
            style={{
              marginTop: 24,
              border: "1px solid var(--ink)",
              background: "var(--paper-2)",
            }}
          >
            <div
              style={{
                borderBottom: "1px solid var(--ink)",
                padding: "10px 16px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontFamily: "var(--font-jetbrains-mono)",
                fontSize: 11,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--ink-soft)",
              }}
            >
              <span>BibTeX</span>
              <button
                onClick={copy}
                style={{
                  background: copied ? "var(--crimson)" : "var(--ink)",
                  color: "var(--paper)",
                  border: "none",
                  padding: "5px 12px",
                  fontFamily: "var(--font-jetbrains-mono)",
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" /> Copy
                  </>
                )}
              </button>
            </div>
            <pre
              style={{
                margin: 0,
                padding: "16px 20px",
                fontFamily: "var(--font-jetbrains-mono)",
                fontSize: 12.5,
                lineHeight: 1.6,
                color: "var(--ink)",
                overflowX: "auto",
                whiteSpace: "pre",
              }}
            >
              {CITATION}
            </pre>
          </div>
        </div>
      </section>

      {/* ===================== FOOTER ===================== */}
      <footer
        style={{
          padding: "40px 24px 56px",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            gap: 16,
            flexWrap: "wrap",
            fontFamily: "var(--font-jetbrains-mono)",
            fontSize: 11,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--ink-muted)",
          }}
        >
          <span>© 2026 Carnegie Mellon University</span>
          <span>
            Funded by NSF Award <span style={{ color: "var(--crimson)" }}>#2316768</span>
          </span>
        </div>
      </footer>
    </div>
  );
}

/* ================================================================== */
/* FlowDiagram — methodology figure                                   */
/* ================================================================== */

function FlowDiagram() {
  const Row = ({
    label,
    steps,
    rqColor,
  }: {
    label: string;
    steps: string[];
    rqColor: "crimson" | "blue";
  }) => (
    <div style={{ marginBottom: 20 }}>
      <div
        style={{
          fontFamily: "var(--font-jetbrains-mono)",
          fontSize: 11,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: `var(--${rqColor})`,
          fontWeight: 700,
          marginBottom: 10,
        }}
      >
        {label}
      </div>
      <div
        style={{
          display: "flex",
          gap: 8,
          alignItems: "stretch",
          flexWrap: "wrap",
        }}
      >
        {steps.map((s, i) => (
          <React.Fragment key={i}>
            <div
              style={{
                flex: 1,
                minWidth: 130,
                border: `1px solid var(--${rqColor})`,
                background: "var(--paper)",
                padding: "12px 14px",
                fontFamily: "var(--font-newsreader)",
                fontSize: 13.5,
                lineHeight: 1.35,
                color: "var(--ink)",
                display: "flex",
                alignItems: "center",
              }}
            >
              {s}
            </div>
            {i < steps.length - 1 && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  color: "var(--ink-muted)",
                  fontFamily: "var(--font-jetbrains-mono)",
                  fontSize: 18,
                }}
              >
                →
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      <Row
        label="RQ1 · How does industry conceive AI agents?"
        rqColor="crimson"
        steps={["Systematic review (102 agents)", "Taxonomy of use cases", "Representative tasks"]}
      />
      <Row
        label="RQ2 · What challenges do users face?"
        rqColor="blue"
        steps={[
          "Think-aloud sessions (N = 31)",
          "Semi-structured interviews",
          "Usability barriers",
          "Design implications",
        ]}
      />
    </div>
  );
}

/* ================================================================== */
/* SusTable — usability scores table with inline bars                  */
/* ================================================================== */

function SusTable() {
  return (
    <div style={{ border: "1px solid var(--ink)", marginTop: 16 }}>
      <div
        className="sus-header"
        style={{
          background: "var(--ink)",
          color: "var(--paper)",
          display: "grid",
          gridTemplateColumns: "1.3fr 1.4fr 1.4fr 1fr",
          padding: "10px 16px",
          fontFamily: "var(--font-jetbrains-mono)",
          fontSize: 11,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
        }}
      >
        <span>Task</span>
        <span>
          Operator{" "}
          <span
            style={{
              display: "inline-block",
              width: 8,
              height: 8,
              background: "var(--crimson)",
              marginLeft: 4,
              verticalAlign: "middle",
            }}
          />
        </span>
        <span>
          Manus{" "}
          <span
            style={{
              display: "inline-block",
              width: 8,
              height: 8,
              background: "var(--blue)",
              marginLeft: 4,
              verticalAlign: "middle",
            }}
          />
        </span>
        <span style={{ textAlign: "right" }}>Interpretation</span>
      </div>

      {SUS.map((s, i) => (
        <div
          key={s.task}
          className="sus-row"
          style={{
            display: "grid",
            gridTemplateColumns: "1.3fr 1.4fr 1.4fr 1fr",
            padding: "16px 16px",
            alignItems: "center",
            gap: 12,
            borderBottom:
              i < SUS.length - 1 ? "1px solid var(--ink)" : "none",
            background: i === 1 ? "var(--paper-2)" : "transparent",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-fraunces)",
              fontSize: 17,
              fontWeight: 500,
              letterSpacing: "-0.005em",
            }}
          >
            {s.task}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span className="sus-tool-label" style={{ color: "var(--crimson)" }}>Operator</span>
            <div
              style={{
                flex: 1,
                height: 8,
                background: "var(--paper-3)",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  width: `${s.op}%`,
                  background: "var(--crimson)",
                }}
              />
            </div>
            <div
              style={{
                fontFamily: "var(--font-fraunces)",
                fontSize: 17,
                fontWeight: 500,
                color: "var(--crimson)",
                minWidth: 40,
                textAlign: "right",
              }}
            >
              {s.op.toFixed(1)}
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span className="sus-tool-label" style={{ color: "var(--blue)" }}>Manus</span>
            <div
              style={{
                flex: 1,
                height: 8,
                background: "var(--paper-3)",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  width: `${s.ma}%`,
                  background: "var(--blue)",
                }}
              />
            </div>
            <div
              style={{
                fontFamily: "var(--font-fraunces)",
                fontSize: 17,
                fontWeight: 500,
                color: "var(--blue)",
                minWidth: 40,
                textAlign: "right",
              }}
            >
              {s.ma.toFixed(1)}
            </div>
          </div>

          <div
            className="sus-interp"
            style={{
              fontFamily: "var(--font-newsreader)",
              fontSize: 13,
              fontStyle: "italic",
              color: "var(--ink-muted)",
              textAlign: "right",
            }}
          >
            {s.note}
          </div>
        </div>
      ))}
      <div
        style={{
          padding: "8px 16px",
          fontFamily: "var(--font-jetbrains-mono)",
          fontSize: 10.5,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--ink-muted)",
          borderTop: "1px solid var(--ink)",
          background: "var(--paper-2)",
        }}
      >
        Tab. 2 — SUS scores (0–100, higher is better) · Operator vs. Manus across three task types.
      </div>
    </div>
  );
}
