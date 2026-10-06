import {getStore} from '@netlify/blobs';
const PIN=process.env.DT_PIN||'0951';
export default async req=>{
  const st=getStore('milan'),H={'content-type':'application/json','cache-control':'no-store'};
  const out=(o,c=200)=>new Response(JSON.stringify(o),{status:c,headers:H});
  if(req.method==='GET')return new Response((await st.get('data'))||'null',{headers:H});
  let b;try{b=await req.json()}catch(e){return out({ok:false},400)}
  if(b.pin!==PIN){await new Promise(r=>setTimeout(r,1000));return out({ok:false},401)}
  if(b.act==='save'){if(!b.data||!Array.isArray(b.data.p))return out({ok:false},400);await st.set('data',JSON.stringify(b.data))}
  return out({ok:true});
};
