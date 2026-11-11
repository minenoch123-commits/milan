/* extras.js · Milan Athletic Club · se carga DESPUÉS del script principal */
document.head.append(Object.assign(document.createElement('style'),{textContent:`
.cr{filter:drop-shadow(0 8px 10px #000b)}.cr .ph img{filter:drop-shadow(0 5px 6px #000c)}
.cap{right:10%;top:9.5%;width:11cqw;height:11cqw;border-radius:50%;background:var(--gd);color:#1a1405;font:800 7.5cqw/11cqw var(--hf);text-align:center;box-shadow:0 1px 4px #000a;z-index:3}
.cr.mini .cap{width:17cqw;height:17cqw;font-size:11cqw;line-height:17cqw}
.dl{left:15%;top:8%;width:24%;text-align:center;font:800 6.5cqw/1 var(--hf);color:#3ddc84}.dl.dn{color:#ff5a62}.cr.mini .dl{top:6%;font-size:8cqw}
.frm{display:flex;gap:6px;align-items:center;justify-content:center;flex:none;min-height:26px}.frm small{color:var(--mu)}
.fm{width:26px;height:26px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font:800 14px var(--hf);color:#fff}
.fm.V{background:#1f9d55}.fm.E{background:#8e8e9b}.fm.D{background:var(--rd)}
.mr{display:grid;grid-template-columns:38px 1fr auto;gap:12px;align-items:center;padding:10px 4px;border-bottom:1px solid var(--ln);cursor:pointer;flex:none}
.mr b{font:700 17px var(--hf)}.mr small{display:block;color:var(--mu);font:600 12px var(--hf);letter-spacing:1px;text-transform:uppercase}
.mrt{display:flex;align-items:center;gap:8px;text-align:right}
.mre{width:34px;height:34px;object-fit:contain}.mre.big{width:72px;height:72px;margin:0 auto 8px;display:block}
.ph0{display:flex;align-items:center;justify-content:center;border-radius:50%;background:var(--s2);border:1px solid var(--ln);font:800 15px var(--hf)}.ph0.big{font-size:30px}
.nx{display:grid;grid-template-columns:34px 1fr;gap:10px;align-items:center;background:var(--s1);border:1px solid var(--ln);border-radius:14px;padding:8px 12px;flex:none;cursor:pointer}
.nx b{font:700 16px var(--hf)}.nx small{display:block;color:var(--mu);font:600 12px var(--hf);letter-spacing:1px;text-transform:uppercase}
.ap{display:flex;align-items:center;justify-content:space-between;padding:6px 4px;border-bottom:1px solid var(--ln)}.ap b{font:700 17px var(--hf)}
.as{width:42px;height:34px;border-radius:10px;border:1px solid var(--ln);background:var(--s1);font:800 16px var(--hf)}
.as.y{background:#1f9d55;border-color:#1f9d55}.as.m{background:var(--gd2);color:#1a1405}.as.n{background:var(--rd);border-color:var(--rd)}
.arws{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:3}
input[type=datetime-local]{width:100%;padding:11px 12px;border:1px solid var(--ln);border-radius:12px;background:var(--s1);font:700 16px var(--hf);color-scheme:dark}
.tab button span{font-size:10px}
`}));
IC.cal='<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4"/>';
IC.bell='<path d="M6 17V11a6 6 0 0112 0v6l2 2H4zM10 21h4"/>';

/* ---- capitán + cambio de GRL + sombra ---- */
const _card=card;
card=function(p,mini){const c=_card(p,mini);
 if(S.cap===p.id)c.append(E('div','cap','C'));
 if(p.d)c.append(E('div','dl'+(p.d<0?' dn':''),(p.d>0?'▲':'▼')+Math.abs(p.d)));return c};
const _modal=modal;
modal=function(p,n){_modal(p,n);const bx=document.querySelector('.sh .btns');if(!bx||n)return;
 const b=E('button','btn'+(S.cap===p.id?' g':''),'C · Capitán');b.onclick=()=>{S.cap=S.cap===p.id?null:p.id;persist();modal(p,n)};bx.append(b)};
