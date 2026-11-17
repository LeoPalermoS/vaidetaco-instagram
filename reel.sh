#!/usr/bin/env bash
# Gera um Reel vertical 1080x1920 a partir de imagens/fotos, com zoom suave e transição.
# Uso: ./reel.sh saida.mp4 [--musica audio.mp3] img1.png img2.jpg ...
# Cada imagem fica ~2,5s. Fotos de qualquer tamanho são encaixadas com fundo na cor da marca.
set -e
OUT="$1"; shift
MUSICA=""; if [ "$1" = "--musica" ]; then MUSICA="$2"; shift 2; fi
BG=$(python3 -c "import json;print(json.load(open('$(dirname "$0")/brand.json'))['cores']['amarelo'].lstrip('#'))")
DUR=2.5; FADE=0.4; FPS=30; N=$#
inputs=(); filt=""; i=0
for img in "$@"; do
  inputs+=(-i "$img")
  filt+="[$i:v]scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2:color=0x$BG,"
  filt+="scale=2160:3840,zoompan=z='min(zoom+0.0012,1.12)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=$(python3 -c "print(int($DUR*$FPS))"):s=1080x1920:fps=$FPS,setsar=1,format=yuv420p[v$i];"
  i=$((i+1))
done
last="[v0]"; off=0
for ((k=1;k<N;k++)); do
  off=$(python3 -c "print(round($k*($DUR-$FADE),2))")
  filt+="${last}[v$k]xfade=transition=slideleft:duration=$FADE:offset=$off[x$k];"; last="[x$k]"
done
filt="${filt%;}"
if [ -n "$MUSICA" ]; then
  ffmpeg -y -loglevel error "${inputs[@]}" -i "$MUSICA" -filter_complex "$filt" -map "$last" -map $N:a -shortest -c:v libx264 -crf 20 -c:a aac -movflags +faststart "$OUT"
else
  ffmpeg -y -loglevel error "${inputs[@]}" -filter_complex "$filt" -map "$last" -c:v libx264 -crf 20 -movflags +faststart "$OUT"
fi
echo "✔ $OUT"
