---
name: publicar-instagram
description: Publica posts, carrosséis, Reels e stories no Instagram @vaidetaco pela API oficial da Meta, sempre com aprovação explícita do dono. Use quando o dono disser "pode postar", "publica", "agenda" ou pedir métricas de posts publicados.
---

# Publicar no Instagram (Graph API)

## Regra número 1
**Só publique a peça que o dono aprovou com todas as letras nesta conversa** ("pode postar o 03-taco").
Aprovação de uma peça não vale para outra. Antes de publicar, mostre: a arte, a legenda final e o horário.

## Pré-requisitos
- `meta.json` tem `instagram.id`. O token é injetado pelo proxy em `graph.facebook.com`:
  **não** adicione `access_token` na URL nem cabeçalho `Authorization` manual.
- A mídia precisa estar num **link público HTTPS** (`image_url`/`video_url`). A API não aceita upload direto de arquivo local.
  Definir com o dono onde hospedar (GitHub público, Página do Facebook ou outro). Sem hospedagem → não dá para publicar; entregue os arquivos para postar manualmente.
- Limite: 100 publicações em 24h (`GET /<ig_id>/content_publishing_limit`).

## Passos
```bash
G=https://graph.facebook.com/v21.0; IG=$(python3 -c "import json;print(json.load(open('meta.json'))['instagram']['id'])")
# 1. criar container (imagem de feed)
curl -sS -X POST "$G/$IG/media" --data-urlencode "image_url=<URL>" --data-urlencode "caption@out/03-taco.txt"
#    Reel:     -d media_type=REELS --data-urlencode "video_url=<URL>" (+ "cover_url=<URL>" opcional)
#    Story:    -d media_type=STORIES --data-urlencode "image_url=<URL>"
#    Carrossel: crie cada slide com -d is_carousel_item=true, depois
#               -d media_type=CAROUSEL -d "children=<id1>,<id2>,..." + caption
# 2. aguardar ficar pronto (vídeos levam alguns segundos ou minutos)
curl -sS "$G/<container_id>?fields=status_code"     # esperar FINISHED (consultar a cada 5–10s)
# 3. publicar
curl -sS -X POST "$G/$IG/media_publish" -d "creation_id=<container_id>"
# 4. conferir
curl -sS "$G/<media_id>?fields=permalink,timestamp"
```
Registre cada publicação em `publicados.csv` (data, id da peça, media_id, permalink).

## Erros comuns
- `Media download has failed` / `Only photo or video can be accepted`: o link não é público ou não é uma imagem direta.
- `aspect ratio`: feed precisa estar entre 4:5 e 1.91:1 (nossas artes 1080x1350 são 4:5 ✓).
- `190 / OAuthException`: token expirado → peça ao dono para gerar outro e reabra o formulário seguro de credencial.

## Métricas (para o analista)
`GET /<media_id>/insights?metric=reach,likes,comments,saved,shares,total_interactions` (Reels: incluir `views`).
`GET /<ig_id>/insights?metric=reach,follower_count&period=day` para a conta.
Se a métrica der erro de permissão, o token precisa de `instagram_manage_insights`.
