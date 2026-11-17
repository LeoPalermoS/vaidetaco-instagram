---
name: otimizacao-perfil
description: Revisa e melhora o perfil do Instagram da Vai de Taco (nome, bio, link, destaques, grade do feed, fixados). Use quando pedirem para melhorar perfil, bio, destaques, link na bio ou "primeira impressão" da conta.
---

# Otimização de perfil

O perfil precisa responder em 3 segundos: **o que é, quando funciona e como peço.**

## Checklist
| Item | Ideal para a Vai de Taco | Onde se muda |
|---|---|---|
| Foto | Logo em fundo amarelo (`assets/logo-fundo-amarelo.webp`), legível em miniatura | App |
| Nome (campo Nome) | "Vai de Taco \| Tacos e Burritos": entra na busca do Instagram | App |
| Categoria | Restaurante mexicano | App |
| Bio | ≤150 caracteres: o que vende, horário 18h–00h, como pedir, CTA para o link | App |
| Link | Página com iFood, 99Food e WhatsApp (Linktree ou similar) | App |
| Botões de ação | "Pedir comida" ligado ao iFood, se disponível na conta comercial | App |
| Destaques | Pede aí · Tá aberto? · Cardápio · Tacos · Burritos · Promos, com capas em `out/destaques/` | App |
| Fixados | 3 posts fixados: apresentação, cardápio e o post com mais engajamento | App |
| Grade | Alternar temas amarelo/escuro/claro; os 9 primeiros posts devem formar um conjunto bonito | Planejamento |

**A API da Meta não altera bio, nome, foto nem destaques.** Entregue o texto pronto e o passo a passo para o dono.

## Ler o perfil atual
```
curl -sS "https://graph.facebook.com/v21.0/<ig_id>?fields=username,name,biography,website,followers_count,follows_count,media_count"
```
(`ig_id` está em `meta.json`.)

## Como entregar
1. Diagnóstico curto: o que está bom e o que falta.
2. Textos prontos para copiar (bio com contagem de caracteres).
3. Passo a passo no app, numerado.
4. Prévia da grade: monte com `montage` os próximos 9 posts em 3x3 e mostre ao dono.