const _persist=persist;
persist=function(){S.p.forEach(p=>{if(p.l==null)p.l=p.ovr;
 if(p.ovr!==p.l){if(!p.pt||Date.now()-p.pt>6e4)p.pv=p.l;p.pt=Date.now();p.l=p.ovr;p.d=p.ovr-p.pv;if(!p.d)delete p.d}});_persist()};

/* ---- partidos ---- */
const xR=m=>m.gf>m.ga?'V':m.gf<m.ga?'D':'E';
const xPl=()=>(S.m||[]).filter(m=>m.pl).sort((a,b)=>new Date(b.d)-new Date(a.d));
const xDt=m=>new Date(m.d).toLocaleString('es-AR',{weekday:'short',day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'});
const xEsc=(m,c)=>{const s=img({img:m.re});if(s){const i=E('img',c);i.src=s;i.alt='';return i}return E('div',c+' ph0',(m.rival||'?').trim().slice(0,1).toUpperCase())};
function xForm(){const l=xPl().slice(0,5).reverse(),w=E('div','frm');l.forEach(m=>w.append(E('span','fm '+xR(m),xR(m))));if(!l.length)w.append(E('small',0,'Sin partidos jugados'));return w}
function xRow(m){const r=E('div','mr'),n=E('div'),k=Object.values(m.at||{}),rt=E('div','mrt');
 n.append(E('b',0,(m.t||'Partido')+' vs '+(m.rival||'Rival')),E('small',0,xDt(m)));
 if(m.pl)rt.append(E('span','fm '+xR(m),xR(m)),E('b',0,m.gf+' - '+m.ga));
 else rt.append(E('small',0,'✓'+k.filter(v=>v==='y').length+' ?'+k.filter(v=>v==='m').length+' ✕'+k.filter(v=>v==='n').length));
 r.append(xEsc(m,'mre'),n,rt);r.onclick=()=>xSheet(m);return r}
function xAdd(){const d=new Date(Date.now()+864e5);d.setHours(21,0,0,0);
 const m={id:Date.now(),rival:'',d:new Date(d-d.getTimezoneOffset()*6e4).toISOString().slice(0,16),t:'Partido',pl:0,gf:0,ga:0,at:{}};S.m.push(m);persist();xSheet(m)}
function xSheet(m){sheet((m.t||'Partido')+' vs '+(m.rival||'Rival'),sh=>{
 sh.append(xEsc(m,'mre big'));
 if(dt){sh.append(fld('Rival',m,'rival','text'),fld('Fecha y hora',m,'d','datetime-local'),E('label',0,'Tipo'),seg(['Partido','Amistoso','Entrenamiento'],m.t,v=>{m.t=v;persist()}));
  const bx=E('div','btns'),b=E('button','btn');b.innerHTML=ic('cam',18)+' Escudo rival';b.onclick=()=>pickImg(200,d=>{m.re=d;persist();xSheet(m)});bx.append(b);
  if(m.re){const q=E('button','btn o','Quitar');q.onclick=()=>{delete m.re;persist();xSheet(m)};bx.append(q)}
  sh.append(bx,E('label',0,'Estado'),seg(['Pendiente','Jugado'],m.pl?'Jugado':'Pendiente',v=>{m.pl=v==='Jugado'?1:0;persist();xSheet(m)}));
  if(m.pl){const g=E('div','f3');g.append(fld('Nosotros',m,'gf'),fld('Rival',m,'ga'));sh.append(g)}}
 else sh.append(E('p','tip',xDt(m)+(m.pl?' · '+m.gf+' - '+m.ga:'')));
 sh.append(E('label',0,'¿Asistís?'));m.at=m.at||{};const sm=E('p','tip'),us=()=>{const k=Object.values(m.at);sm.textContent='✓ '+k.filter(v=>v==='y').length+'   ? '+k.filter(v=>v==='m').length+'   ✕ '+k.filter(v=>v==='n').length};
 const O=['','y','m','n'],L={y:'✓',m:'?',n:'✕'};
 S.p.forEach(p=>{const r=E('div','ap'),b=E('button','as '+(m.at[p.id]||''),L[m.at[p.id]]||'·');
  b.onclick=()=>{const v=O[(O.indexOf(m.at[p.id]||'')+1)%4];if(v)m.at[p.id]=v;else delete m.at[p.id];b.className='as '+v;b.textContent=L[v]||'·';us();persist();if(!dt)api({act:'rsvp',mid:m.id,pid:p.id,v})};
  r.append(E('b',0,p.name),b);sh.append(r)});us();sh.append(sm);
 const bx=E('div','btns'),ok=E('button','btn g b','Listo');ok.onclick=closeS;
 if(dt){const d=E('button','btn o','Eliminar');d.onclick=()=>{if(confirm('¿Eliminar este partido?')){S.m=S.m.filter(q=>q!==m);persist();closeS()}};bx.append(d)}
 bx.append(ok);sh.append(bx)})}
function vMatch(){const pl=xPl(),c={V:0,E:0,D:0},t=E('div','tiles');pl.forEach(m=>c[xR(m)]++);
 [['PJ',pl.length],['V',c.V],['E',c.E],['D',c.D]].forEach(([l,v])=>{const d=E('div');d.append(E('b',0,v),E('small',0,l));t.append(d)});
 const w=[t,xForm()],tb=E('div','tb');
 if(dt){const b=E('button');b.innerHTML=ic('add')+'<span>Agendar</span>';b.onclick=xAdd;tb.append(b)}
 if('Notification' in window&&Notification.permission!=='granted'){const b=E('button');b.innerHTML=ic('bell')+'<span>Activar avisos</span>';b.onclick=()=>Notification.requestPermission().then(()=>render());tb.append(b)}
 if(tb.children.length)w.push(tb);
 const up=S.m.filter(m=>!m.pl).sort((a,b)=>new Date(a.d)-new Date(b.d));
 [...up,...pl].forEach(m=>w.push(xRow(m)));if(!S.m.length)w.push(E('p','emp','Todavía no hay partidos.'));return w}
const _vh=vHome;
vHome=function(){const w=_vh(),n=S.m.filter(m=>!m.pl&&new Date(m.d)>Date.now()).sort((a,b)=>new Date(a.d)-new Date(b.d))[0];
 if(n){const b=E('div','nx'),t=E('div');t.append(E('b',0,'Próximo: '+(n.t||'Partido')+' vs '+(n.rival||'Rival')),E('small',0,xDt(n)));b.append(xEsc(n,'mre'),t);b.onclick=()=>{view='match';render()};w.splice(1,0,b)}
 if(xPl().length)w.splice(1,0,xForm());return w};

/* ---- flechas de actitud ---- */
let xAr=0,xTp='Atacar';const xCol={Atacar:'#e3101e',Marcar:'#4aa3ff',Presionar:'#e2c06a',Apoyar:'#3ddc84'};
const _vl=vLine;
vLine=function(){const w=_vl(),fd=w[0],st=S.p.filter(p=>p.st),sv=document.createElementNS('http://www.w3.org/2000/svg','svg');sv.setAttribute('class','arws');
 let h='<defs>'+Object.entries(xCol).map(([k,c])=>`<marker id="mk${k}" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M0 0L10 5L0 10z" fill="${c}"/></marker>`).join('')+'</defs>';
 S.ar.forEach(a=>{const p=st.find(q=>q.id===a.id),c=xCol[a.t];if(p&&c)h+=`<line x1="${p.x}%" y1="${p.y}%" x2="${a.x}%" y2="${a.y}%" stroke="${c}" stroke-width="2.5" stroke-linecap="round" marker-end="url(#mk${a.t})"/>`});
 sv.innerHTML=h;fd.append(sv);
 if(dt){fd.addEventListener('pointerdown',e=>{if(!xAr)return;const pl=e.target.closest('.pl');if(!pl)return;e.stopPropagation();e.preventDefault();
   const p=st[[...fd.querySelectorAll('.pl')].indexOf(pl)],r=fd.getBoundingClientRect(),ln=document.createElementNS(sv.namespaceURI,'line');
   ['x1','x2'].forEach(k=>ln.setAttribute(k,p.x+'%'));['y1','y2'].forEach(k=>ln.setAttribute(k,p.y+'%'));ln.setAttribute('stroke',xCol[xTp]);ln.setAttribute('stroke-width','2.5');ln.setAttribute('stroke-dasharray','5 4');sv.append(ln);
   const pt=v=>[Math.max(2,Math.min(98,(v.clientX-r.left)/r.width*100)),Math.max(2,Math.min(98,(v.clientY-r.top)/r.height*100))],
   mv=v=>{const[x,y]=pt(v);ln.setAttribute('x2',x+'%');ln.setAttribute('y2',y+'%')},
   up=v=>{removeEventListener('pointermove',mv);removeEventListener('pointerup',up);const[x,y]=pt(v);if(Math.hypot(x-p.x,y-p.y)>5){S.ar.push({id:p.id,x:+x.toFixed(1),y:+y.toFixed(1),t:xTp});persist()}render()};
   addEventListener('pointermove',mv);addEventListener('pointerup',up)},true);
  const b=E('div','tabs'),tg=E('button',xAr?'on':'','↗ Flechas');tg.onclick=()=>{xAr=!xAr;render()};b.append(tg);
  if(xAr){Object.keys(xCol).forEach(k=>{const c=E('button',k===xTp?'on':'',k);c.style.borderColor=xCol[k];c.onclick=()=>{xTp=k;render()};b.append(c)});
   const u=E('button',0,'↩');u.onclick=()=>{S.ar.pop();persist();render()};b.append(u)}
  w.push(b)}
 return w};

/* ---- render con pestaña Partidos ---- */
render=function(){S.m=S.m||[];S.ar=S.ar||[];const A=$('#app');A.textContent='';
 const sub={home:S.sub,line:'Formación '+S.f+' · '+S.n+' en cancha',squad:'Plantel · '+S.p.length+' jugadores',top:'Los mejores del plantel',match:'Partidos · '+xPl().length+' jugados'}[view];
 const mn=E('main');mn.id='mn';mn.className=dt?'dt':'';({home:vHome,line:vLine,squad:vSquad,top:vTop,match:vMatch}[view])().forEach(n=>mn.append(n));
 const tb=E('nav','tab');[['home','Inicio','home'],['line','Alineación','field'],['squad','Plantel','squad'],['match','Partidos','cal'],['top','Top','trophy']].forEach(([v,l,i])=>{const b=E('button',v===view?'on':'');b.innerHTML=ic(i,22)+'<span>'+l+'</span>';b.onclick=()=>{view=v;render()};tb.append(b)});
 A.append(hdr(sub),mn,tb);document.documentElement.style.setProperty('--carta',`url("${S.carta||'/carta.png'}")`);fit()};

/* ---- avisos: el día (8:00), 30 min antes y al arrancar ---- */
function xNotify(t,o){const f=()=>{try{new Notification(t,o)}catch(e){}};
 if(navigator.serviceWorker)navigator.serviceWorker.getRegistration().then(r=>r?r.showNotification(t,o):f()).catch(f);else f()}
function xTick(){if(!('Notification' in window)||Notification.permission!=='granted')return;let f={};try{f=JSON.parse(localStorage.getItem('nf')||'{}')}catch(e){}const now=Date.now();
 (S.m||[]).forEach(m=>{const t=new Date(m.d).getTime();if(m.pl||!t)return;const d8=new Date(t);d8.setHours(8,0,0,0);
  const hh=new Date(t).toLocaleTimeString('es-AR',{hour:'2-digit',minute:'2-digit'}),w=(m.t||'Partido')+' vs '+(m.rival||'Rival');
  [['d',t>d8.getTime()?d8.getTime():Infinity,'Hoy: '+w+' a las '+hh,432e5],['h',t-18e5,'En 30 min: '+w,18e5],['s',t,'¡Arrancó! '+w,36e5]].forEach(([k,at,msg,win])=>{
   const key=m.id+k;if(f[key]||now<at||now>at+win)return;f[key]=1;xNotify(S.team||'Milan',{body:msg,icon:ESC(),tag:key})})});
 try{localStorage.setItem('nf',JSON.stringify(f))}catch(e){}}
if('serviceWorker' in navigator)navigator.serviceWorker.register('/sw.js').catch(()=>{});
setInterval(xTick,3e4);document.addEventListener('visibilitychange',xTick);xTick();render();
