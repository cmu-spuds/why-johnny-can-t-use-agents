#!/usr/bin/env python3
"""Scale poster.tex from 36"x36" -> 48"x48" by multiplying absolute dimensions and font sizes by 4/3.

Exact inverse of _rescale.py (which used SCALE=0.75). Conservative: only touches
patterns where the unit is explicitly attached (pt or in), plus the grid/ruler
loops that count 1-ft gridlines. Skips relative lengths (\\linewidth, \\textwidth, em).
"""
import re
from pathlib import Path

SCALE = 4.0 / 3.0
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

    # 1) page geometry: 36in -> 48in (explicit; step 6 skips paperwidth/paperheight).
    s = re.sub(r"paperwidth=36in",  "paperwidth=48in",  s)
    s = re.sub(r"paperheight=36in", "paperheight=48in", s)

    # 2) foot ruler loops: {1,2} -> {1,2,3} (3 interior 1-ft lines on a 48in page).
    s = re.sub(r"\\foreach \\x in \{1,2\}", r"\\foreach \\x in {1,2,3}", s)
    s = re.sub(r"\\foreach \\y in \{1,2\}", r"\\foreach \\y in {1,2,3}", s)
    # ruler/grid draw endpoints: 36in -> 48in extents.
    s = re.sub(r"\(\\x\*12in, 36in\)", r"(\\x*12in, 48in)", s)
    s = re.sub(r"\(36in, \\y\*12in\)", r"(48in, \\y*12in)", s)
    # draftgrid grid loops: {0,1,...,3} -> {0,1,...,4} (gridlines at 0,12,24,36,48).
    s = re.sub(r"\\foreach \\x in \{0,1,\.\.\.,3\}", r"\\foreach \\x in {0,1,...,4}", s)
    s = re.sub(r"\\foreach \\y in \{0,1,\.\.\.,3\}", r"\\foreach \\y in {0,1,...,4}", s)
    # draftgrid cell-label iteration ranges: 3 cells per axis -> 4 cells per axis.
    s = re.sub(
        r"\\foreach \\i \[count=\\ci\] in \{0,1,2\}",
        r"\\foreach \\i [count=\\ci] in {0,1,2,3}",
        s,
    )
    s = re.sub(
        r"\\foreach \\j \[count=\\cj\] in \{2,1,0\}",
        r"\\foreach \\j [count=\\cj] in {3,2,1,0}",
        s,
    )
    # ruler label y position: 35.4in (36in page) -> 47.4in (48in page).
    s = re.sub(r"\\x\*12in, 35\.4in", r"\\x*12in, 47.4in", s)

    # 3) \fontsize{X}{Y}
    def fontsize_repl(m):
        x = float(m.group(1))
        y = float(m.group(2))
        return f"\\fontsize{{{x*SCALE:g}pt}}{{{y*SCALE:g}pt}}"
    s = re.sub(r"\\fontsize\{(\d+(?:\.\d+)?)pt\}\{(\d+(?:\.\d+)?)pt\}", fontsize_repl, s)

    # 4) \vspace{Xpt|Xin}
    s = re.sub(
        r"(?P<lead>\\vspace\{)(?P<num>\d+(?:\.\d+)?)(?P<unit>pt|in)(?P<tail>\})",
        lambda m: f"{m.group('lead')}{float(m.group('num'))*SCALE:g}{m.group('unit')}{m.group('tail')}",
        s,
    )
    # 5) \hspace{Xpt|Xin}
    s = re.sub(
        r"(?P<lead>\\hspace\{)(?P<num>\d+(?:\.\d+)?)(?P<unit>pt|in)(?P<tail>\})",
        lambda m: f"{m.group('lead')}{float(m.group('num'))*SCALE:g}{m.group('unit')}{m.group('tail')}",
        s,
    )

    # 6) Inline lengths in option lists with explicit pt/in units.
    keys = [
        "height", "width", "minimum height", "minimum width", "text width",
        "bar width", "inner sep", "boxsep", "boxrule",
        "left", "right", "top", "bottom",
        "yshift", "xshift",
        "x", "y",
    ]
    for key in keys:
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

    # 8) circphoto diameter (bare number in inches): \circphoto{path}{N}
    s = re.sub(
        r"(\\circphoto\{[^}]+\}\{)(\d+(?:\.\d+)?)(\})",
        lambda m: f"{m.group(1)}{float(m.group(2))*SCALE:g}{m.group(3)}",
        s,
    )

    # 9) headerLogos block: bare absolute TikZ inch coordinates (not key=value),
    #    so the generic passes skip them. Scale them explicitly so the CMU logo,
    #    potato, and SPUD/Lab text keep their relative placement at 48in.
    # \useasboundingbox ... rectangle (9.2in,1.8in)
    s = re.sub(
        r"rectangle \((\d+(?:\.\d+)?)in,\s*(\d+(?:\.\d+)?)in\)",
        lambda m: f"rectangle ({float(m.group(1))*SCALE:g}in, {float(m.group(2))*SCALE:g}in)",
        s,
    )
    # node positions: at (Xin, Yin) where X and/or Y carry explicit `in`.
    s = re.sub(
        r"at \((\d+(?:\.\d+)?)in,\s*(\d+(?:\.\d+)?)in\)",
        lambda m: f"at ({float(m.group(1))*SCALE:g}in, {float(m.group(2))*SCALE:g}in)",
        s,
    )

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
