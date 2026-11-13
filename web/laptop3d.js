/* Notebook 3D do hero (three.js)
   - Sozinho (sem depender da rolagem): a cada projeto ele fecha, gira e abre já mostrando o próximo site.
   - Sem WebGL ou com "reduzir movimento": fica a foto do notebook (fallback em HTML). */
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

const stage = document.querySelector('.stage');
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
const PROJECTS = ['kamylla', 'tania', 'odontovida', 'mikaelle', 'juliana', 'thiago'];

function webglOk() { try { const c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')); } catch (e) { return false; } }

if (stage && !reduce && webglOk()) start();

function start() {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(2, devicePixelRatio));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  const canvas = renderer.domElement; canvas.className = 'lap3d'; canvas.setAttribute('aria-hidden', 'true');

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(26, 1.4, 0.1, 100);
  camera.position.set(0, 2.9, 6.6); camera.lookAt(0, 0.8, 0);

  scene.add(new THREE.HemisphereLight(0xffffff, 0x2a2c30, 1.35));
  const key = new THREE.DirectionalLight(0xffffff, 2.4); key.position.set(3, 6, 5); scene.add(key);
  const rim = new THREE.DirectionalLight(0x3d9bff, 1.1); rim.position.set(-5, 2.5, -4); scene.add(rim);
  const fill = new THREE.DirectionalLight(0x9fd0ff, .6); fill.position.set(-3, 1, 5); scene.add(fill);

  /* ---------- texturas desenhadas em canvas ---------- */
  const tex = (c) => { const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = renderer.capabilities.getMaxAnisotropy(); return t; };
  const mk = (w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; };
  function rr(g, x, y, w, h, r) { g.beginPath(); g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r); g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath(); }

  // teclado + trackpad (topo da base). Parte de cima da imagem = perto da dobradiça.
  const kc = mk(1600, 1100), kg = kc.getContext('2d');
  const deck = kg.createLinearGradient(0, 0, 0, 1100); deck.addColorStop(0, '#5d6066'); deck.addColorStop(1, '#4b4e53');
  kg.fillStyle = deck; kg.fillRect(0, 0, 1600, 1100);
  kg.fillStyle = '#3a3c40'; rr(kg, 110, 70, 1380, 520, 18); kg.fill();
  const rows = [[14, 0], [14, 0], [13, 1], [12, 2], [0, 0]], kw = 86, gap = 10, x0 = 128, y0 = 92, rh = 92;
  for (let r = 0; r < 5; r++) {
    let x = x0; const y = y0 + r * (rh + 8);
    const keys = r === 4 ? [1, 1, 1, 1, 5.6, 1, 1, 1, 1] : Array.from({ length: rows[r][0] }, (_, i) => (i === 0 && r > 1) ? 1 + rows[r][1] * .55 : (i === rows[r][0] - 1 && r === 3) ? 1 + rows[r][1] * .55 : 1);
    const total = keys.reduce((a, b) => a + b, 0), unit = (1344 - gap * (keys.length - 1)) / total;
    keys.forEach((k) => { const w = k * unit; const kgr = kg.createLinearGradient(0, y, 0, y + rh); kgr.addColorStop(0, '#26282c'); kgr.addColorStop(1, '#17181b'); kg.fillStyle = kgr; rr(kg, x, y, w, rh, 12); kg.fill(); kg.fillStyle = 'rgba(255,255,255,.06)'; rr(kg, x + 3, y + 3, w - 6, 8, 4); kg.fill(); x += w + gap; });
  }
  kg.fillStyle = '#55585e'; rr(kg, 520, 660, 560, 360, 26); kg.fill();
  kg.strokeStyle = 'rgba(0,0,0,.25)'; kg.lineWidth = 3; rr(kg, 520, 660, 560, 360, 26); kg.stroke();
  const keyTex = tex(kc);

  // tampa por fora com a logo
  const lc = mk(1024, 680), lg = lc.getContext('2d');
  const lid = lg.createLinearGradient(0, 0, 1024, 680); lid.addColorStop(0, '#62656b'); lid.addColorStop(1, '#4a4d52');
  lg.fillStyle = lid; lg.fillRect(0, 0, 1024, 680);
  lg.save(); lg.translate(512, 340); lg.scale(.17, .17); lg.translate(-627, -665);
  lg.fillStyle = '#d7dce4'; lg.fill(new Path2D('M232 357 628 632 1022 357V548L632 820 378 632V942H232Z'));
  lg.fillStyle = '#1f7cff'; lg.fill(new Path2D('M596 972C700 820 860 680 1022 604V770Z'));
  lg.restore();
  const backTex = tex(lc);

  // tela (troca de projeto com transição)
  const sc = mk(1280, 800), sg = sc.getContext('2d'), screenTex = tex(sc);
  const imgs = PROJECTS.map((p) => { const i = new Image(); i.src = 'img/' + p + '-d.jpg'; return i; });
  let cur = 0, fadeFrom = -1, fadeT = 1;
  function drawImg(i, a) { const im = imgs[i]; if (!im.complete || !im.naturalWidth) return; sg.globalAlpha = a; const s = 1280 / im.naturalWidth; sg.drawImage(im, 0, 0, 1280, im.naturalHeight * s); sg.globalAlpha = 1; }
  function paintScreen() { sg.fillStyle = '#000'; sg.fillRect(0, 0, 1280, 800); if (fadeFrom >= 0 && fadeT < 1) { drawImg(fadeFrom, 1); drawImg(cur, fadeT); } else drawImg(cur, 1); screenTex.needsUpdate = true; }
  imgs[0].onload = paintScreen; imgs.forEach((im) => im.decode && im.decode().catch(() => {}));

  /* ---------- modelo ---------- */
  const W = 3.3, D = 2.25, H = .11, T = .07;
  const metal = new THREE.MeshStandardMaterial({ color: 0x6b6e74, metalness: .45, roughness: .42 });
  const laptop = new THREE.Group(); scene.add(laptop);
  const body = new THREE.Group(); laptop.add(body);

  const base = new THREE.Mesh(new RoundedBoxGeometry(W, H, D, 4, .06), metal); body.add(base);
  const kb = new THREE.Mesh(new THREE.PlaneGeometry(W * .985, D * .975), new THREE.MeshStandardMaterial({ map: keyTex, metalness: .35, roughness: .55 }));
  kb.rotation.x = -Math.PI / 2; kb.position.y = H / 2 + .002; body.add(kb);

  const hinge = new THREE.Group(); hinge.position.set(0, H / 2, -D / 2 + .02); body.add(hinge);
  const shell = new THREE.Mesh(new RoundedBoxGeometry(W, T, D, 4, .035), metal); shell.position.set(0, T / 2, D / 2); hinge.add(shell);
  const bezel = new THREE.Mesh(new THREE.PlaneGeometry(W - .04, D - .04), new THREE.MeshStandardMaterial({ color: 0x050608, roughness: .25, metalness: .1 }));
  bezel.rotation.x = Math.PI / 2; bezel.position.set(0, -.002, D / 2); hinge.add(bezel);
  const screen = new THREE.Mesh(new THREE.PlaneGeometry(W - .22, (W - .22) * .625), new THREE.MeshBasicMaterial({ map: screenTex, toneMapped: false }));
  screen.rotation.x = Math.PI / 2; screen.position.set(0, -.004, D / 2 + .06); hinge.add(screen);
  const back = new THREE.Mesh(new THREE.PlaneGeometry(W - .06, D - .06), new THREE.MeshStandardMaterial({ map: backTex, metalness: .5, roughness: .4 }));
  back.rotation.x = -Math.PI / 2; back.position.set(0, T + .002, D / 2); hinge.add(back);
  // centraliza o conjunto (a tampa aberta sobe); gira em torno do centro
  body.position.set(0, 0, .25);

  /* ---------- tamanho ---------- */
  function resize() { const w = Math.round(stage.clientWidth * 1.6), h = Math.round(stage.clientWidth * .92); renderer.setSize(w, h, false); canvas.style.width = w + 'px'; canvas.style.height = h + 'px'; camera.aspect = w / h; const z = (stage.clientWidth < 500 ? 7.6 : 6.6) * 1.0; camera.position.set(0, 2.9 * z / 6.6, z); camera.lookAt(0, .8, 0); camera.updateProjectionMatrix(); }
  stage.prepend(canvas); stage.classList.add('is3d'); resize(); addEventListener('resize', resize);

  /* ---------- movimento: rolagem + ciclo automático + ponteiro ---------- */
  const OPEN = THREE.MathUtils.degToRad(106);
  const spring = (x, k = 120, c = 22) => ({ x, v: 0, to: x, k, c, step(dt) { const a = -this.k * (this.x - this.to) - this.c * this.v; this.v += a * dt; this.x += this.v * dt; } });
  const sp = spring(0), px = spring(0, 60, 15.5), py = spring(0, 60, 15.5);
  let auto = 1, spin = 0, phase = 'hold', phaseT = 0;
  const HOLD = 1.8, CLOSE = .5, SPIN = .75, OPENT = .55;
  const ease = (t) => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  function scrollP() { return Math.min(1, Math.max(0, scrollY / (innerHeight * .85))); }
  sp.x = sp.to = 0; /* independente da rolagem */
  if (fine) {
    const hero = document.querySelector('.hero');
    hero.addEventListener('pointermove', (e) => { px.to = e.clientX / innerWidth - .5; py.to = e.clientY / innerHeight - .5; });
    hero.addEventListener('pointerleave', () => { px.to = 0; py.to = 0; });
  }

  let visible = true; new IntersectionObserver((es) => { visible = es[0].isIntersecting; }).observe(stage);
  let last = performance.now();
  function frame(t) {
    requestAnimationFrame(frame);
    const dt = Math.min(.05, (t - last) / 1000); last = t;
    if (!visible) return;
    [sp, px, py].forEach((s) => s.step(dt));
    const p = sp.x;

    // ciclo automático só quando está lá no topo
    phaseT += dt;
    if (phase === 'hold') { auto = 1; if (phaseT > HOLD) { phase = 'close'; phaseT = 0; } }
    else if (phase === 'close') { auto = 1 - ease(Math.min(1, phaseT / CLOSE)); if (phaseT >= CLOSE) { phase = 'spin'; phaseT = 0; } }
    else if (phase === 'spin') { spinNow = ease(Math.min(1, phaseT / SPIN)); if (phaseT >= SPIN) { spin += Math.PI * 2; spinNow = 0; fadeFrom = cur; cur = (cur + 1) % PROJECTS.length; fadeT = 1; fadeFrom = -1; paintScreen(); phase = 'open'; phaseT = 0; } }
    else if (phase === 'open') { auto = ease(Math.min(1, phaseT / OPENT)); if (phaseT >= OPENT) { phase = 'hold'; phaseT = 0; } }

    const s = 0;                                          // animação independente da rolagem
    hinge.rotation.x = -OPEN * auto * (1 - s);
    laptop.rotation.y = spin + (phase === 'spin' ? spinNow * Math.PI * 2 : 0) - .62 * s + px.x * .32;
    laptop.rotation.x = .38 * s + py.x * .1;
    laptop.rotation.z = .1 * s;
    laptop.position.y = .15 + .3 * s;
    laptop.scale.setScalar(1 - .3 * s);
    renderer.render(scene, camera);
  }
  let spinNow = 0;
  paintScreen(); requestAnimationFrame(frame);
}
