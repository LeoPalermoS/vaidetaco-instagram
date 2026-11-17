---
name: carrossel-e-templates
description: Cria artes de feed, carrosséis, stories e capas da Vai de Taco a partir dos modelos HTML do projeto. Use quando pedirem post, arte, carrossel, story, capa de destaque, novo modelo de arte ou ajuste visual.
---

# Carrossel e modelos de arte

## Como uma arte nasce
1. Escreva os posts num JSON (`{"posts":[...]}`), um objeto por arte ou slide.
2. `node render.js arquivo.json` gera os PNGs em `out/`.
3. **Abra cada PNG e olhe** antes de entregar. Procure: texto cortado, título encostando na imagem,
   logo sobreposto, contraste ruim, emoji faltando.

## Campos
| Campo | Uso |
|---|---|
| `id` | nome do arquivo (`01-xxx`) |
| `template` | `produto`, `frase`, `cardapio` ou `capa` |
| `formato` | `feed` (1080x1350, padrão), `story` (1080x1920), `quadrado` |
| `tema` | `amarelo`, `escuro` ou `claro` |
| `titulo`, `subtitulo`, `kicker`, `cta`, `selo` | textos. `\n` quebra a linha |
| `emoji` ou `foto` | `foto` aponta para um arquivo em `assets/` e substitui o emoji |
| `pagina` | `"2/5"` mostra o indicador de carrossel (com seta, menos no último) |
| `tamTitulo` | tamanho do título em px, para títulos longos |
| `legenda` | gera o `.txt` ao lado do PNG |

## Carrossel que funciona
- **5 a 7 slides**, todos em `feed` 1080x1350.
- **Slide 1 = gancho.** Um título que faz parar de rolar (pergunta, número, provocação), sem logo grande.
- **Slides do meio = um assunto por slide.** No máximo 15 palavras de texto por slide.
- **Último slide = CTA:** salvar, compartilhar ou pedir (iFood/99Food, link na bio).
- Alterne os temas de forma lógica: gancho em `escuro`, conteúdo em `amarelo`/`claro`, CTA em `escuro`.
- Formatos que dão certo para comida: "5 jeitos de comer um burrito", "Taco ou burrito? Responda o teste",
  "O que vai dentro do nosso taco", "Monte seu combo", "Ranking da casa", "Mitos sobre comida mexicana".

## Regras de design
- Uma ideia por arte. Se o texto não cabe, corte o texto, não diminua a fonte.
- Título com pelo menos 120px no feed e 150px no story. Texto de apoio com pelo menos 34px.
- Respeite a área segura do story: nada importante nos 250px de cima e de baixo.
- Fotos reais sempre ganham dos emojis. Quando houver foto, use `foto`.
- Não invente elementos de marca novos: use as cores, as fontes e os logos do `brand.json`.

## Criar um modelo novo
Copie um arquivo de `templates/`, mantenha os `{{campos}}` e o `{{css}}` base e teste com um post de exemplo.
Documente o modelo novo nesta skill.

## Imagens com IA (Nano Banana)
- `./ia-imagem.sh "prompt em inglês" assets/ia/nome.png [modelo]` gera uma imagem (padrão `gemini-2.5-flash-image`; também há `gemini-3-pro-image`, o Pro).
- No post, use `"fundo": "assets/ia/nome.png"` e `"escurecer": 0.35` (de 0 a 1) para pôr a foto atrás do texto. Funciona com o tema `escuro`.
- **Use IA para:** fundos, mesas, ingredientes, texturas, ilustrações e para melhorar fotos reais do dono.
- **Não use IA para:** inventar pratos da casa como se fossem reais. O cliente espera receber o que vê.
- Peça "large empty space in the center for text" no prompt quando a imagem for fundo de arte.
- Cada imagem custa crédito na conta Google do dono: gere o mínimo e reaproveite fundos.
