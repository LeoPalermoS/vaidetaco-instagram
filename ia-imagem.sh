#!/usr/bin/env bash
# Gera uma imagem com o Nano Banana (Gemini) e salva em PNG.
# Uso: ./ia-imagem.sh "descrição da imagem" assets/ia/nome.png [modelo]
# A chave é injetada pelo proxy em generativelanguage.googleapis.com (não coloque chave aqui).
set -e
PROMPT="$1"; SAIDA="$2"; MODELO="${3:-gemini-2.5-flash-image}"
[ -z "$PROMPT" ] || [ -z "$SAIDA" ] && { echo "uso: $0 \"prompt\" saida.png [modelo]"; exit 1; }
mkdir -p "$(dirname "$SAIDA")"
TMP=$(mktemp)
python3 -c "import json,sys;print(json.dumps({'model':sys.argv[1],'prompt':sys.argv[2],'n':1,'response_format':'b64_json'}))" "$MODELO" "$PROMPT" \
 | curl -sS -X POST "https://generativelanguage.googleapis.com/v1beta/openai/images/generations" -H "Content-Type: application/json" -d @- -o "$TMP"
python3 - "$TMP" "$SAIDA" <<'PY'
import json,base64,sys
d=json.load(open(sys.argv[1])); d=d[0] if isinstance(d,list) else d
if 'error' in d: sys.exit("ERRO: "+str(d['error'].get('message',d['error']))[:300])
open(sys.argv[2],'wb').write(base64.b64decode(d['data'][0]['b64_json'])); print("✔",sys.argv[2])
PY
rm -f "$TMP"
