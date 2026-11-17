# Vai de Taco: fábrica de posts

Artes do Instagram feitas em HTML e exportadas em PNG, mais Reels gerados com ffmpeg.

## Como usar
1. Edite `posts.json` (textos, emoji ou foto, legenda).
2. `node render.js` gera tudo em `out/` (PNG + legenda .txt). Para gerar um post só: `node render.js posts.json 03-taco`
3. Reel: `./reel.sh out/reel.mp4 [--musica som.mp3] out/01.png assets/foto.jpg ...`

## Marca
`brand.json`: amarelo `#FDBD25`, preto `#141414`, creme `#FFF8EA` (tiradas do logo). Fontes: Fredoka (títulos) e Poppins (texto).
Logos transparentes em `assets/` (preto, amarelo, creme). Cada post escolhe um `tema`: `amarelo`, `escuro` ou `claro`.

## Templates (`templates/`)
- `produto`: destaque de produto (campo `foto` usa foto real em vez de emoji)
- `frase`: anúncio/texto grande; funciona em `feed` e `story`
- `cardapio`: lista de itens (campo `preco` opcional; só preencha com o preço real)

Formatos: `feed` 1080×1350, `story` 1080×1920, `quadrado` 1080×1080.

## Agência (time de agentes)
O manual da marca e do time está no `CLAUDE.md`. Agentes em `.claude/agents/`:
estrategista · copywriter · designer · roteirista-reels · publicador · analista.
Skills em `.claude/skills/`: carrossel-e-templates · roteiro-reels · otimizacao-perfil ·
crescimento-instagram · datas-comemorativas · publicar-instagram.
Para usar os agentes, abra uma sessão do Claude Code **dentro desta pasta**.
