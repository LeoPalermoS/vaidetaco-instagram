// Gera PNGs a partir de templates HTML + posts.json
// Uso: node render.js [posts.json] [id-opcional]
const fs = require('fs'), path = require('path');
const { chromium } = require('playwright');
const ROOT = __dirname;
const brand = JSON.parse(fs.readFileSync(path.join(ROOT, 'brand.json')));
const arquivo = process.argv[2] || 'posts.json';
const soId = process.argv[3];
const posts = JSON.parse(fs.readFileSync(path.join(ROOT, arquivo))).posts;
const FORMATOS = { feed: [1080, 1350], story: [1080, 1920], quadrado: [1080, 1080] };

const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\n/g, '<br>');
const fill = (tpl, d) => tpl.replace(/{{([\w.]+)}}/g, (_, k) => k.split('.').reduce((o, p) => o?.[p], d) ?? '');
const fileUrl = p => 'file://' + path.resolve(ROOT, p);

function montar(post) {
  const [w, h] = FORMATOS[post.formato || 'feed'];
  const tema = brand.temas[post.tema || 'amarelo'];
  const d = { ...brand, ...post, w, h, tema, logoAltura: post.logoAltura || (h > 1400 ? 150 : 100) };
  d.css = fill(fs.readFileSync(path.join(ROOT, 'templates/_base.css'), 'utf8'), d)
            .replace("url('../fonts/fonts.css')", `url('${fileUrl('fonts/fonts.css')}')`);
  d.marca = `<img src="${fileUrl(brand.logos[tema.logo])}">` + (post.semArroba ? '' : `<span>${esc(brand.arroba)}</span>`);
  for (const k of ['titulo', 'subtitulo', 'kicker', 'cta']) d[k] = esc(post[k]);
  d.imagem = post.foto ? `<img class="foto" src="${fileUrl(post.foto)}">` : `<div class="circ"><span class="emoji">${post.emoji || ''}</span></div>`;
  d.emoji = post.emoji ? `<span class="emoji">${post.emoji}</span>` : '';
  d.seloHtml = post.selo ? `<div class="selo">${esc(post.selo)}</div>` : '';
  d.circHtml = post.foto ? '' : '<div class="circ"></div>';
  const st = h > 1400; d.imgTop = st ? 640 : 470; d.circ = st ? 760 : 560; d.emojiTam = st ? 420 : 300; d.ctaBottom = st ? 330 : 210;
  d.ctaHtml = post.cta ? `<span class="cta">${d.cta}</span>` : '';
    d.tamTitulo = post.tamTitulo || (post.template === 'produto' ? 140 : 170);
  d.escala = st ? 1.35 : 1;
  d.itensHtml = (post.itens || []).map(i => `<div class="item"><span class="emoji">${i.emoji || ''}</span><div><b>${esc(i.nome)}</b><small>${esc(i.desc)}</small></div>${i.preco ? `<span class="preco">${esc(i.preco)}</span>` : ''}</div>`).join('');
  let html = fill(fs.readFileSync(path.join(ROOT, 'templates', post.template + '.html'), 'utf8'), d);
  if (post.fundo) {
    const escurecer = post.escurecer ?? 0.5;
    html = html.replace('</style>', `body{background:linear-gradient(rgba(0,0,0,${escurecer}),rgba(0,0,0,${escurecer})),url('${fileUrl(post.fundo)}') center/cover no-repeat !important}</style>`);
  }
  if (post.pagina) {
    const [a, b] = String(post.pagina).split('/');
    const seta = a !== b ? ' →' : '';
    html = html.replace('</body>', `<div style="position:absolute;top:80px;right:70px;background:var(--ink);color:var(--bg);font-weight:800;font-size:28px;padding:10px 24px;border-radius:999px;z-index:9">${esc(post.pagina)}${seta}</div></body>`);
  }
  return { html, w, h };
}

(async () => {
  const browser = await chromium.launch();
  fs.mkdirSync(path.join(ROOT, 'out'), { recursive: true });
  for (const post of posts) {
    if (soId && post.id !== soId) continue;
    const { html, w, h } = montar(post);
    const tmp = path.join(ROOT, 'out', `.${post.id}.html`);
    fs.writeFileSync(tmp, html);
    const page = await browser.newPage({ viewport: { width: w, height: h } });
    await page.goto('file://' + tmp); await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: path.join(ROOT, 'out', post.id + '.png') });
    await page.close(); fs.unlinkSync(tmp);
    if (post.legenda) fs.writeFileSync(path.join(ROOT, 'out', post.id + '.txt'), post.legenda);
    console.log('✔', post.id);
  }
  await browser.close();
})();
