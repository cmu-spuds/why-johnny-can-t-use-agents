#!/usr/bin/env bash
# Build both the final poster and a draft-grid diagnostic version.
set -e
cd "$(dirname "$0")"

echo "→ Building final poster (poster.pdf) ..."
xelatex -interaction=nonstopmode -halt-on-error poster.tex >/dev/null

echo "→ Building draft-grid diagnostic (poster-grid.pdf) ..."
# flip the draft flag inline by sed
sed 's/\\draftgridfalse/\\draftgridtrue/' poster.tex > poster-grid.tex
xelatex -interaction=nonstopmode -halt-on-error -jobname=poster-grid poster-grid.tex >/dev/null
rm -f poster-grid.tex poster-grid.aux poster-grid.log

echo "→ Done."
ls -la poster.pdf poster-grid.pdf
