/* =====================================================================
   extras.js · Milan Athletic Club
   Capa de diseño + funciones nuevas. Se carga DESPUÉS del script principal.

   Incluye:
   · Tipografía nueva (Space Grotesk + Inter Tight) y rediseño minimalista
   · Flecha de cambio de media grande, con número, también en "Figura del equipo"
   · Aptitud por jugador (ofensivo / defensivo) con flecha gruesa y degradada
   · Escudo único debajo de la posición (sin escudo abajo de la carta)
   · Editor de carta: mover escudo y bandera, escalarlos, elegir país
   · Vista previa del fondo de carta antes de aplicarlo
   · Escudo y banda de capitán más notorios
   ===================================================================== */

/* ---------- fuentes ---------- */
document.head.append(Object.assign(document.createElement('link'), {
  rel: 'stylesheet',
  href: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter+Tight:wght@400;500;600;700&display=swap'
}));

/* ---------- estilos ---------- */
document.head.append(Object.assign(document.createElement('style'), { textContent: `
:root{
  --bg:#08080a; --s1:#0f0f12; --s2:#16161b; --ln:#24242c;
  --tx:#f3f0e9; --mu:#8a8a96; --rd:#e01423; --rd2:#a30d17;
  --gd:#d9b96e; --gd2:#a8843c;
  --hf:'Space Grotesk','Inter Tight',system-ui,sans-serif;
}
html,body{background:var(--bg)}
body{font:400 14.5px/1.45 'Inter Tight',system-ui,-apple-system,sans-serif;letter-spacing:.004em}
#app{background:radial-gradient(130% 42% at 50% -8%,#e0142314,transparent 62%),radial-gradient(90% 40% at 100% 0,#d9b96e0d,transparent 60%),#08080a}

/* cabecera */
.hd{padding:14px 16px 10px;gap:12px}
.hd .esc{width:40px;height:40px;filter:drop-shadow(0 6px 14px #000a)}
.ti{font:600 23px/1.05 var(--hf);letter-spacing:-.02em}
.sub{font:500 9.5px/1 var(--hf);letter-spacing:.22em;color:#77777f;margin-top:5px}
.pill{border-radius:999px;background:#141419;border:1px solid #26262e;padding:8px 13px;font:600 11px var(--hf);letter-spacing:.1em;color:#dcdce2}
.pill.g{background:linear-gradient(135deg,#f4e0b4,#c8a25a);border-color:#c8a25a;color:#191307}

/* contenido */
#mn{padding:2px 12px 10px;gap:10px}

/* tarjetas de datos */
.tiles{gap:8px;grid-template-columns:repeat(4,minmax(0,1fr))}
.tiles div{min-width:0;background:linear-gradient(180deg,#141419,#0e0e12);border:1px solid #22222a;border-radius:18px;padding:13px 4px 11px;position:relative;overflow:hidden}
.tiles div::after{content:'';position:absolute;inset:0;background:radial-gradient(80% 60% at 50% 0,#ffffff08,transparent 70%);pointer-events:none}
.tiles b{font:600 25px/1 var(--hf);letter-spacing:-.03em;color:#fff}
.tiles div:last-child b{color:var(--gd)}
.tiles small{display:block;font:600 8.5px var(--hf);letter-spacing:.1em;color:#787883;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}

/* barra inferior */
.tab{overflow:hidden;background:#0c0c0fcc;backdrop-filter:blur(16px);border-top:1px solid #ffffff0d;gap:2px;padding:8px 8px calc(8px + env(safe-area-inset-bottom,0))}
.tab button{font:600 9px var(--hf);letter-spacing:.08em;color:#74747f;gap:5px;padding:9px 2px;border-radius:14px;min-width:0}
.tab button.on{color:#08080a;background:#f3f0e9;box-shadow:0 8px 18px #000a}
.tab button span{font-size:9px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%}

/* botones */
.btn,.tb button{border-radius:16px;background:#14141a;border:1px solid #24242c;font:600 13px var(--hf);letter-spacing:.08em}
.btn{padding:11px 15px}
.btn.g{background:#f3f0e9;border-color:#f3f0e9;color:#0a0a0c}
.btn.r{background:linear-gradient(180deg,#e01a26,#b00d18);border-color:#e0142340}
.btn.o{background:transparent;border-color:#ff5a6240;color:#ff7079}
.tb button{font-size:11px;padding:9px 0;gap:4px;max-width:190px}
.tb svg{color:var(--gd)}

/* hojas y formularios */
.sh h3{font:600 22px/1.1 var(--hf);letter-spacing:-.01em}
.x{background:#14141a;border-color:#26262e}
label{font:600 9.5px var(--hf);letter-spacing:.18em;color:#7b7b86}
input[type=text],input[type=number],input[type=password],select{width:100%;padding:12px 13px;border-radius:14px;background:#101014;border:1px solid #24242c;font:500 15px 'Inter Tight',sans-serif;color:#f3f0e9}
input:focus,select:focus{border-color:#d9b96e66}
select{appearance:none;background-image:linear-gradient(45deg,transparent 50%,#8a8a96 50%),linear-gradient(135deg,#8a8a96 50%,transparent 50%);background-position:calc(100% - 20px) 50%,calc(100% - 14px) 50%;background-size:6px 6px,6px 6px;background-repeat:no-repeat;padding-right:40px}
.seg button{border-radius:14px;background:#101014;border:1px solid #24242c;font:600 14px var(--hf);padding:11px 4px}
.seg .on{background:#f3f0e9;color:#08080a;border-color:#f3f0e9}
.chip{font:600 11px var(--hf);letter-spacing:.06em}
.tabs button{border-radius:999px;background:#101014;border-color:#24242c;font:600 12px var(--hf)}
.tabs .on{background:#f3f0e9;color:#08080a}
.rw{border-bottom:1px solid #ffffff08;border-radius:12px;padding:0 6px}
.rw b{font:600 17px var(--hf)}
.rw .vv{color:var(--gd);font:700 23px var(--hf)}
.av{border-color:#d9b96e55;background:linear-gradient(135deg,#1a1a21,#0f0f13)}
.emp{font-size:13px}
.tip{font-size:12px;line-height:1.5;color:#7d7d88}
.addc{border-radius:16px;background:#101014;border-color:#2a2a33}

/* ================= C A R T A ================= */
.cr{border-radius:3cqw;filter:drop-shadow(0 12px 22px #000d);font-family:var(--hf)}
.cr .ra{left:13%;width:27%;top:11.2%;text-align:center;font:700 21cqw/1 var(--hf);letter-spacing:-.05em;color:#f7e7bd;text-shadow:0 2px 12px #0009}
.cr .po{left:13%;width:27%;top:30.2%;text-align:center;font:600 7.4cqw/1 var(--hf);letter-spacing:.16cqw;color:#efe6cf;font-style:normal;opacity:.94}
.cr .ph{left:35%;top:7.2%;width:53%;height:46%}
.cr .ph img{object-position:50% 18%}
.cr .cn{left:10%;right:10%;top:48.6%;font:600 8.4cqw/1.06 var(--hf);letter-spacing:-.01em}
.cr .cs{left:19%;right:19%;top:57.2%;row-gap:1.4cqw;column-gap:10%}
.cr .cs span{font:500 6.1cqw/1 var(--hf);color:#d9cdb1;letter-spacing:.02em}
.cr .cs b{font:700 7.7cqw/1 var(--hf);color:#fff;min-width:8cqw}

/* escudo: uno solo, debajo de la posición */
.cr .ce{object-fit:contain;z-index:2;filter:drop-shadow(0 2px 6px #000b);pointer-events:none}

/* bandera del país */
.cr .ctf{object-fit:contain;z-index:3;border-radius:.7cqw;box-shadow:0 2px 7px #000b,0 0 0 .4cqw #00000060}
.cr.mini .ctf{box-shadow:0 1px 4px #000b,0 0 0 .5cqw #00000060}
.cr.mini .ce{transform:translateY(32%)}

/* flecha de aptitud (gruesa, con degradado) */
.cr .apt{width:8%;aspect-ratio:1;left:24%;top:71.4%;z-index:3;
  clip-path:polygon(50% 0,100% 41%,72% 41%,72% 100%,28% 100%,28% 41%,0 41%);
  background:linear-gradient(168deg,#ffd9ab 0%,#ff7d47 32%,#f02a37 66%,#b20d19 100%);
  filter:drop-shadow(0 3px 7px #000c)}
.cr .apt.def{transform:rotate(180deg);background:linear-gradient(168deg,#d3f4ff 0%,#66bbff 32%,#2f86f6 66%,#1b3ad0 100%)}
.cr .apt i{position:absolute;inset:0;background:linear-gradient(180deg,#ffffff5c,#fff0 56%)}
.cr.mini .apt{width:13%;top:71.8%;left:23%}

/* capitán */
.cr .cap{right:5.5%;top:5.5%;width:13.5%;aspect-ratio:1;border-radius:50%;z-index:4;
  display:flex;align-items:center;justify-content:center;
  background:radial-gradient(circle at 34% 26%,#fffae8,#f0d79b 34%,#c9a25a 62%,#8d6a25 100%);
  box-shadow:0 0 0 .55cqw #07070aB8,inset 0 0 0 1.25cqw #f8e8bd,inset 0 -.6cqw 1.2cqw #8a6a2466,0 6px 14px #000b,0 0 18px #d9b96e55}
.cr .cap span{font:700 8cqw/1 var(--hf);color:#241a06;letter-spacing:-.06em;text-shadow:0 1px 0 #fff9}
.cr.mini .cap{width:19%}

/* cambio de media: grande y con número */
.cr .dl{left:auto;right:11%;top:71.2%;bottom:auto;width:auto;display:inline-flex;align-items:center;justify-content:center;
  padding:.85cqw 2.3cqw;border-radius:99px;font:700 8.2cqw/1 var(--hf);letter-spacing:-.02em;z-index:3;
  background:linear-gradient(160deg,#123b24,#0a2417);color:#63e39a;border:1px solid #3fd47f4d;box-shadow:0 3px 9px #000b}
.cr .dl.dn{background:linear-gradient(160deg,#3d1220,#260a11);color:#ff7b84;border-color:#ff5a624d}
.cr.mini .dl{font-size:9.5cqw;padding:1cqw 2.4cqw;right:11%;top:70.6%}

/* mini carta */
.cr.mini .ra{font-size:21cqw;top:10.5%}
.cr.mini .po{font-size:max(7px,9.5cqw);top:25.5%}
.cr.mini .cn{font-size:max(9px,15cqw);left:9%;right:9%;top:55%}

/* los controles de la carta no deben recibir clics salvo en el editor */
.cr .ce,.cr .ctf{pointer-events:none}

/* editor de carta */
.edbox{position:relative;width:min(300px,74vw);margin:4px auto 10px}
.edbox .cr{width:100%}
.edbox .ce,.edbox .ctf{pointer-events:auto;cursor:grab;touch-action:none;outline:1px dashed #ffffff70;outline-offset:2px;border-radius:2px}
.edbox .ce:active,.edbox .ctf:active{cursor:grabbing}
.edbox .ce{outline-color:#d9b96e99}
.edbox .ctf{outline-color:#66bbff99}
.szr{display:flex;align-items:center;gap:10px;margin-top:8px}
.szr input{flex:1}
.szr span{font:600 10px var(--hf);letter-spacing:.14em;color:#7b7b86;width:64px}

/* extras del modal de jugador */
.pmod{margin-top:4px}
.aptseg button{display:flex;align-items:center;justify-content:center;gap:7px}
.aptseg button.on:first-child{background:linear-gradient(160deg,#ff9a5a,#c40d1a);border-color:#e01423;color:#fff}
.aptseg button.on:last-child{background:linear-gradient(160deg,#63b9ff,#1b3fd8);border-color:#2f86f6;color:#fff}
.aptseg button.on .aptdot{background:#fff}
.aptdot{width:10px;height:10px;border-radius:3px;display:inline-block}
.aptdot.of{background:linear-gradient(160deg,#ff9a5a,#d2121f)}
.aptdot.def{background:linear-gradient(160deg,#7fd4ff,#1b3fd8)}
.aprow{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:9px 2px;border-bottom:1px solid #ffffff08}
.aprow b{font:600 16px var(--hf)}
.aprow small{display:block;font:500 10px var(--hf);letter-spacing:.12em;color:#7d7d88;text-transform:uppercase}
.aptpick{display:flex;gap:6px}
.aptpick button{width:50px;padding:8px 0;border-radius:12px;border:1px solid #24242c;background:#101014;font:600 11px var(--hf);letter-spacing:.06em;color:#8a8a96}
.aptpick button.on.of{background:linear-gradient(160deg,#ff8a4a,#c40d1a);color:#fff;border-color:#e01423}
.aptpick button.on.def{background:linear-gradient(160deg,#63b9ff,#1b3fd8);color:#fff;border-color:#2f86f6}

/* ================= PARTIDOS ================= */
.frm{display:flex;gap:6px;align-items:center;justify-content:center;flex:none;min-height:26px}
.frm small{color:var(--mu);font-size:12px}
.fm{width:26px;height:26px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font:700 13px var(--hf);color:#fff}
.fm.V{background:linear-gradient(160deg,#31c476,#12703b)}
.fm.E{background:#3a3a44}
.fm.D{background:linear-gradient(160deg,#e01a26,#a30d17)}
.mr{display:grid;grid-template-columns:38px 1fr auto;gap:12px;align-items:center;padding:13px 6px;border-bottom:1px solid #ffffff0a;cursor:pointer;flex:none}
.mr b{font:600 15.5px var(--hf);letter-spacing:-.01em}
.mr small{display:block;color:var(--mu);font:500 11px var(--hf);letter-spacing:.08em;text-transform:uppercase;margin-top:3px}
.mrt{display:flex;align-items:center;gap:8px;text-align:right}
.mre{width:34px;height:34px;object-fit:contain}
.mre.big{width:76px;height:76px;margin:0 auto 10px;display:block}
.ph0{display:flex;align-items:center;justify-content:center;border-radius:50%;background:var(--s2);border:1px solid var(--ln);font:700 15px var(--hf)}
.ph0.big{font-size:30px;width:76px;height:76px;margin:0 auto 10px}
.nx{display:grid;grid-template-columns:34px 1fr;gap:12px;align-items:center;background:linear-gradient(180deg,#141419,#0e0e12);border:1px solid #22222a;border-radius:16px;padding:11px 13px;flex:none;cursor:pointer}
.nx b{font:600 14.5px var(--hf);letter-spacing:-.01em}
.nx small{display:block;color:var(--mu);font:500 11px var(--hf);letter-spacing:.08em;text-transform:uppercase;margin-top:3px}
.ap{display:flex;align-items:center;justify-content:space-between;padding:7px 2px;border-bottom:1px solid #ffffff08}
.ap b{font:500 15px var(--hf)}
.as{width:44px;height:36px;border-radius:12px;border:1px solid #26262e;background:#101014;font:700 15px var(--hf);color:#8a8a96}
.as.y{background:linear-gradient(160deg,#31c476,#12703b);border-color:#31c476;color:#fff}
.as.m{background:linear-gradient(160deg,#e2c06a,#a8843c);border-color:#e2c06a;color:#1a1405}
.as.n{background:linear-gradient(160deg,#e01a26,#a30d17);border-color:#e01a26;color:#fff}
input[type=datetime-local]{width:100%;padding:12px 13px;border:1px solid #24242c;border-radius:14px;background:#101014;font:500 15px 'Inter Tight',sans-serif;color:#f3f0e9;color-scheme:dark}
/* vista previa de fondo */
.prevbox{width:min(300px,72vw);margin:10px auto 14px}
.bgbig{width:min(280px,70vw);aspect-ratio:600/894;margin:8px auto 4px;border-radius:14px;border:1px solid #2a2a33;background-size:100% 100%;box-shadow:0 16px 30px #000b}
.row2{display:grid;grid-template-columns:1fr 1fr;gap:8px;align-items:stretch}
.bgprev{display:flex;align-items:center;gap:10px;background:#101014;border:1px solid #24242c;border-radius:16px;padding:9px 11px;cursor:pointer;min-width:0}
.bgthumb{width:40px;height:60px;flex:none;border-radius:8px;border:1px solid #2c2c35;background-size:100% 100%;background-position:center;background-repeat:no-repeat}
.bgprev b{display:block;font:600 12.5px var(--hf);letter-spacing:0}
.bgprev small{display:block;color:#7d7d88;font-size:11px;margin-top:3px}
` }));

