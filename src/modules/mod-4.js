// Spectral Cortex — module 4
export const VERSION = "1.0.4";
export class EventBus {
  constructor(){ this.h = new Map(); }
  on(t, fn){ (this.h.get(t) || this.h.set(t,[]).get(t)).push(fn); return () => this.off(t, fn); }
  off(t, fn){ const a = this.h.get(t); if(a) this.h.set(t, a.filter(f=>f!==fn)); }
  emit(t, ...args){ (this.h.get(t)||[]).forEach(fn => fn(...args)); }
}
const bus = new EventBus();
export async function bootstrap(root = document.getElementById("dashboard")){
  if(!root) return;
  root.innerHTML = "<div class='grid'></div>";
  const grid = root.querySelector(".grid");
  const items = await fetch("/config/app.json").then(r=>r.json()).catch(()=>[]);
  for (const it of items.modules ?? []) {
    const el = document.createElement("article");
    el.className = "card"; el.innerHTML = `<h3>${it.name}</h3><p>${it.desc}</p>`;
    grid.appendChild(el); bus.emit("mount", it);
  }
}
if (typeof window !== "undefined") bootstrap();