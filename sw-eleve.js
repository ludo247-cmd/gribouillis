// Gribouillis Élèves — fonctionne sans internet : la page et ses icônes sont gardées
// sur la tablette (la séance et les résultats sont gardés par la page elle-même).
const C='grib-eleve-v1';
const FILES=['eleve.html','eleve.webmanifest','icon-eleve.svg','icon-eleve-192.png','icon-eleve-512.png','apple-touch-icon-eleve.png','favicon-eleve-32.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(K=>Promise.all(K.filter(k=>k.indexOf('grib-eleve-')===0&&k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==location.origin)return;
  const f=u.pathname.split('/').pop();if(FILES.indexOf(f)<0)return;
  // réseau d'abord (pour avoir la dernière version), sinon la copie gardée
  e.respondWith(fetch(e.request).then(r=>{if(r&&r.ok){const cp=r.clone();caches.open(C).then(c=>c.put(f===''?'eleve.html':e.request,cp));}return r;}).catch(()=>caches.match(e.request,{ignoreSearch:true}).then(r=>r||caches.match('eleve.html'))));});