/* ---------- iconos nuevos ---------- */
IC.edit = '<path d="M4 20h4l10-10-4-4L4 16z"/><path d="M14 6l4 4"/>';
IC.bolt = '<path d="M13 3L5 14h6l-1 7 8-11h-6z"/>';
IC.flag = '<path d="M5 21V4h9l1 2h4v9h-6l-1-2H5"/>';
IC.cal = '<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4"/>';
IC.bell = '<path d="M6 17V11a6 6 0 0112 0v6l2 2H4zM10 21h4"/>';

/* ---------- helpers ---------- */
const FL = c => 'https://flagcdn.com/w160/' + String(c || 'ar').toLowerCase() + '.png';

const CT = [
  ['AR','Argentina'],['BO','Bolivia'],['BR','Brasil'],['CL','Chile'],['CO','Colombia'],
  ['CR','Costa Rica'],['CU','Cuba'],['DO','Rep. Dominicana'],['EC','Ecuador'],['GT','Guatemala'],
  ['HN','Honduras'],['MX','México'],['PA','Panamá'],['PY','Paraguay'],['PE','Perú'],
  ['PR','Puerto Rico'],['SV','El Salvador'],['UY','Uruguay'],['VE','Venezuela'],['US','Estados Unidos'],
  ['CA','Canadá'],['ES','España'],['IT','Italia'],['FR','Francia'],['DE','Alemania'],
  ['PT','Portugal'],['NL','Países Bajos'],['BE','Bélgica'],['CH','Suiza'],['AT','Austria'],
  ['GB','Inglaterra'],['gb-eng','Inglaterra (bandera)'],['gb-sct','Escocia'],['gb-wls','Gales'],['ie','Irlanda'],
  ['HR','Croacia'],['RS','Serbia'],['PL','Polonia'],['SE','Suecia'],['NO','Noruega'],
  ['DK','Dinamarca'],['TR','Turquía'],['GR','Grecia'],['CZ','Rep. Checa'],['UA','Ucrania'],
  ['MA','Marruecos'],['SN','Senegal'],['NG','Nigeria'],['GH','Ghana'],['EG','Egipto'],
  ['JP','Japón'],['KR','Corea del Sur'],['AU','Australia'],['NZ','Nueva Zelanda']
].filter(([c]) => c !== 'gb-eng');

