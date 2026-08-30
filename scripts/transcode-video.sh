#!/usr/bin/env bash
# Prepare scenario films for the web.
#
# Seedance exports 1920x1080 HEVC at ~10 Mbps. Two problems with shipping that:
# HEVC in MP4 does not play in Chrome on most platforms or in Firefox at all,
# and 30 MB per clip dwarfs the entire rest of the site. This produces H.264
# High / yuv420p — which every browser plays — at roughly a tenth the size.
#
# Usage: scripts/transcode-video.sh <source.mp4> <slug>
set -euo pipefail

src="${1:?usage: transcode-video.sh <source.mp4> <slug>}"
slug="${2:?usage: transcode-video.sh <source.mp4> <slug>}"
out="public/scenarios"
mkdir -p "$out"

ffmpeg -y -v error -i "$src" \
  -vf "scale=1440:-2" \
  -c:v libx264 -profile:v high -pix_fmt yuv420p -crf 27 -preset slow -g 48 \
  -c:a aac -b:a 96k -ac 2 \
  -movflags +faststart \
  "$out/$slug.mp4"

# Poster from 2s in — past any fade-up. This is what reduced-motion visitors,
# slow connections and paused tabs actually see, so it has to stand alone.
ffmpeg -y -v error -ss 2 -i "$src" -frames:v 1 -vf "scale=1440:-2" -q:v 4 \
  "$out/$slug.jpg"

printf '%s: %s video, %s poster\n' "$slug" \
  "$(du -h "$out/$slug.mp4" | cut -f1)" "$(du -h "$out/$slug.jpg" | cut -f1)"
