// Gribouillis EPS — toujours la dernière version de l'app quand il y a du réseau,
// la copie gardée seulement hors connexion. Les données restent dans l'app.
const C='grib-app-v1';
self.addEventListener('install',e=>{self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(K=>Promise.all(K.filter(k=>k.indexOf('grib-app-')===0&&k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);if(u.origin!==location.origin)return;
  const base=self.registration.scope;const isPage=r.mode==='navigate'&&(u.href.split('?')[0]===base||u.href.split('?')[0]===base+'index.html');
  if(!isPage)return;
  e.respondWith(fetch(new Request(base+'index.html',{cache:'no-store'})).then(res=>{if(res&&res.ok){const cp=res.clone();caches.open(C).then(c=>c.put(base+'index.html',cp));}return res;})
    .catch(()=>caches.match(base+'index.html').then(x=>x||fetch(r))));});