/* ---------- persist: cambio de media ---------- */
const _persist = persist;
persist = function () {
  S.p.forEach(p => {
    if (p.l == null) p.l = p.ovr;
    if (p.ovr !== p.l) {
      if (!p.pt || Date.now() - p.pt > 6e4) p.pv = p.l;
      p.pt = Date.now(); p.l = p.ovr; p.d = p.ovr - p.pv;
      if (!p.d) delete p.d;
    }
  });
  _persist();
};

/* ---------- carta ---------- */
card = function (p, mini) {
  const c = E('div', 'cr' + (mini ? ' mini' : ''));
  c.dataset.pid = p.id;

  const ra = E('div', 'ra', String(p.ovr ?? ''));
  const po = E('i', 'po', p.pos || '');

  const ph = E('div', 'ph');
  if (img(p)) {
    const i = E('img'); i.src = img(p); i.alt = '';
    if (p.cr && isFinite(p.cr.w)) i.style.cssText = cs(p.cr);
    ph.append(i);
  } else ph.innerHTML = SIL;

  const ce = E('img', 'ce'); ce.src = ESC(); ce.alt = ''; ce.draggable = false;
  const e = p.esc || {};
  ce.style.left = (e.x ?? 20) + '%';
  ce.style.top = (e.y ?? 36) + '%';
  ce.style.width = (e.w ?? 13) + '%';

  let cf = null;
  if (p.ct) {
    cf = E('img', 'ctf'); cf.src = FL(p.ct); cf.alt = ''; cf.draggable = false;
    cf.onerror = () => { cf.style.display = 'none' };
    const f = p.ctp || {};
    cf.style.left = (f.x ?? 11) + '%';
    cf.style.top = (f.y ?? 71.4) + '%';
    cf.style.width = (f.w ?? 10.5) + '%';
  }

  c.append(ra, po, ph, ce, E('div', 'cn', p.name || '—'));

  if (!mini) {
    const s = E('div', 'cs');
    [['GOL', p.g], ['SAL', p.s], ['AST', p.a], ['DOR', num(p) || '-']].forEach(([l, v]) => {
      const d = E('span'); d.append(E('b', 0, v), document.createTextNode(l)); s.append(d);
    });
    c.append(s);
  }

  if (cf) c.append(cf);

  if (p.apt) {
    const a = E('div', 'apt ' + (p.apt === 'def' ? 'def' : 'of'));
    a.append(E('i'));
    c.append(a);
  }

  if (S.cap === p.id) {
    const cp = E('div', 'cap'); cp.append(E('span', 0, 'C')); c.append(cp);
  }

  if (p.d) {
    const dl = E('div', 'dl' + (p.d < 0 ? ' dn' : ''));
    dl.textContent = (p.d > 0 ? '▲' : '▼') + Math.abs(p.d);
    c.append(dl);
  }

  return c;
};

