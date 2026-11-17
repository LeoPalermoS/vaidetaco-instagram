---
name: roteiro-reels
description: Escreve roteiros de Reels da Vai de Taco (gancho, cenas, texto na tela, áudio, legenda) e monta o vídeo com reel.sh. Use quando pedirem Reel, vídeo, TikTok, roteiro ou ideia de vídeo.
---

# Roteiro de Reels

## Estrutura (7 a 20 segundos)
| Tempo | Parte | Regra |
|---|---|---|
| 0–2s | **Gancho** | Imagem forte + texto na tela que gera curiosidade. Nunca comece pelo logo. |
| 2–12s | **Miolo** | 3 a 5 cenas de 1,5 a 3s cada. Movimento real: queijo puxando, tortilla dobrando, molho caindo. |
| final | **CTA** | "Peça pelo iFood ou 99Food, link na bio" ou "Marca quem vai dividir". |

## Formato de entrega do roteiro
```
REEL: <título interno>
OBJETIVO: alcance | pedido | engajamento
DURAÇÃO: Xs   ÁUDIO: <tipo de áudio em alta / voz / som ambiente>
CENA 1 (0–2s) | O QUE FILMAR: ... | TEXTO NA TELA: ... | ENQUADRAMENTO: close/mão/overhead
CENA 2 ...
LEGENDA: ...
CAPA: <frase curta para a capa>
```

## Ideias que funcionam para a Vai de Taco
- **ASMR de montagem:** close do taco sendo montado, som real, sem fala.
- **"POV: você pediu..."**: chegada do pedido, abrir a embalagem, primeira mordida.
- **Teste "taco ou burrito?"** com enquete na legenda.
- **Bastidor das 18h:** a cozinha abrindo, a chapa esquentando, o primeiro pedido da noite.
- **"Quanto queijo é queijo demais?"**: quesadilla sendo aberta.
- **Trend de áudio** adaptada (veja no app quais áudios estão em alta na semana).

## Dicas de gravação (passe para o dono)
- Grave **na vertical**, com luz de janela ou luz forte de frente, sem contraluz.
- Grave cada cena com 2 a 3 segundos a mais do que o necessário.
- Celular parado: apoie em algo ou use as duas mãos. Limpe a lente.
- Não grave com música tocando no fundo. A música é adicionada depois, no app.

## Montagem
- **Só com artes ou fotos:** `./reel.sh out/reel-x.mp4 [--musica a.mp3] img1 img2 ...` (2,5s por imagem, zoom suave).
- **Com vídeos do dono:** use ffmpeg para cortar (`-ss`/`-t`), colocar na vertical
  (`scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920`) e concatenar. Adicione o texto na tela com `drawtext`
  usando `fonts/` ou gere PNGs transparentes e sobreponha com `overlay`.
- **Música:** prefira adicionar o áudio em alta no próprio app do Instagram na hora de publicar,
  porque a música dentro do arquivo não conta como trend. Nunca use música com direitos autorais dentro do arquivo.
- Sempre confira 3 quadros do vídeo final (início, meio, fim) antes de entregar.
