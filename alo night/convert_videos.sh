#!/bin/bash
# تبدیل MOV های گوشی به MP4 (H.264 + AAC + faststart) + ساخت پستر از فریم اول
cd "/c/Users/Mohammad/Desktop/alo night"
mkdir -p assets/videos
for f in IMG_*.MOV; do
  base="${f%.MOV}"
  echo "=== $f -> $base.mp4 ==="
  ffmpeg -y -hide_banner -loglevel error -i "$f" \
    -vf "scale=-2:720" \
    -c:v libx264 -crf 24 -preset veryfast \
    -c:a aac -b:a 96k \
    -movflags +faststart \
    "assets/videos/$base.mp4"
  ffmpeg -y -hide_banner -loglevel error -ss 0.2 -i "$f" -frames:v 1 \
    -vf "scale=-2:720" -q:v 4 "assets/videos/$base.jpg"
  echo "  -> $(stat -c%s assets/videos/$base.mp4) bytes"
done
echo "ALL DONE"