/* ---------- editor de carta ---------- */
function dragItem(el, cr, obj) {
  if (!el) return;
  el.addEventListener('pointerdown', ev => {
    if (ev.button !== undefined && ev.button !== 0) return;
    ev.preventDefault(); ev.stopPropagation();
    const r = cr.getBoundingClientRect(), er = el.getBoundingClientRect();
    const ox = (ev.clientX - er.left) / r.width * 100;
    const oy = (ev.clientY - er.top) / r.height * 100;
    try { el.setPointerCapture(ev.pointerId) } catch (e) {}
    el.style.cursor = 'grabbing';

    const move = m => {
      let x = (m.clientX - r.left) / r.width * 100 - ox;
      let y = (m.clientY - r.top) / r.height * 100 - oy;
      x = Math.max(0, Math.min(100, x)); y = Math.max(0, Math.min(100, y));
      obj.x = +x.toFixed(1); obj.y = +y.toFixed(1);
      el.style.left = obj.x + '%'; el.style.top = obj.y + '%';
    };
    const up = () => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerup', up);
      el.removeEventListener('pointercancel', up);
      el.style.cursor = 'grab';
      persist();
    };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerup', up);
    el.addEventListener('pointercancel', up);
  });
}

function cardEditor(p) {
  sheet('Editar carta', sh => {
    const eo = p.esc = p.esc || { x: 20, y: 36, w: 13 };
    const fo = p.ctp = p.ctp || { x: 11, y: 71.4, w: 10.5 };

    const box = E('div', 'edbox');
    const cr = card(p, false);
    box.append(cr);
    sh.append(box);
    sh.append(E('p', 'tip', 'Arrastrá el escudo (dorado) y la bandera (azul) para moverlos. Los controles cambian el tamaño.'));

    dragItem(cr.querySelector('.ce'), cr, eo);
    dragItem(cr.querySelector('.ctf'), cr, fo);

    /* tamaño del escudo */
    const r1 = E('input'); r1.type = 'range'; r1.min = 6; r1.max = 32; r1.step = .5; r1.value = eo.w;
    const l1 = E('span', 0, 'Escudo');
    const w1 = E('div', 'szr'); w1.append(l1, r1);
    r1.oninput = () => { eo.w = +r1.value; const q = cr.querySelector('.ce'); if (q) q.style.width = eo.w + '%'; };
    r1.onchange = () => persist();

    /* tamaño de la bandera */
    const r2 = E('input'); r2.type = 'range'; r2.min = 5; r2.max = 24; r2.step = .5; r2.value = fo.w;
    const l2 = E('span', 0, 'Bandera');
    const w2 = E('div', 'szr'); w2.append(l2, r2);
    r2.oninput = () => { fo.w = +r2.value; const q = cr.querySelector('.ctf'); if (q) q.style.width = fo.w + '%'; };
    r2.onchange = () => persist();

    /* país */
    sh.append(E('label', 0, 'País del jugador'));
    const sel = E('select');
    sel.append(Object.assign(document.createElement('option'), { value: '', textContent: 'Sin país' }));
    CT.forEach(([c, n]) => sel.append(Object.assign(document.createElement('option'), { value: c, textContent: n })));
    sel.value = p.ct || '';
    sel.onchange = () => {
      if (sel.value) { p.ct = sel.value; p.ctp = p.ctp || { x: 11, y: 71.4, w: 10.5 }; }
      else delete p.ct;
      persist(); cardEditor(p);
    };
    sh.append(sel, w1, w2);

    /* acciones */
    const bx = E('div', 'btns');
    const c1 = E('button', 'btn', 'Centrar escudo');
    c1.onclick = () => { p.esc = { x: 20, y: 36, w: 13 }; persist(); cardEditor(p); };
    const c2 = E('button', 'btn', 'Restablecer');
    c2.onclick = () => { delete p.esc; delete p.ctp; persist(); cardEditor(p); };
    bx.append(c1, c2);
    sh.append(bx);

    const ok = E('button', 'btn g'); ok.textContent = 'Listo';
    ok.style.cssText = 'width:100%;margin-top:12px';
    ok.onclick = closeS;
    sh.append(ok);
  });
}

