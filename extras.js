/* =====================================================================
   extras.js · Milan Athletic Club · v2
   Se carga DESPUÉS del script principal (index.html v2).

   · DOS plantillas de carta editables por separado:
       - "Alineación": la carta chica que se ve en la cancha y el plantel
       - "Carta": la carta grande que se abre al elegir un jugador
   · Partidos, aptitud, capitán, bandera, cambio de media y avisos
   · Layout de PC (barra lateral) y celular (dock flotante)
   ===================================================================== */

/* ---------- estilos ---------- */
document.head.append(Object.assign(document.createElement('style'), { textContent: `
:root{
  --bg:#0a0a10; --s1:#12121a; --s2:#1a1a26; --ln:#2b2b3c;
  --tx:#f7f4ec; --mu:#9a9aac; --rd:#e8121f; --rd2:#b00d16;
  --gd:#e8c974; --gd2:#b08c3e;
}
html,body{background:var(--bg)}
#app{background:
  radial-gradient(120% 34% at 50% -6%,#e8121f1c,transparent 62%),
  radial-gradient(70% 26% at 100% -2%,#e8c97410,transparent 60%),
  radial-gradient(60% 24% at -4% 2%,#e8121f10,transparent 58%)}

/* cabecera */
.hd{position:relative;padding:14px 16px 11px;gap:12px;border-bottom:1px solid #1d1d2a}
.hd::after{content:'';position:absolute;left:16px;bottom:-1px;width:64px;height:2px;border-radius:2px;background:linear-gradient(90deg,var(--rd),var(--gd))}
.hd .esc{width:42px;height:42px;filter:drop-shadow(0 6px 16px #000b)}
.ti{font:800 27px/1 var(--hf);letter-spacing:.02em;background:linear-gradient(92deg,#fff 0%,#ffedd0 58%,var(--gd) 115%);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
.sub{font:600 10.5px var(--hf);letter-spacing:.24em;color:var(--mu);margin-top:4px}
.pill{border-radius:999px;background:#181826;border:1px solid #2c2c40;padding:8px 13px;font:700 12px var(--hf);letter-spacing:.1em;color:#dcdce2}
.pill.i{padding:9px}
.pill.g{background:linear-gradient(135deg,#f4e0b4,#c8a25a);border-color:#c8a25a;color:#191307}

/* contenido */
#mn{padding:4px 14px 10px;gap:10px}

/* tarjetas de datos */
.tiles{gap:10px}
.tiles div{position:relative;background:linear-gradient(180deg,#1b1b28,#111119);border:1px solid #2a2a3e;border-radius:18px;padding:15px 4px 12px;overflow:hidden;transition:border-color .15s ease}
.tiles div::before{content:'';position:absolute;top:9px;left:50%;transform:translateX(-50%);width:26px;height:3px;border-radius:3px;background:linear-gradient(90deg,#f4323e,#ff9a5a)}
.tiles div:last-child::before{background:linear-gradient(90deg,#f0d58c,var(--gd2))}
.tiles b{font:800 29px/1 var(--hf);color:#fff}
.tiles div:last-child b{color:var(--gd)}
.tiles small{color:#8f8fa2;letter-spacing:1.5px;font:700 10px var(--hf);text-transform:uppercase}

/* botones */
.btn,.tb button{background:#181826;border:1px solid #2c2c40;border-radius:15px;font:700 14px var(--hf);letter-spacing:.08em;text-transform:uppercase;transition:transform .12s ease,filter .15s ease,box-shadow .15s ease}
.btn{padding:11px 15px}
.btn.r{background:linear-gradient(180deg,#f4323e,#c00d17);border-color:var(--rd);box-shadow:0 8px 22px #e8121f3d}
.btn.g{background:linear-gradient(180deg,#f6dfae,#c8a25a);color:#221806;border-color:#c8a25a;box-shadow:0 8px 22px #c8a25a30}
.btn.o{background:none;color:#ff7079;border-color:#ff5a6255}
.tb button{flex-direction:column;font-size:12px;padding:9px 0;gap:4px}
.tb svg{color:var(--gd)}

/* cancha */
.fd{background:linear-gradient(#0a1020,#0d1b1a 60%,#0f2519);box-shadow:inset 0 0 0 1px #ffffff14,0 16px 34px #0007;border-radius:20px}
.pitch i{border-color:#ffffff85}
.tm{background:#08080ecc;box-shadow:0 4px 14px #0007}

/* hojas y formularios */
.ov{position:fixed;inset:0;z-index:30;background:#08080fdd;backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);overflow:auto;padding:env(safe-area-inset-top,0) 12px 0}
.sh{max-width:600px;margin:min(6vh,44px) auto 30px;background:linear-gradient(180deg,#181826,#101019);border:1px solid #ffffff16;border-radius:24px;padding:18px 16px calc(22px + env(safe-area-inset-bottom,0));box-shadow:0 30px 80px #000d;position:relative}
.sh h3{margin:0 46px 10px 0;font:800 26px/1.05 var(--hf);letter-spacing:.02em}
.x{background:#1e1e2e;border-color:#32324a}
.pk{position:fixed;inset:0;z-index:30;background:radial-gradient(60% 42% at 50% 40%,#e8121f1e,transparent 70%),#08080ff0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px)}
label{display:block;font:700 11px var(--hf);color:#a4a4b8;margin:14px 0 6px;text-transform:uppercase;letter-spacing:.18em}
input[type=text],input[type=number],input[type=password],select{width:100%;padding:11px 12px;border:1px solid #2c2c40;border-radius:12px;background:#13131f;font:600 16px var(--hf);letter-spacing:.02em;color:var(--tx)}
input:focus,select:focus{border-color:#b08c3e99}
select{appearance:none;-webkit-appearance:none;background-image:linear-gradient(45deg,transparent 50%,#9a9aac 50%),linear-gradient(135deg,#9a9aac 50%,transparent 50%);background-position:calc(100% - 20px) 50%,calc(100% - 14px) 50%;background-size:6px 6px,6px 6px;background-repeat:no-repeat;padding-right:40px}
input[type=range]{width:100%;accent-color:var(--gd);height:30px}
.seg button{border-radius:12px;background:#13131f;border:1px solid #2c2c40;font:700 15px var(--hf);padding:10px 4px;transition:filter .15s ease}
.seg .on{background:var(--tx);color:#0a0a10}
.chip{background:#181826;border:1px solid #2c2c40;border-radius:99px;padding:5px 12px;font:700 12px var(--hf);text-transform:uppercase;color:var(--mu)}
.chip.on{border-color:var(--gd2);color:var(--gd)}
.tabs button{border-radius:999px;background:#13131f;border-color:#2c2c40;font:700 13px var(--hf)}
.tabs .on{background:var(--tx);color:#0a0a10}
.rw{border-bottom:1px solid #ffffff0a;border-radius:12px;padding:0 6px;transition:background .15s ease}
.rw b{font:700 18px var(--hf)}
.rw .vv{font:800 24px var(--hf);color:var(--gd)}
.av{border-color:#b08c3e66;background:linear-gradient(135deg,#1e1e2c,#12121a)}
.tip{color:#8e8ea0;font-size:13px}
.addc{border-radius:16px;background:#12121c;border-color:#2f2f44;color:var(--mu);transition:border-color .15s ease,color .15s ease}
.emp{color:var(--mu)}

/* ================= C A R T A ================= */
.cr{border-radius:2.5cqw;filter:drop-shadow(0 14px 26px #000c);font-family:var(--hf)}
.cr .ra{text-align:center;font:800 20cqw/1 var(--hf);color:#f7e7bd;text-shadow:0 2px 12px #0009}
.cr .po{text-align:center;font:700 7.4cqw/1 var(--hf);letter-spacing:.16cqw;color:#efe6cf;font-style:normal;opacity:.95}
.cr .ph img{object-position:50% 18%}
.cr .cn{text-align:center;font:800 8.6cqw/1.06 var(--hf);text-transform:uppercase;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;color:#fff}
.cr .cs{display:grid;grid-template-columns:1fr 1fr;column-gap:10%;row-gap:1.4cqw}
.cr .cs span{display:flex;align-items:baseline;gap:2cqw;font:600 calc(6.2cqw*var(--csf,1))/1 var(--hf);color:#e8dcb8}
.cr .cs b{font:800 calc(8.8cqw*var(--csf,1))/1 var(--hf);color:#fff;min-width:7.5cqw;text-align:right}
.cr img{display:block;height:auto;pointer-events:none}

/* escudo único + bandera */
.cr .ce{object-fit:contain;z-index:2;filter:drop-shadow(0 2px 6px #000b);pointer-events:none}
.cr .ctf{object-fit:contain;z-index:3;border-radius:.7cqw;box-shadow:0 2px 7px #000b,0 0 0 .4cqw #00000060}
.cr.mini{filter:drop-shadow(0 6px 12px #000b)}
.cr.mini .cs{display:none}
.cr.mini .ctf{box-shadow:0 1px 4px #000b,0 0 0 .5cqw #00000060}

/* flecha de aptitud */
.cr .apt{aspect-ratio:1;z-index:3;
  clip-path:polygon(50% 0,100% 41%,72% 41%,72% 100%,28% 100%,28% 41%,0 41%);
  background:linear-gradient(168deg,#ffd9ab 0%,#ff7d47 32%,#f02a37 66%,#b20d19 100%);
  filter:drop-shadow(0 3px 7px #000c)}
.cr .apt.def{transform:rotate(180deg);background:linear-gradient(168deg,#d3f4ff 0%,#66bbff 32%,#2f86f6 66%,#1b3ad0 100%)}
.cr .apt i{position:absolute;inset:0;background:linear-gradient(180deg,#ffffff5c,#fff0 56%)}

/* capitán */
.cr .cap{aspect-ratio:1;z-index:4;border-radius:50%;display:flex;align-items:center;justify-content:center;
  background:radial-gradient(circle at 34% 26%,#fffae8,#f0d79b 34%,#c9a25a 62%,#8d6a25 100%);
  box-shadow:0 0 0 .55cqw #07070aB8,inset 0 0 0 1.25cqw #f8e8bd,inset 0 -.6cqw 1.2cqw #8a6a2466,0 6px 14px #000b,0 0 18px #d9b96e55}
.cr .cap span{font:700 8cqw/1 var(--hf);color:#241a06;letter-spacing:-.06em;text-shadow:0 1px 0 #fff9}

/* cambio de media */
.cr .dl{width:auto;display:inline-flex;align-items:center;justify-content:center;padding:.85cqw 2.3cqw;border-radius:99px;
  font:700 8.2cqw/1 var(--hf);letter-spacing:-.02em;z-index:3;
  background:linear-gradient(160deg,#123b24,#0a2417);color:#63e39a;border:1px solid #3fd47f4d;box-shadow:0 3px 9px #000b}
.cr .dl.dn{background:linear-gradient(160deg,#3d1220,#260a11);color:#ff7b84;border-color:#ff5a624d}

/* ================= EDITOR DE PLANTILLAS ================= */
.edbox{position:relative;width:min(320px,84vw);margin:4px auto 10px;user-select:none;-webkit-user-select:none}
.edbox .cr{cursor:default}
.edbox .ra,.edbox .po,.edbox .ph,.edbox .cn,.edbox .cs,.edbox .ce,.edbox .ctf,.edbox .apt,.edbox .cap,.edbox .dl{pointer-events:auto;cursor:grab;touch-action:none}
.edbox .selT{outline:2px dashed #e8c974cc;outline-offset:2px;border-radius:4px}
.echips{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;margin:10px 0 2px}
.szr{display:flex;align-items:center;gap:10px;margin-top:8px}
.szr span{font:700 10px var(--hf);letter-spacing:.14em;color:#a4a4b8;width:70px;text-transform:uppercase;flex:none}

/* extras del modal de jugador */
.pmod{margin-top:4px}
.aptseg button{display:flex;align-items:center;justify-content:center;gap:7px}
.aptseg button.on:first-child{background:linear-gradient(160deg,#ff9a5a,#c40d1a);border-color:var(--rd);color:#fff}
.aptseg button.on:last-child{background:linear-gradient(160deg,#63b9ff,#1b3fd8);border-color:#2f86f6;color:#fff}
.aptseg button.on .aptdot{background:#fff}
.aptdot{width:10px;height:10px;border-radius:3px;display:inline-block}
.aptdot.of{background:linear-gradient(160deg,#ff9a5a,#d2121f)}
.aptdot.def{background:linear-gradient(160deg,#7fd4ff,#1b3fd8)}
.aprow{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:9px 2px;border-bottom:1px solid #ffffff08}
.aprow b{font:600 16px var(--hf)}
.aprow small{display:block;font:500 10px var(--hf);letter-spacing:.12em;color:#8e8ea0;text-transform:uppercase}
.aptpick{display:flex;gap:6px}
.aptpick button{width:50px;padding:8px 0;border-radius:12px;border:1px solid #2c2c40;background:#13131f;font:700 11px var(--hf);letter-spacing:.06em;color:var(--mu)}
.aptpick button.on.of{background:linear-gradient(160deg,#ff8a4a,#c40d1a);color:#fff;border-color:var(--rd)}
.aptpick button.on.def{background:linear-gradient(160deg,#63b9ff,#1b3fd8);color:#fff;border-color:#2f86f6}

/* ================= PARTIDOS ================= */
.frm{display:flex;gap:6px;align-items:center;justify-content:center;flex:none;min-height:26px}
.frm small{color:var(--mu);font-size:12px}
.fm{width:26px;height:26px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font:800 13px var(--hf);color:#fff}
.fm.V{background:linear-gradient(160deg,#31c476,#12703b)}
.fm.E{background:#3a3a44}
.fm.D{background:linear-gradient(160deg,#f4323e,#a30d17)}
.mr{display:grid;grid-template-columns:38px 1fr auto;gap:12px;align-items:center;padding:13px 6px;border-bottom:1px solid #ffffff0a;cursor:pointer;flex:none;transition:background .15s ease}
.mr b{font:700 15.5px var(--hf);letter-spacing:-.01em}
.mr small{display:block;color:var(--mu);font:500 11px var(--hf);letter-spacing:.08em;text-transform:uppercase;margin-top:3px}
.mrt{display:flex;align-items:center;gap:8px;text-align:right}
.mre{width:34px;height:34px;object-fit:contain}
.mre.big{width:76px;height:76px;margin:0 auto 10px;display:block}
.ph0{display:flex;align-items:center;justify-content:center;border-radius:50%;background:#181826;border:1px solid #2c2c40;font:800 15px var(--hf)}
.ph0.big{font-size:30px;width:76px;height:76px;margin:0 auto 10px}
.nx{display:grid;grid-template-columns:34px 1fr;gap:12px;align-items:center;background:linear-gradient(180deg,#1b1b28,#111119);border:1px solid #2a2a3e;border-radius:16px;padding:11px 13px;flex:none;cursor:pointer}
.nx b{font:700 14.5px var(--hf);letter-spacing:-.01em}
.nx small{display:block;color:var(--mu);font:500 11px var(--hf);letter-spacing:.08em;text-transform:uppercase;margin-top:3px}
.ap{display:flex;align-items:center;justify-content:space-between;padding:7px 2px;border-bottom:1px solid #ffffff08}
.ap b{font:500 15px var(--hf)}
.as{width:44px;height:36px;border-radius:12px;border:1px solid #2c2c40;background:#13131f;font:800 15px var(--hf);color:var(--mu)}
.as.y{background:linear-gradient(160deg,#31c476,#12703b);border-color:#31c476;color:#fff}
.as.m{background:linear-gradient(160deg,#e8c974,#b08c3e);border-color:#e8c974;color:#1a1405}
.as.n{background:linear-gradient(160deg,#f4323e,#a30d17);border-color:var(--rd);color:#fff}
input[type=datetime-local]{width:100%;padding:11px 12px;border:1px solid #2c2c40;border-radius:12px;background:#13131f;font:500 15px Barlow,sans-serif;color:var(--tx);color-scheme:dark}
/* vista previa de fondo */
.prevbox{width:min(300px,72vw);margin:10px auto 14px}
.bgbig{width:min(280px,70vw);aspect-ratio:600/894;margin:8px auto 4px;border-radius:14px;border:1px solid #2f2f44;background-size:100% 100%;box-shadow:0 16px 30px #000b}
.row2{display:grid;grid-template-columns:1fr 1fr;gap:8px;align-items:stretch}
.bgprev{display:flex;align-items:center;gap:10px;background:#13131f;border:1px solid #2c2c40;border-radius:16px;padding:9px 11px;cursor:pointer;min-width:0}
.bgthumb{width:40px;height:60px;flex:none;border-radius:8px;border:1px solid #33334a;background-size:100% 100%;background-position:center;background-repeat:no-repeat}
.bgprev b{display:block;font:700 13px var(--hf)}
.bgprev small{display:block;color:#8e8ea0;font-size:11px;margin-top:3px}

/* ================= MENÚ ARRIBA (abajo a la derecha queda libre) ================= */
#app{padding-bottom:max(48px,env(safe-area-inset-bottom,0))}
.hd{order:0}.tab{order:1}#mn{order:2}
.tab{margin:8px 14px 4px;padding:5px;gap:2px;background:#12121be6;border:1px solid #ffffff14;border-radius:18px}
.tab button{flex:1;min-width:0;background:none;border:0;color:#8b8b9d;display:flex;flex-direction:column;align-items:center;gap:3px;font:700 10.5px var(--hf);letter-spacing:.08em;text-transform:uppercase;padding:7px 0;border-radius:14px;transition:background .15s ease,color .15s ease}
.tab button span{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%}
.tab button.on{color:#fff;background:linear-gradient(180deg,#f4323e,#c00d17)}
/* PC: misma columna simple, solo un poco más ancha */
@media (min-width:700px){.tab{margin-left:24px;margin-right:24px}#mn{padding:8px 24px 12px}.hd{padding:16px 24px 12px}.hd::after{left:24px}}
@media (hover:hover){
  .btn:hover,.tb button:hover{transform:translateY(-1px);filter:brightness(1.1)}
  .rw:hover,.mr:hover{background:#ffffff0a}
  .tab button:hover{color:#d6d6e2}
  .tab button.on:hover{color:#fff}
  .tiles div:hover,.nx:hover{border-color:#3d3d5c}
  .addc:hover{border-color:#4a4a6a;color:#c9c9d8}
  .bgprev:hover{border-color:#4a4a6a}
}
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
  ['GB','Inglaterra'],['gb-sct','Escocia'],['gb-wls','Gales'],['ie','Irlanda'],
  ['HR','Croacia'],['RS','Serbia'],['PL','Polonia'],['SE','Suecia'],['NO','Noruega'],
  ['DK','Dinamarca'],['TR','Turquía'],['GR','Grecia'],['CZ','Rep. Checa'],['UA','Ucrania'],
  ['MA','Marruecos'],['SN','Senegal'],['NG','Nigeria'],['GH','Ghana'],['EG','Egipto'],
  ['JP','Japón'],['KR','Corea del Sur'],['AU','Australia'],['NZ','Nueva Zelanda']
];

/* =====================================================================
   PLANTILLAS DE CARTA (dos, independientes)
     S.tpl.full = carta individual (la grande)
     S.tpl.mini = carta de alineación / plantel (la chica)
   Posición/tamaño de cada elemento en % del ancho (x) y alto (y).
   ===================================================================== */
const TD = {
  ra:{x:13,y:11.2}, po:{x:13,y:30.2},
  ph:{x:35,y:7.2,w:53,h:46},
  cn:{x:10,y:48.6,w:80}, cs:{x:19,y:57.2,w:62},
  esc:{x:20,y:36,w:13}, ctf:{x:11,y:71.4,w:10.5},
  apt:{x:24,y:71.4,w:8}, cap:{x:81,y:5.5,w:13.5}, dl:{x:68,y:70.6}
};
function tpl(kind){
  kind = kind === 'mini' ? 'mini' : 'full';
  let t = S.tpl;
  if (!t || typeof t !== 'object') t = S.tpl = {};
  if (t.ra) t = S.tpl = { full: t, mini: JSON.parse(JSON.stringify(t)) };   /* migra la plantilla única anterior */
  ['full', 'mini'].forEach(k => {
    const o = t[k] || (t[k] = {});
    for (const e in TD) if (!o[e]) o[e] = { ...TD[e] };
  });
  return t[kind];
}

/* tamaño de texto base: [carta grande, carta chica] */
const FZ = { ra:[20,21], po:[7.4,9.5], cn:[8.6,15], dl:[8.2,9.5] };

function styleTpl(el, k, t, mini){
  const fs = FZ[k] ? FZ[k][mini ? 1 : 0] : null;
  el.style.left = t.x + '%'; el.style.top = t.y + '%';
  el.style.right = 'auto'; el.style.bottom = 'auto';
  if (t.w != null && ['ph','cn','cs','esc','ctf','apt','cap'].includes(k)) {
    let w = t.w;
    if (mini && k === 'apt') w = t.w * 1.7;        /* legibilidad en cancha */
    if (mini && k === 'cap') w = t.w * 1.4;
    el.style.width = w + '%';
  }
  if (k === 'ph') el.style.height = t.h + '%';
  if (fs != null) {
    const v = (fs * (t.f || 1)).toFixed(2);
    el.style.fontSize = (mini && k === 'cn') ? 'max(' + v + 'cqw,9px)'
      : (mini && k === 'po') ? 'max(' + v + 'cqw,7px)' : v + 'cqw';
  }
  if (k === 'cs') el.style.setProperty('--csf', t.f || 1);
}

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

/* ---------- carta (usa la plantilla de su tipo) ---------- */
card = function (p, mini) {
  const c = E('div', 'cr' + (mini ? ' mini' : ''));
  c.dataset.pid = p.id;
  const T = tpl(mini ? 'mini' : 'full');

  const ra = E('div', 'ra', String(p.ovr ?? ''));
  const po = E('i', 'po', p.pos || '');
  const ph = E('div', 'ph');
  if (img(p)) {
    const i = E('img'); i.src = img(p); i.alt = '';
    if (p.cr && isFinite(p.cr.w)) i.style.cssText = cs(p.cr);
    ph.append(i);
  } else ph.innerHTML = SIL;

  const ce = E('img', 'ce'); ce.src = ESC(); ce.alt = ''; ce.draggable = false;

  c.append(ra, po, ph, ce);
  styleTpl(ra, 'ra', T.ra, mini); styleTpl(po, 'po', T.po, mini);
  styleTpl(ph, 'ph', T.ph, mini); styleTpl(ce, 'esc', T.esc, mini);

  const cn = E('div', 'cn', p.name || '—');
  styleTpl(cn, 'cn', T.cn, mini); c.append(cn);

  if (!mini) {
    const s = E('div', 'cs');
    [['GOL', p.g], ['SAL', p.s], ['AST', p.a], ['DOR', num(p) || '-']].forEach(([l, v]) => {
      const d = E('span'); d.append(E('b', 0, v), document.createTextNode(l)); s.append(d);
    });
    styleTpl(s, 'cs', T.cs, mini); c.append(s);
  }

  if (p.ct) {
    const cf = E('img', 'ctf'); cf.src = FL(p.ct); cf.alt = ''; cf.draggable = false;
    cf.onerror = () => { cf.style.display = 'none' };
    styleTpl(cf, 'ctf', T.ctf, mini); c.append(cf);
  }

  if (p.apt) {
    const a = E('div', 'apt ' + (p.apt === 'def' ? 'def' : 'of'));
    a.append(E('i')); styleTpl(a, 'apt', T.apt, mini); c.append(a);
  }

  if (S.cap === p.id || p._cap) {
    const cp = E('div', 'cap'); cp.append(E('span', 0, 'C')); styleTpl(cp, 'cap', T.cap, mini); c.append(cp);
  }

  if (p.d) {
    const dl = E('div', 'dl' + (p.d < 0 ? ' dn' : ''));
    dl.textContent = (p.d > 0 ? '▲' : '▼') + Math.abs(p.d);
    styleTpl(dl, 'dl', T.dl, mini); c.append(dl);
  }

  return c;
};

/* =====================================================================
   EDITOR DE PLANTILLAS
   ===================================================================== */
const TPE = [
  ['ra','GRL'],['po','Posición'],['ph','Foto'],['cn','Nombre'],['cs','Estadísticas'],
  ['esc','Escudo'],['ctf','Bandera'],['apt','Flecha apt.'],['cap','Capitán'],['dl','Cambio media']
];
const elSel = k => k === 'ph' ? '.ph' : k === 'esc' ? '.ce' : '.' + k;

function tplEditor(kind){
  kind = kind === 'mini' ? 'mini' : 'full';
  const mini = kind === 'mini';
  sheet('Editor de carta', sh => {
    let SEL = 'esc';
    sh.append(seg(['Alineación', 'Carta'], mini ? 'Alineación' : 'Carta', v => tplEditor(v === 'Alineación' ? 'mini' : 'full')));
    const dummy = { id:-1, name:'Jugador', pos:'DEL', num:10, ovr:90, g:12, a:8, s:2, st:1, ct:'ar', apt:'of', d:3, _cap:1 };
    const box = E('div', 'edbox');
    sh.append(box);
    sh.append(E('p', 'tip', mini
      ? 'Plantilla de ALINEACIÓN: la carta chica de la cancha y el plantel. Se aplica a todas esas cartas.'
      : 'Plantilla de CARTA: la carta grande que se abre al elegir un jugador. Se aplica a todas esas cartas.'));
    sh.append(E('p', 'tip', 'Tocá un elemento (o un botón de abajo) y arrastralo; el control cambia su tamaño.'));

    const chips = E('div', 'echips');
    TPE.filter(([k]) => !(mini && k === 'cs')).forEach(([k, l]) => { const ch = E('button', 'chip', l); ch.dataset.k = k; ch.onclick = () => { SEL = k; paint(); }; chips.append(ch) });
    sh.append(chips);

    const sl = E('div'); sh.append(sl);
    let crEl = null;

    function paint(){
      [...chips.children].forEach(b => b.classList.toggle('on', b.dataset.k === SEL));
      if (crEl) crEl.querySelectorAll('.selT').forEach(n => n.classList.remove('selT'));
      const el = crEl && crEl.querySelector(elSel(SEL));
      if (el) el.classList.add('selT');
      const t = tpl(kind)[SEL];
      sl.textContent = '';
      const mk = (lab, min, max, step, val, fn) => {
        const w = E('div', 'szr'), s = E('span', 0, lab), r = E('input');
        r.type = 'range'; r.min = min; r.max = max; r.step = step; r.value = val;
        r.oninput = () => fn(+r.value); r.onchange = () => persist();
        w.append(s, r); sl.append(w);
      };
      const ap = () => styleTpl(el, SEL, t, mini);
      if (SEL === 'ph') { mk('Ancho',20,70,.5,t.w,v=>{t.w=v;ap()}); mk('Alto',20,70,.5,t.h,v=>{t.h=v;ap()}) }
      else if (SEL === 'cn' || SEL === 'cs') { mk('Ancho',30,96,1,t.w,v=>{t.w=v;ap()}); mk('Texto',50,220,5,(t.f||1)*100,v=>{t.f=v/100;ap()}) }
      else if (SEL === 'ra' || SEL === 'po' || SEL === 'dl') { mk('Texto',50,220,5,(t.f||1)*100,v=>{t.f=v/100;ap()}) }
      else { const R = { esc:[6,32], ctf:[4,24], apt:[4,20], cap:[6,30] }[SEL]; mk('Tamaño',R[0],R[1],.5,t.w,v=>{t.w=v;ap()}) }
    }

    function bindDrag(k, el, cr){
      el.addEventListener('pointerdown', ev => {
        if (ev.button !== undefined && ev.button !== 0) return;
        ev.preventDefault(); ev.stopPropagation();
        SEL = k; paint();
        const r = cr.getBoundingClientRect(), er = el.getBoundingClientRect();
        const ox = (ev.clientX - r.left - (er.left - r.left)) / r.width * 100, oy = (ev.clientY - er.top) / r.height * 100;
        try { el.setPointerCapture(ev.pointerId) } catch (e) {}
        const mv = m => {
          let x = (m.clientX - r.left) / r.width * 100 - ox, y = (m.clientY - r.top) / r.height * 100 - oy;
          x = Math.max(-5, Math.min(100, x)); y = Math.max(-2, Math.min(100, y));
          const t = tpl(kind)[k];
          t.x = +x.toFixed(1); t.y = +y.toFixed(1);
          styleTpl(el, k, t, mini);
        };
        const up = () => { el.removeEventListener('pointermove', mv); el.removeEventListener('pointerup', up); el.removeEventListener('pointercancel', up); persist() };
        el.addEventListener('pointermove', mv); el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up);
      });
    }

    function build(){
      box.textContent = '';
      crEl = card(dummy, mini);
      box.append(crEl);
      TPE.forEach(([k]) => { const el = crEl.querySelector(elSel(k)); if (el) bindDrag(k, el, crEl) });
      if (!crEl.querySelector(elSel(SEL))) SEL = 'esc';
      paint();
    }
    build();

    const bx = E('div', 'btns');
    const r1 = E('button', 'btn', 'Restablecer elemento');
    r1.onclick = () => { delete S.tpl[kind][SEL]; persist(); build() };
    const r2 = E('button', 'btn o', 'Restablecer plantilla');
    r2.onclick = () => { if (confirm('¿Volver esta plantilla a su diseño original?')) { delete S.tpl[kind]; persist(); build() } };
    bx.append(r1, r2); sh.append(bx);

    const ok = E('button', 'btn g'); ok.textContent = 'Listo';
    ok.style.cssText = 'width:100%;margin-top:12px'; ok.onclick = closeS;
    sh.append(ok);
  });
}

/* ---------- modal de jugador: aptitud, país, plantilla, capitán ---------- */
const _modal = modal;
modal = function (p, isNew) {
  _modal(p, isNew);
  const sh = document.querySelector('#m .sh');
  if (!sh || !sh.querySelector('.mc')) return;
  const all = sh.querySelectorAll('.btns'), btns = all[all.length - 1];

  const wrap = E('div', 'pmod');

  wrap.append(E('label', 0, 'Aptitud'));
  const sg = E('div', 'seg aptseg');
  [['of','Ofensivo'],['def','Defensivo']].forEach(([k, l]) => {
    const b = E('button', p.apt === k ? 'on' : '');
    b.append(E('i', 'aptdot ' + k), document.createTextNode(l));
    b.onclick = () => { p.apt = p.apt === k ? null : k; persist(); modal(p, isNew) };
    sg.append(b);
  });
  wrap.append(sg);

  wrap.append(E('label', 0, 'País (bandera)'));
  const sel = E('select');
  sel.append(Object.assign(document.createElement('option'), { value: '', textContent: 'Sin país' }));
  CT.forEach(([c, n]) => sel.append(Object.assign(document.createElement('option'), { value: c, textContent: n })));
  sel.value = p.ct || '';
  sel.onchange = () => { if (sel.value) p.ct = sel.value; else delete p.ct; persist(); modal(p, isNew) };
  wrap.append(sel);

  const eb = E('button', 'btn');
  eb.style.cssText = 'width:100%;margin-top:14px';
  eb.innerHTML = ic('edit', 18) + ' Editar plantilla de carta';
  eb.onclick = () => tplEditor('full');
  wrap.append(eb);

  const cb = E('button', 'btn' + (S.cap === p.id ? ' g' : ''));
  cb.style.cssText = 'width:100%;margin-top:8px';
  cb.innerHTML = S.cap === p.id ? '★ Capitán del equipo' : '☆ Hacer capitán';
  cb.onclick = () => { S.cap = S.cap === p.id ? null : p.id; persist(); modal(p, isNew) };
  wrap.append(cb);

  if (btns) sh.insertBefore(wrap, btns); else sh.append(wrap);
};

/* ---------- ajustes: plantillas + vista previa de fondo ---------- */
function bgPreview(dataUri, isNew) {
  sheet('Fondo de carta', sh => {
    const big = E('div', 'bgbig');
    big.style.background = 'url("' + dataUri + '") center/100% 100% no-repeat';
    sh.append(big);
    const best = [...S.p].filter(p => p.st).sort((a, b) => b.ovr - a.ovr)[0] || S.p[0];
    if (best) {
      const lbl = E('div', 'lbl'); lbl.innerHTML = 'Así se ve en <em>una carta</em>';
      const fig = E('div', 'prevbox'); fig.append(card(best, false));
      sh.append(lbl, fig);
    }
    const bx = E('div', 'btns');
    const no = E('button', 'btn b', 'Cancelar'); no.onclick = () => settings();
    const ok = E('button', 'btn g b', isNew ? 'Usar este fondo' : 'Aplicar');
    ok.onclick = () => { S.carta = dataUri; persist(); settings() };
    bx.append(no, ok); sh.append(bx);
  });
}

const _settings = settings;
settings = function () {
  _settings();
  const sh = document.querySelector('#m .sh');
  if (!sh) return;

  const wrap = E('div');
  wrap.append(E('label', 0, 'Plantillas de carta'));
  const tr = E('div', 'row2');
  const t1 = E('button', 'btn'), t2 = E('button', 'btn');
  t1.innerHTML = ic('edit', 18) + ' Alineación'; t1.onclick = () => tplEditor('mini');
  t2.innerHTML = ic('edit', 18) + ' Carta'; t2.onclick = () => tplEditor('full');
  tr.append(t1, t2); wrap.append(tr);
  wrap.append(E('p', 'tip', 'Cada una se edita por separado y se aplica a todas sus cartas: GRL, foto, nombre, escudo, bandera…'));

  wrap.append(E('label', 0, 'Fondo de carta'));
  const row = E('div', 'row2');
  const cur = E('div', 'bgprev');
  const th = E('div', 'bgthumb');
  th.style.background = 'url("' + (S.carta || 'carta.png') + '") center/100% 100% no-repeat';
  const tt = E('div');
  tt.append(E('b', 0, S.carta ? 'Fondo personalizado' : 'Fondo original'), E('small', 0, '600 × 894'));
  cur.append(th, tt);
  cur.onclick = () => bgPreview(S.carta || '/carta.png', !S.carta);
  const pick = E('button', 'btn');
  pick.innerHTML = ic('cam', 18) + ' Probar fondo';
  pick.onclick = () => pickImg(600, d => bgPreview(d, true));
  row.append(cur, pick);
  wrap.append(row);

  const kids = [...sh.children];
  const anchor = kids.length >= 2 ? kids[kids.length - 2] : null;
  if (anchor) sh.insertBefore(wrap, anchor); else sh.append(wrap);
};

/* ---------- aptitud por jugador ---------- */
function aptSheet() {
  sheet('Aptitud por jugador', sh => {
    const list = E('div');
    S.p.filter(p => p.st).forEach(p => {
      const r = E('div', 'aprow'), n = E('div');
      n.append(E('b', 0, p.name), E('small', 0, p.pos));
      const pk = E('div', 'aptpick');
      [['of','Of'],['def','Def']].forEach(([k, l]) => {
        const b = E('button', p.apt === k ? 'on ' + k : '', l);
        b.onclick = () => { p.apt = p.apt === k ? null : k; persist(); aptSheet(); render() };
        pk.append(b);
      });
      r.append(n, pk); list.append(r);
    });
    sh.append(list);
    sh.append(E('p', 'tip', 'Naranja = ofensivo, azul = defensivo. La flecha se dibuja en la carta del jugador.'));
    const ok = E('button', 'btn g'); ok.textContent = 'Listo';
    ok.style.cssText = 'width:100%;margin-top:12px'; ok.onclick = closeS;
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

/* ---------- partidos ---------- */
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
    b.onclick = () => { view = 'match'; chg = 1; render() };
    w.splice(1, 0, b);
  }
  if (xPl().length) w.splice(1, 0, xForm());
  return w;
};

/* ---------- render con pestaña Partidos + migraciones ---------- */
render = function () {
  if (!S.tpl) {
    const src = (S.p || []).find(p => p.esc || p.ctp);
    if (src) {
      S.tpl = { full: {}, mini: {} };
      ['full', 'mini'].forEach(k => {
        if (src.esc) S.tpl[k].esc = { ...src.esc };
        if (src.ctp) S.tpl[k].ctf = { ...src.ctp };
      });
    }
  }
  (S.p || []).forEach(p => { delete p.esc; delete p.ctp });
  S.m = S.m || [];
  if (view !== lastV) chg = 1;
  lastV = view;
  const A = $('#app'); A.textContent = '';
  const sub = {
    home: S.sub,
    line: 'Formación ' + S.f + ' · ' + S.n + ' en cancha',
    squad: 'Plantel · ' + S.p.length + ' jugadores',
    top: 'Los mejores del plantel',
    match: 'Partidos · ' + xPl().length + ' jugados'
  }[view];
  const mn = E('main'); mn.id = 'mn'; mn.className = (dt ? 'dt' : '') + (chg ? ' an' : '');
  ({ home: vHome, line: vLine, squad: vSquad, top: vTop, match: vMatch }[view])().forEach(n => mn.append(n));
  const tb = E('nav', 'tab');
  [['home','Inicio','home'],['line','Alineación','field'],['squad','Plantel','squad'],['match','Partidos','cal'],['top','Top','trophy']]
    .forEach(([v, l, i]) => {
      const b = E('button', v === view ? 'on' : '');
      b.innerHTML = ic(i, 22) + '<span>' + l + '</span>';
      b.onclick = () => { if (v !== view) chg = 1; view = v; render() };
      tb.append(b);
    });
  A.append(hdr(sub), mn, tb);
  document.documentElement.style.setProperty('--carta', 'url("' + (S.carta || 'carta.png') + '")');
  chg = 0;
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
if ('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js').catch(() => {});
setInterval(xTick, 3e4);
document.addEventListener('visibilitychange', xTick);
xTick();
render();
