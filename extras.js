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