/* ---------- modal de jugador: aptitud + acceso al editor ---------- */
const _modal = modal;
modal = function (p, isNew) {
  _modal(p, isNew);
  const sh = document.querySelector('#m .sh');
  if (!sh || !sh.querySelector('.mc')) return;
  const btns = sh.querySelector('.btns');

  const wrap = E('div', 'pmod');

  wrap.append(E('label', 0, 'Aptitud'));
  const sg = E('div', 'seg aptseg');
  [['of', 'Ofensivo'], ['def', 'Defensivo']].forEach(([k, l]) => {
    const b = E('button', p.apt === k ? 'on' : '');
    const dot = E('i', 'aptdot ' + k);
    b.append(dot, document.createTextNode(l));
    b.onclick = () => { p.apt = p.apt === k ? null : k; persist(); modal(p, isNew); };
    sg.append(b);
  });
  wrap.append(sg);

  const eb = E('button', 'btn');
  eb.style.cssText = 'width:100%;margin-top:14px';
  eb.innerHTML = ic('edit', 18) + ' Personalizar carta';
  eb.onclick = () => cardEditor(p);
  wrap.append(eb);

  const cb = E('button', 'btn' + (S.cap === p.id ? ' g' : ''));
  cb.style.cssText = 'width:100%;margin-top:8px';
  cb.innerHTML = (S.cap === p.id ? '★ Capitán del equipo' : '☆ Hacer capitán');
  cb.onclick = () => { S.cap = S.cap === p.id ? null : p.id; persist(); modal(p, isNew) };
  wrap.append(cb);

  if (btns) sh.insertBefore(wrap, btns);
  else sh.append(wrap);
};

