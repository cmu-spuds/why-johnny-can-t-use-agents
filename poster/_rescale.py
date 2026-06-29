#!/usr/bin/env python3
"""Scale poster.tex from 48"x48" → 36"x36" by multiplying absolute dimensions and font sizes by 0.75.

Conservative: only touches patterns where the unit is explicitly attached (pt or in).
Skips relative lengths (\\linewidth, \\textwidth, em).
"""
import re
import sys
from pathlib import Path

SCALE = 0.75
SRC = Path("poster.tex")
OUT = SRC


def scale(num: float, unit: str) -> str:
    new = num * SCALE
    if unit == "pt":
        return f"{new:g}pt"
    if unit == "in":
        return f"{new:g}in"
    return f"{new:g}{unit}"


def repl_pt_in(m):
    num = float(m.group("num"))
    unit = m.group("unit")
    return f"{m.group('lead')}{scale(num, unit)}"


def main():
    s = SRC.read_text()

    # 1) page geometry — paperwidth/paperheight are special (set to 36in directly,
    #    not 48*0.75=36 — same result, but we use explicit substitution because
    #    step 6 below will skip them due to the `paperwidth` prefix lookbehind).
    #    Margins (top/bottom/left/right) are intentionally handled by step 6.
    s = re.sub(r"paperwidth=48in",  "paperwidth=36in",  s)
    s = re.sub(r"paperheight=48in", "paperheight=36in", s)

    # 2) foot ruler loops: \foreach \x in {1,2,3}  →  {1,2}
    s = re.sub(r"\\foreach \\x in \{1,2,3\}", r"\\foreach \\x in {1,2}", s)
    s = re.sub(r"\\foreach \\y in \{1,2,3\}", r"\\foreach \\y in {1,2}", s)
    # The (\x*12in, 0) -- (\x*12in, 48in) endpoints need 48in → 36in.
    s = re.sub(r"\(\\x\*12in, 48in\)", r"(\\x*12in, 36in)", s)
    s = re.sub(r"\(48in, \\y\*12in\)", r"(36in, \\y*12in)", s)
    # draftgrid grid: still uses 48in extents; rewrite to 36in (loop also {0..3} → {0..3} stays since 0..3*12 = 0,12,24,36)
    s = re.sub(r"\\foreach \\x in \{0,1,\.\.\.,4\}", r"\\foreach \\x in {0,1,...,3}", s)
    s = re.sub(r"\\foreach \\y in \{0,1,\.\.\.,4\}", r"\\foreach \\y in {0,1,...,3}", s)
    s = re.sub(r"\(\\x\*12in, 48in\)", r"(\\x*12in, 36in)", s)
    s = re.sub(r"\(48in, \\y\*12in\)", r"(36in, \\y*12in)", s)
    # draftgrid labels: at (..*12in+6in, ..*12in+6in) — these are unchanged in unit math, but the iteration ranges {0,1,2,3} & {3,2,1,0} need shrinking to {0,1,2} & {2,1,0}
    s = re.sub(
        r"\\foreach \\i \[count=\\ci\] in \{0,1,2,3\}",
        r"\\foreach \\i [count=\\ci] in {0,1,2}",
        s,
    )
    s = re.sub(
        r"\\foreach \\j \[count=\\cj\] in \{3,2,1,0\}",
        r"\\foreach \\j [count=\\cj] in {2,1,0}",
        s,
    )
    # ruler label y position (was 47.4in for 48in page) → 35.4in for 36in page
    s = re.sub(r"\{\\x,ft\}", r"{\\x,ft}", s)  # placeholder no-op
    s = re.sub(r"\\x\*12in, 47\.4in", r"\\x*12in, 35.4in", s)

    # 3) \fontsize{X}{Y}
    def fontsize_repl(m):
        x = float(m.group(1))
        y = float(m.group(2))
        return f"\\fontsize{{{x*SCALE:g}pt}}{{{y*SCALE:g}pt}}"
    s = re.sub(r"\\fontsize\{(\d+(?:\.\d+)?)pt\}\{(\d+(?:\.\d+)?)pt\}", fontsize_repl, s)

    # 4) \vspace{Xpt} and \vspace{Xin}
    s = re.sub(
        r"(?P<lead>\\vspace\{)(?P<num>\d+(?:\.\d+)?)(?P<unit>pt|in)(?P<tail>\})",
        lambda m: f"{m.group('lead')}{float(m.group('num'))*SCALE:g}{m.group('unit')}{m.group('tail')}",
        s,
    )
    # 5) \hspace{Xpt} and \hspace{Xin}
    s = re.sub(
        r"(?P<lead>\\hspace\{)(?P<num>\d+(?:\.\d+)?)(?P<unit>pt|in)(?P<tail>\})",
        lambda m: f"{m.group('lead')}{float(m.group('num'))*SCALE:g}{m.group('unit')}{m.group('tail')}",
        s,
    )

    # 6) Inline lengths in option lists: ` height=Xin`, ` width=Xin`, ` minimum height=Xin`,
    #    ` text width=Xin`, ` bar width=Xpt`, ` inner sep=Xpt`, ` boxsep=Xpt`,
    #    ` left=Xpt`, ` right=Xpt`, ` top=Xpt`, ` bottom=Xpt`, ` boxrule=Xpt`,
    #    ` line width=Xpt`, ` x=Xin`, ` y=Xin`, ` yshift=Xpt`, ` xshift=Xpt`
    keys = [
        "height", "width", "minimum height", "minimum width", "text width",
        "bar width", "inner sep", "boxsep", "boxrule",
        "left", "right", "top", "bottom",
        "yshift", "xshift",
        "x", "y",
    ]
    # IMPORTANT: never touch the page geometry tokens (already replaced above), or
    # `width=\linewidth` (no number), or paperwidth/paperheight (already done).
    for key in keys:
        # Match "key=number unit" where number has explicit pt or in.
        pat = re.compile(
            r"(?P<lead>(?<![A-Za-z])" + re.escape(key) + r"=)(?P<num>\d+(?:\.\d+)?)(?P<unit>pt|in)\b"
        )
        s = pat.sub(repl_pt_in, s)

    # 7) qrset {height=Xin}
    s = re.sub(
        r"(\\qrset\{height=)(\d+(?:\.\d+)?)(in)(\})",
        lambda m: f"{m.group(1)}{float(m.group(2))*SCALE:g}{m.group(3)}{m.group(4)}",
        s,
    )

    # 8) circphoto diameter (passed as bare number in inches): \circphoto{path}{2.0}
    #    Match the second argument after \circphoto{...}{N.N}
    s = re.sub(
        r"(\\circphoto\{[^}]+\}\{)(\d+(?:\.\d+)?)(\})",
        lambda m: f"{m.group(1)}{float(m.group(2))*SCALE:g}{m.group(3)}",
        s,
    )

    # 9) tikzpicture coordinates with explicit in: e.g. ` at (2.55,1.40)` are unitless and not scaled —
    #    BUT the tikz `x=1in,y=1in` means those units multiply to 1in. We DO need to scale `x=1in,y=1in`
    #    Already covered by step 6 (x=, y= keys), but the value is "1in" so it becomes 0.75in. That's right.

    # 10) the impactfont/sansfont SPUD logo text sizes are font-sized; already covered.

    # 11) \cmulogoheight macro definition
    s = re.sub(
        r"(\\newcommand\{\\cmulogoheight\}\{)(\d+(?:\.\d+)?)(in)(\})",
        lambda m: f"{m.group(1)}{float(m.group(2))*SCALE:g}{m.group(3)}{m.group(4)}",
        s,
    )

    OUT.write_text(s)
    print(f"Wrote {OUT}")


if __name__ == "__main__":
    main()
