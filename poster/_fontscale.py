#!/usr/bin/env python3
"""Uniformly scale poster type + spacing + fixed box dims by a factor.

    python3 _fontscale.py FACTOR [BASE] [OUT]

Reads BASE (default poster.base), multiplies font sizes, vertical/horizontal
spacing, fixed dimensions, header-logo coordinates, etc. by FACTOR, and writes
OUT (default poster.tex). The page geometry line (margins/paper size) is left
untouched so the printable area does not change.
"""
import re
import sys
from pathlib import Path

F = float(sys.argv[1]) if len(sys.argv) > 1 else 1.0
BASE = Path(sys.argv[2]) if len(sys.argv) > 2 else Path("poster.base")
OUT = Path(sys.argv[3]) if len(sys.argv) > 3 else Path("poster.tex")

s = BASE.read_text()

# Protect the geometry line (paper size + margins) from any scaling.
GEO = "\x00GEOMETRY\x00"
geo_line = None
def _grab(m):
    global geo_line
    geo_line = m.group(0)
    return GEO
s = re.sub(r"\\usepackage\[paperwidth=[^\]]*\]\{geometry\}", _grab, s)


def g(x):
    return f"{float(x)*F:g}"

# \fontsize{X}{Y}
s = re.sub(r"\\fontsize\{(\d+(?:\.\d+)?)pt\}\{(\d+(?:\.\d+)?)pt\}",
           lambda m: f"\\fontsize{{{g(m.group(1))}pt}}{{{g(m.group(2))}pt}}", s)

# \vspace / \hspace {Npt|Nin}
for cmd in ("vspace", "hspace"):
    s = re.sub(r"(\\" + cmd + r"\{)(\d+(?:\.\d+)?)(pt|in)(\})",
               lambda m: f"{m.group(1)}{g(m.group(2))}{m.group(3)}{m.group(4)}", s)

# \\[Npt] inter-line spacing
s = re.sub(r"\\\\\[(\d+(?:\.\d+)?)pt\]",
           lambda m: f"\\\\[{g(m.group(1))}pt]", s)

# \taxRowHeight and \cmulogoheight macro bodies
s = re.sub(r"(\\newcommand\{\\taxRowHeight\}\{)(\d+(?:\.\d+)?)(in\})",
           lambda m: f"{m.group(1)}{g(m.group(2))}{m.group(3)}", s)
s = re.sub(r"(\\newcommand\{\\cmulogoheight\}\{)(\d+(?:\.\d+)?)(in\})",
           lambda m: f"{m.group(1)}{g(m.group(2))}{m.group(3)}", s)

# Inline key=value lengths with explicit units.
keys = ["height", "width", "minimum height", "minimum width", "text width",
        "bar width", "inner sep", "boxsep", "boxrule",
        "left", "right", "top", "bottom", "yshift", "xshift", "x", "y"]
for key in keys:
    pat = re.compile(r"(?<![A-Za-z])" + re.escape(key) + r"=(\d+(?:\.\d+)?)(pt|in)\b")
    s = pat.sub(lambda m: f"{m.group(0).split('=')[0]}={g(m.group(1))}{m.group(2)}", s)

# header-logo TikZ coords: rectangle (Xin, Yin) and at (Xin, Yin)
s = re.sub(r"rectangle \((\d+(?:\.\d+)?)in,\s*(\d+(?:\.\d+)?)in\)",
           lambda m: f"rectangle ({g(m.group(1))}in, {g(m.group(2))}in)", s)
s = re.sub(r"at \((\d+(?:\.\d+)?)in,\s*(\d+(?:\.\d+)?)in\)",
           lambda m: f"at ({g(m.group(1))}in, {g(m.group(2))}in)", s)

# circphoto diameter (bare number) and qrset height
s = re.sub(r"(\\circphoto\{[^}]+\}\{)(\d+(?:\.\d+)?)(\})",
           lambda m: f"{m.group(1)}{g(m.group(2))}{m.group(3)}", s)
s = re.sub(r"(\\qrset\{height=)(\d+(?:\.\d+)?)(in\})",
           lambda m: f"{m.group(1)}{g(m.group(2))}{m.group(3)}", s)

# restore geometry
s = s.replace(GEO, geo_line)

OUT.write_text(s)
print(f"Scaled {BASE} by {F:g} -> {OUT}")