/* ---------- ajustes: vista previa del fondo ---------- */
function bgPreview(dataUri, isNew) {
  sheet('Fondo de carta', sh => {
    const big = E('div', 'bgbig');
    big.style.background = 'url("' + dataUri + '") center/100% 100% no-repeat';
    sh.append(big);

    const best = [...S.p].filter(p => p.st).sort((a, b) => b.ovr - a.ovr)[0] || S.p[0];
    if (best) {
      const lbl = E('div', 'lbl'); lbl.innerHTML = 'Así se ve en <em>una carta</em>';
      const fig = E('div', 'prevbox');
      const wrapped = card(best, false);
      fig.append(wrapped);
      sh.append(lbl, fig);
    }

    const bx = E('div', 'btns');
    const no = E('button', 'btn b', 'Cancelar');
    no.onclick = () => settings();
    const ok = E('button', 'btn g b', isNew ? 'Usar este fondo' : 'Aplicar');
    ok.onclick = () => { S.carta = dataUri; persist(); settings(); };
    bx.append(no, ok);
    sh.append(bx);
  });
}

const _settings = settings;
settings = function () {
  _settings();
  const sh = document.querySelector('#m .sh');
  if (!sh) return;

  const wrap = E('div');
  wrap.append(E('label', 0, 'Vista previa'));

  const best = [...S.p].filter(p => p.st).sort((a, b) => b.ovr - a.ovr)[0] || S.p[0];
  if (best) {
    const pb = E('div', 'prevbox');
    pb.append(card(best, false));
    wrap.append(pb);
  }

  const row = E('div', 'row2');
  const cur = E('div', 'bgprev');
  const th = E('div', 'bgthumb');
  th.style.background = 'url("' + (S.carta || '/carta.png') + '") center/100% 100% no-repeat';
  const tt = E('div');
  tt.append(E('b', 0, S.carta ? 'Fondo personalizado' : 'Fondo original'), E('small', 0, '600 × 894'));
  tt.querySelector('b').style.font = "600 13px 'Space Grotesk',sans-serif";
  tt.querySelector('small').style.cssText = 'display:block;color:#7d7d88;font-size:11px;margin-top:2px';
  cur.append(th, tt);
  cur.onclick = () => bgPreview(S.carta || '/carta.png', !S.carta);

  const pick = E('button', 'btn');
  pick.innerHTML = ic('cam', 18) + ' Probar fondo';
  pick.onclick = () => pickImg(600, d => bgPreview(d, true));

  row.append(cur, pick);
  wrap.append(row);
  wrap.append(E('p', 'tip', 'Probá el fondo antes de aplicarlo y mirá cómo queda con una carta real.'));

  /* insertar antes de los dos últimos botones (Descartar / Listo) */
  const kids = [...sh.children];
  const anchor = kids.length >= 3 ? kids[kids.length - 2] : null;
  if (anchor) sh.insertBefore(wrap, anchor); else sh.append(wrap);
};

/* ---------- alineación: sin flechas, con aptitudes ---------- */
function aptSheet() {
  sheet('Aptitud por jugador', sh => {
    const list = E('div');
    S.p.filter(p => p.st).forEach(p => {
      const r = E('div', 'aprow');
      const n = E('div');
      n.append(E('b', 0, p.name), E('small', 0, p.pos));
      const pk = E('div', 'aptpick');
      [['of', 'Of'], ['def', 'Def']].forEach(([k, l]) => {
        const b = E('button', p.apt === k ? 'on ' + k : '', l);
        b.onclick = () => { p.apt = p.apt === k ? null : k; persist(); aptSheet(); render(); };
        pk.append(b);
      });
      r.append(n, pk);
      list.append(r);
    });
    sh.append(list);
    sh.append(E('p', 'tip', 'Naranja = ofensivo, azul = defensivo. La flecha se dibuja en la carta del jugador.'));
    const ok = E('button', 'btn g'); ok.textContent = 'Listo';
    ok.style.cssText = 'width:100%;margin-top:12px';
    ok.onclick = closeS;
    sh.append(ok);
  });
}

