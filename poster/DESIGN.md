# Poster Design Guide

Reusable best practices distilled from building the *Why Johnny Can't Use Agents*
conference poster (`poster.tex`, XeLaTeX, 48″×48″). Read this before starting a new
poster or making large edits to this one.

---

## 1. Canvas & margins

- **Square 48″×48″** board. Set once in `geometry`:
  `\usepackage[paperwidth=48in,paperheight=48in,top=1in,bottom=1in,left=1in,right=1in]{geometry}`
- **Keep all four margins equal.** A poster reads as "off" the moment one margin
  differs. We standardized on **1in all around**.
- The page is one giant single page. **Font point sizes are absolute**, not relative
  to the page — enlarging the canvas does *not* enlarge the text. If you rescale the
  board, rescale every `\fontsize`, `\vspace`, image dimension, and TikZ coordinate by
  the same factor (see `_upscale.py` / `_fontscale.py`).

## 2. Readability floor (the most important rule)

- **No body/content text smaller than ~34pt.** On a 48″ board viewed from a few feet,
  anything under ~30pt is unreadable. We made the research-question text (34pt) the
  *minimum* and brought all prose up to it.
- Hierarchy above the floor: section headings ~44pt, card titles ~40pt, body 34pt,
  figure captions 34pt. Meta-labels (eyebrows, funding fine-print) may go smaller —
  they are not "content."
- **34pt body means ~half the content of a same-size 0.75-scale draft fits.** Budget
  accordingly: a 48″ board at 34pt holds roughly 5–6 substantial sections plus header,
  stats, and footer. Compress prose to **bullets** and one-sentence descriptions rather
  than cutting whole sections when you can.

## 3. Layout structure that worked

- **Header on one row:** `logos (left) | title (centered) | QR (right)`.
  - For the title to sit at the **true page center**, the left and right blocks must be
    **equal width** (`11.5in | 23in | 11.5in` summing to `\linewidth`). Centering the
    title *within an asymmetric middle block* leaves it visibly off-center.
  - Shrink the logo block with `\scalebox{0.78}{\headerLogos}` so it fits its half.
  - **Match the QR size to the logo height** (here 2.13in) so the header row is visually
    even; mismatched heights make one side "jut out."
  - To make a stack of lines span exactly the QR's height, put them in a fixed-height
    minipage (`\begin{minipage}[t][2.13in][t]{...}`) separated by `\vfill`, and
    top-align both the text block and the QR (`[t]`).
- **Center the secondary rows too** (authors, stat numbers) when the title is centered,
  for a coherent axis. Wrap each row in `\begin{minipage}{\linewidth}\centering ... \end{minipage}`.
- **Numbered sections** (`1.` `2.` …) in the accent color, no "eyebrow" kicker labels —
  cleaner and saves vertical space. Same numbering for cards inside a section.

## 4. Cards (tcolorbox) — the two pitfalls

- **PITFALL: inner `\linewidth` overflows the box.** Inside `\tcbox[width=\linewidth]{...}`,
  a nested `\begin{minipage}{\linewidth}` uses the *outer* width, so text overflows the
  box by exactly `left+right padding + 2×boxrule` (e.g. 56.28pt). The rightmost cards then
  spill into the right margin and look like unequal padding.
  **Fix:** set the inner minipage to `{\dimexpr\linewidth-58pt\relax}` (≥ the padding sum),
  or drop the inner minipage and rely on the tcbox content area.
- **PITFALL: fixed height clips content.** Cards use fixed `height=` for even rows, but if
  content exceeds it, the last line is clipped by the bottom border (looks like the box
  "isn't surrounded"). **Height must exceed content.** When a row carries less text, give
  it a shorter height via an optional macro arg:
  `\newcommand{\barrierCard}[5][4.35in]{... height=#1 ...}` → call `\barrierCard[3.0in]{...}`.
- **Consistent column gaps.** Pick one card-width fraction for all multi-column rows
  (we used `0.325\linewidth` for 3-up rows; `0.494` for 2-up) so gaps match across
  sections. `\hfill` between cards distributes the remainder and makes the first/last
  touch the margins.

## 5. Color

- Define **semantic** colors once and reuse: `paper` (bg), `paperTwo` (card fill),
  `ink`/`inkSoft`/`inkMuted` (text tiers), one **accent** (`crimson`), plus distinct
  **data** colors for charts/taxonomy.
- **Separate accent from data colors.** Recoloring the accent (e.g. brick-red → Lacoste
  green) should not touch the categorical data colors (taxonomy/chart), or distinct
  categories collapse into the same hue.
- Light background + dark text; keep card fill a hair deeper than the page so cards read
  as panels without heavy borders.

## 6. Small typographic details

- **Hanging-indent bullets** so the bullet shares the first line's baseline with the text:
  `{\leftskip=0.6in \noindent\hskip-0.6in\makebox[0.6in][l]{•}#1\par}`. A bullet in a
  separate top-aligned box sits too high.
- **Circular photos** (`\circphoto`): keep the clip and the image in the *same* units
  (`x=1in,y=1in` + `width=#2in,height=#2in` + `\clip ... circle({#2/2})`). A unit
  mismatch makes the clip larger than the image → rounded-square instead of a circle.
- Replace **em dashes** with colons (appositions) or commas (parentheticals) if house
  style forbids them; en dashes in ranges (`0–100`, `n=9–13`) are fine.

## 7. Workflow

- **Live preview:** `python3 _liveserver.py` watches `poster.tex`, rebuilds with XeLaTeX
  on save, and auto-reloads the browser. Open `http://localhost:8123`.
- **Verify, don't eyeball, the page count and margins.** After each change:
  - `pdfinfo poster.pdf | grep Pages` — must say `1`.
  - Measure margins by rendering (`pdftoppm -png -r 25`) and finding the first/last
    non-background pixel column/row in Python (PIL+numpy). Raise the threshold above the
    faint foot-ruler color so rulers don't confound the measurement.
- **Distribute leftover space deliberately.** Measure the bottom whitespace, then spread
  the excess into band gaps and the cards that carry the most content — don't let it pool
  at the bottom.
- **EDITING GOTCHA:** Do **not** use `perl -pe 's/.../\selectfont\color.../'` for LaTeX
  replacements — Perl interprets backslash escapes in the replacement (`\c`→Ctrl-O,
  `\f`→formfeed, `\s`→s), silently corrupting the file. Use the `Edit` tool, Python's
  `str.replace`, or double every backslash (`\\selectfont\\color`).

## 8. Pre-print checklist

- [ ] Exactly 1 page; `pdfinfo` confirms page size = `3456 × 3456 pts` (48″).
- [ ] All four margins measured equal (~1in).
- [ ] No clipped card text; every box fully encloses its content.
- [ ] No content text below the readability floor (~34pt).
- [ ] Header row visually even (logo height = QR height; title page-centered).
- [ ] Accent vs. data colors still distinct after any recolor.
- [ ] Build log: no `Overfull \hbox` larger than a few pt (they shift content into margins).
- [ ] QR code resolves to the correct DOI; funding/acknowledgment present.