const _vLine = vLine;
vLine = function () {
  const w = _vLine();
  if (dt) {
    const tb = w.find(n => n.classList && n.classList.contains('tb'));
    if (tb) {
      const b = E('button');
      b.innerHTML = ic('bolt') + '<span>Aptitud</span>';
      b.onclick = aptSheet;
      tb.insertBefore(b, tb.children[1] || null);
    }
  }
  return w;
};

/* ---------- partidos (igual que antes) ---------- */
const xR = m => m.gf > m.ga ? 'V' : m.gf < m.ga ? 'D' : 'E';
const xPl = () => (S.m || []).filter(m => m.pl).sort((a, b) => new Date(b.d) - new Date(a.d));
const xDt = m => new Date(m.d).toLocaleString('es-AR', { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
const xEsc = (m, c) => {
  const s = img({ img: m.re });
  if (s) { const i = E('img', c); i.src = s; i.alt = ''; return i }
  return E('div', c + ' ph0', (m.rival || '?').trim().slice(0, 1).toUpperCase());
};
function xForm() {
  const l = xPl().slice(0, 5).reverse(), w = E('div', 'frm');
  l.forEach(m => w.append(E('span', 'fm ' + xR(m), xR(m))));
  if (!l.length) w.append(E('small', 0, 'Sin partidos jugados'));
  return w;
}
function xRow(m) {
  const r = E('div', 'mr'), n = E('div'), k = Object.values(m.at || {}), rt = E('div', 'mrt');
  n.append(E('b', 0, (m.t || 'Partido') + ' vs ' + (m.rival || 'Rival')), E('small', 0, xDt(m)));
  if (m.pl) rt.append(E('span', 'fm ' + xR(m), xR(m)), E('b', 0, m.gf + ' - ' + m.ga));
  else rt.append(E('small', 0, '✓' + k.filter(v => v === 'y').length + ' ?' + k.filter(v => v === 'm').length + ' ✕' + k.filter(v => v === 'n').length));
  r.append(xEsc(m, 'mre'), n, rt);
  r.onclick = () => xSheet(m);
  return r;
}
function xAdd() {
  const d = new Date(Date.now() + 864e5); d.setHours(21, 0, 0, 0);
  const m = { id: Date.now(), rival: '', d: new Date(d - d.getTimezoneOffset() * 6e4).toISOString().slice(0, 16), t: 'Partido', pl: 0, gf: 0, ga: 0, at: {} };
  S.m.push(m); persist(); xSheet(m);
}
function xSheet(m) {
  sheet((m.t || 'Partido') + ' vs ' + (m.rival || 'Rival'), sh => {
    sh.append(xEsc(m, 'mre big'));
    if (dt) {
      sh.append(fld('Rival', m, 'rival', 'text'), fld('Fecha y hora', m, 'd', 'datetime-local'), E('label', 0, 'Tipo'), seg(['Partido', 'Amistoso', 'Entrenamiento'], m.t, v => { m.t = v; persist() }));
      const bx = E('div', 'btns'), b = E('button', 'btn');
      b.innerHTML = ic('cam', 18) + ' Escudo rival';
      b.onclick = () => pickImg(200, d => { m.re = d; persist(); xSheet(m) });
      bx.append(b);
      if (m.re) { const q = E('button', 'btn o', 'Quitar'); q.onclick = () => { delete m.re; persist(); xSheet(m) }; bx.append(q) }
      sh.append(bx, E('label', 0, 'Estado'), seg(['Pendiente', 'Jugado'], m.pl ? 'Jugado' : 'Pendiente', v => { m.pl = v === 'Jugado' ? 1 : 0; persist(); xSheet(m) }));
      if (m.pl) { const g = E('div', 'f3'); g.append(fld('Nosotros', m, 'gf'), fld('Rival', m, 'ga')); sh.append(g) }
    } else sh.append(E('p', 'tip', xDt(m) + (m.pl ? ' · ' + m.gf + ' - ' + m.ga : '')));
    sh.append(E('label', 0, '¿Asistís?')); m.at = m.at || {};
    const sm = E('p', 'tip'), us = () => { const k = Object.values(m.at); sm.textContent = '✓ ' + k.filter(v => v === 'y').length + '   ? ' + k.filter(v => v === 'm').length + '   ✕ ' + k.filter(v => v === 'n').length };
    const O = ['', 'y', 'm', 'n'], L = { y: '✓', m: '?', n: '✕' };
    S.p.forEach(p => {
      const r = E('div', 'ap'), b = E('button', 'as ' + (m.at[p.id] || ''), L[m.at[p.id]] || '·');
      b.onclick = () => {
        const v = O[(O.indexOf(m.at[p.id] || '') + 1) % 4];
        if (v) m.at[p.id] = v; else delete m.at[p.id];
        b.className = 'as ' + v; b.textContent = L[v] || '·'; us(); persist();
        if (!dt) api({ act: 'rsvp', mid: m.id, pid: p.id, v });
      };
      r.append(E('b', 0, p.name), b); sh.append(r);
    });
    us(); sh.append(sm);
    const bx = E('div', 'btns'), ok = E('button', 'btn g b', 'Listo'); ok.onclick = closeS;
    if (dt) { const d = E('button', 'btn o', 'Eliminar'); d.onclick = () => { if (confirm('¿Eliminar este partido?')) { S.m = S.m.filter(q => q !== m); persist(); closeS() } }; bx.append(d) }
    bx.append(ok); sh.append(bx);
  });
}
function vMatch() {
  const pl = xPl(), c = { V: 0, E: 0, D: 0 }, t = E('div', 'tiles');
  pl.forEach(m => c[xR(m)]++);
  [['PJ', pl.length], ['V', c.V], ['E', c.E], ['D', c.D]].forEach(([l, v]) => { const d = E('div'); d.append(E('b', 0, v), E('small', 0, l)); t.append(d) });
  const w = [t, xForm()], tb = E('div', 'tb');
  if (dt) { const b = E('button'); b.innerHTML = ic('add') + '<span>Agendar</span>'; b.onclick = xAdd; tb.append(b) }
  if ('Notification' in window && Notification.permission !== 'granted') {
    const b = E('button'); b.innerHTML = ic('bell') + '<span>Activar avisos</span>';
    b.onclick = () => Notification.requestPermission().then(() => render()); tb.append(b);
  }
  if (tb.children.length) w.push(tb);
  const up = S.m.filter(m => !m.pl).sort((a, b) => new Date(a.d) - new Date(b.d));
  [...up, ...pl].forEach(m => w.push(xRow(m)));
  if (!S.m.length) w.push(E('p', 'emp', 'Todavía no hay partidos.'));
  return w;
}
const _vh = vHome;
vHome = function () {
  const w = _vh();
  const n = S.m.filter(m => !m.pl && new Date(m.d) > Date.now()).sort((a, b) => new Date(a.d) - new Date(b.d))[0];
  if (n) {
    const b = E('div', 'nx'), t = E('div');
    t.append(E('b', 0, 'Próximo: ' + (n.t || 'Partido') + ' vs ' + (n.rival || 'Rival')), E('small', 0, xDt(n)));
    b.append(xEsc(n, 'mre'), t);
    b.onclick = () => { view = 'match'; render() };
    w.splice(1, 0, b);
  }
  if (xPl().length) w.splice(1, 0, xForm());
  return w;
};

/* ---------- render con pestaña Partidos ---------- */
render = function () {
  S.m = S.m || [];
  const A = $('#app'); A.textContent = '';
  const sub = {
    home: S.sub,
    line: 'Formación ' + S.f + ' · ' + S.n + ' en cancha',
    squad: 'Plantel · ' + S.p.length + ' jugadores',
    top: 'Los mejores del plantel',
    match: 'Partidos · ' + xPl().length + ' jugados'
  }[view];
  const mn = E('main'); mn.id = 'mn'; mn.className = dt ? 'dt' : '';
  ({ home: vHome, line: vLine, squad: vSquad, top: vTop, match: vMatch }[view])().forEach(n => mn.append(n));
  const tb = E('nav', 'tab');
  [['home', 'Inicio', 'home'], ['line', 'Alineación', 'field'], ['squad', 'Plantel', 'squad'], ['match', 'Partidos', 'cal'], ['top', 'Top', 'trophy']]
    .forEach(([v, l, i]) => {
      const b = E('button', v === view ? 'on' : '');
      b.innerHTML = ic(i, 22) + '<span>' + l + '</span>';
      b.onclick = () => { view = v; render() };
      tb.append(b);
    });
  A.append(hdr(sub), mn, tb);
  document.documentElement.style.setProperty('--carta', 'url("' + (S.carta || '/carta.png') + '")');
  fit();
};

/* ---------- avisos ---------- */
function xNotify(t, o) {
  const f = () => { try { new Notification(t, o) } catch (e) {} };
  if (navigator.serviceWorker) navigator.serviceWorker.getRegistration().then(r => r ? r.showNotification(t, o) : f()).catch(f);
  else f();
}
function xTick() {
  if (!('Notification' in window) || Notification.permission !== 'granted') return;
  let f = {}; try { f = JSON.parse(localStorage.getItem('nf') || '{}') } catch (e) {}
  const now = Date.now();
  (S.m || []).forEach(m => {
    const t = new Date(m.d).getTime(); if (m.pl || !t) return;
    const d8 = new Date(t); d8.setHours(8, 0, 0, 0);
    const hh = new Date(t).toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
    const w = (m.t || 'Partido') + ' vs ' + (m.rival || 'Rival');
    [['d', t > d8.getTime() ? d8.getTime() : Infinity, 'Hoy: ' + w + ' a las ' + hh, 432e5],
     ['h', t - 18e5, 'En 30 min: ' + w, 18e5],
     ['s', t, '¡Arrancó! ' + w, 36e5]].forEach(([k, at, msg, win]) => {
      const key = m.id + k;
      if (f[key] || now < at || now > at + win) return;
      f[key] = 1;
      xNotify(S.team || 'Milan', { body: msg, icon: ESC(), tag: key });
    });
  });
  try { localStorage.setItem('nf', JSON.stringify(f)) } catch (e) {}
}
if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js').catch(() => {});
setInterval(xTick, 3e4);
document.addEventListener('visibilitychange', xTick);
xTick();
render();
