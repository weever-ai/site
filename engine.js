(function () {
  "use strict";
  const C = window.WEEVER_CONFIG;
  const SVGNS = "http://www.w3.org/2000/svg";
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const css = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
  const rint = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  const pick = a => a[(Math.random() * a.length) | 0];
  const between = pairOr => Array.isArray(pairOr) ? rint(pairOr[0], pairOr[1]) : pairOr;

  console.log("%cweever.", "color:#00ACC1;font:600 18px Fredoka,system-ui,sans-serif");

  const OCTO = "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12";

  const MARK_PATHS = [
    "m908.15344 740.22296c0 84.414795 -68.45032 152.8465 -152.888 152.8465c-40.5484 0 -79.4361 -16.103455 -108.108154 -44.7677c-28.672058 -28.664307 -44.779846 -67.54138 -44.779846 -108.0788c0 -84.414795 68.45026 -152.8465 152.888 -152.8465c84.43768 0 152.888 68.4317 152.888 152.8465z",
    "m1031.986 830.974c0 32.76172 -26.558594 59.320374 -59.320374 59.320374c-15.732727 0 -30.821106 -6.249817 -41.9458 -17.374573c-11.124756 -11.124695 -17.374573 -26.213074 -17.374573 -41.9458c0 -32.76178 26.558655 -59.320374 59.320374 -59.320374c32.76178 0 59.320374 26.558594 59.320374 59.320374z",
    "m749.16437 429.45224c38.42456 58.82901 45.95166 117.65201 16.812256 131.38492c-13.993225 6.5947266 -34.743347 1.6968384 -57.68567 -13.616211c-22.942322 -15.313049 -46.19751 -39.786865 -64.6496 -68.03754c-38.42456 -58.82901 -45.95166 -117.65201 -16.812317 -131.38489c29.139404 -13.73288 83.91077 22.824738 122.33533 81.65372z",
    "m243.84601 740.22296c0 84.414795 68.45029 152.8465 152.888 152.8465c40.5484 0 79.436066 -16.103455 108.10812 -44.7677c28.672089 -28.664307 44.779877 -67.54138 44.779877 -108.0788c0 -84.414795 -68.45029 -152.8465 -152.888 -152.8465c-84.43771 0 -152.888 68.4317 -152.888 152.8465z",
    "m120.01345 830.974c0 32.76172 26.558632 59.320374 59.32038 59.320374c15.732742 0 30.821106 -6.249817 41.94583 -17.374573c11.124725 -11.124695 17.374542 -26.213074 17.374542 -41.9458c0 -32.76178 -26.55864 -59.320374 -59.320374 -59.320374c-32.76175 0 -59.32038 26.558594 -59.32038 59.320374z",
    "m405.6098 429.45224c-38.42453 58.82901 -45.95166 117.65201 -16.812256 131.38492c13.993195 6.5947266 34.743378 1.6968384 57.6857 -13.616211c22.942322 -15.313049 46.19748 -39.786865 64.6496 -68.03754c38.42453 -58.82901 45.95163 -117.65201 16.812286 -131.38489c-29.139374 -13.73288 -83.91077 22.824738 -122.33533 81.65372z"
  ];
  const MARK_SVG = c => `<svg viewBox="0 0 1152 1152" style="width:100%;height:100%"><g transform="rotate(180 576 576)" fill="${c}">` + MARK_PATHS.map(d => `<path d="${d}"/>`).join("") + `</g></svg>`;

  const SHAPE = {
    petal: `<ellipse cx="50" cy="50" rx="15" ry="32" fill="currentColor"/>`,
    legs: `<ellipse cx="36" cy="52" rx="9" ry="26" fill="currentColor" transform="rotate(-18 36 52)"/><ellipse cx="64" cy="52" rx="9" ry="26" fill="currentColor" transform="rotate(18 64 52)"/>`,
    dots: `<circle cx="34" cy="50" r="13" fill="currentColor"/><circle cx="66" cy="50" r="13" fill="currentColor"/>`,
    node: `<circle cx="56" cy="54" r="20" fill="currentColor"/><circle cx="32" cy="34" r="8" fill="currentColor"/>`,
    seed: `<circle cx="50" cy="50" r="18" fill="currentColor"/>`,
    ring: `<circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" stroke-width="13"/>`
  };

  const LUCIDE = {
    waypoints: `<path d="m10.586 5.414-5.172 5.172"/><path d="m18.586 13.414-5.172 5.172"/><path d="M6 12h12"/><circle cx="12" cy="20" r="2"/><circle cx="12" cy="4" r="2"/><circle cx="20" cy="12" r="2"/><circle cx="4" cy="12" r="2"/>`,
    gitbranch: `<path d="M15 6a9 9 0 0 0-9 9V3"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/>`,
    link: `<path d="M9 17H7A5 5 0 0 1 7 7h2"/><path d="M15 7h2a5 5 0 1 1 0 10h-2"/><line x1="8" x2="16" y1="12" y2="12"/>`,
    sync: `<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/>`,
    layers: `<path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"/><path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"/><path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"/>`,
    database: `<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/>`,
    sun: `<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>`,
    moon: `<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>`,
    at: `<circle cx="12" cy="12" r="4"/><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"/>`,
    web: `<path d="M12 12 L22 12 M12 12 L19.07 4.93 M12 12 L12 2 M12 12 L4.93 4.93 M12 12 L2 12 M12 12 L4.93 19.07 M12 12 L12 22 M12 12 L19.07 19.07"/><path d="M15.5 12 L14.47 9.53 L12 8.5 L9.53 9.53 L8.5 12 L9.53 14.47 L12 15.5 L14.47 14.47 Z"/><path d="M19 12 L16.95 7.05 L12 5 L7.05 7.05 L5 12 L7.05 16.95 L12 19 L16.95 16.95 Z"/>`
  };
  const isLucide = k => LUCIDE.hasOwnProperty(k);

  let TW = 64;
  function restTransform(kind) {
    if (C.rest_upright.indexOf(kind) !== -1) return "";
    const mir = Math.random() < C.mirrorProb ? -1 : 1;
    const q = Math.random() < C.quarterTurnProb ? (Math.random() < 0.5 ? 90 : -90) : 0;
    return `scaleX(${mir}) rotate(${q}deg)`;
  }
  function scaleFor(kind) {
    if (kind === "github") return C.scale.github;
    if (kind === "sun" || kind === "moon") return C.scale.sun;
    if (kind === "at") return C.scale.at;
    if (isLucide(kind)) return C.scale.func;
    return C.scale.default;
  }

  function glyph(kind) {
    if (kind.length === 1) {
      return `<div class="wm" style="font-size:${Math.round(TW * 0.58)}px;transform:translateY(-9%)">${kind}</div>`;
    }
    const tf = `transform:${restTransform(kind)} scale(${scaleFor(kind)})`;
    if (kind === "github") return `<svg viewBox="0 0 24 24" style="width:100%;height:100%;${tf}"><circle cx="12" cy="12" r="12" fill="currentColor"/><g transform="translate(3.84 3.84) scale(0.68)"><path d="${OCTO}" style="fill:var(--bg)"/></g></svg>`;
    if (isLucide(kind)) return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" style="width:100%;height:100%;${tf}">${LUCIDE[kind]}</svg>`;
    return `<svg viewBox="0 0 100 100" style="width:100%;height:100%;${tf}">${SHAPE[kind] || SHAPE.seed}</svg>`;
  }

  function randKind() {
    if (C.webProb && Math.random() < C.webProb) return "web";
    let k = pick(C.baseWeights);
    if ((k === "seed" || k === "petal" || k === "ring") && Math.random() < C.funcReplaceProb) k = pick(C.funcKeys);
    return k;
  }
  const randColor = () => css(pick(C.colors));

  const grid = document.getElementById("grid");
  const web = document.getElementById("web");
  const nEl = document.getElementById("n");
  let cols, rows, cells = [], woven = 0;
  const state = { interactions: 0, spelled: false, formed: false, busy: false,
    sun: null, github: null, at: null, mode: C.startMode, nextSpell: C.reveal.firstSpellAfter, nextForm: C.reveal.firstFormAfter, ghTimer: 0 };

  const gridLeft = () => (innerWidth - cols * TW) / 2;
  const gridTop = () => (innerHeight - rows * TW) / 2;
  const cx = cell => gridLeft() + (cell.c + 0.5) * TW;
  const cy = cell => gridTop() + (cell.r + 0.5) * TW;
  function inView(cell) {
    const l = gridLeft() + cell.c * TW, t = gridTop() + cell.r * TW;
    return l >= 0 && t >= 0 && l + TW <= innerWidth && t + TW <= innerHeight;
  }
  const loadedCells = () => cells.filter(c => c.loaded);
  const free = c => c.loaded && !c.role && !c.el.classList.contains("lit");
  const freeCells = () => cells.filter(free);

  function buildGrid() {
    TW = Math.round(Math.min(C.tile.max, Math.max(C.tile.min, innerWidth / C.tile.divisor)));
    const coverW = Math.max(innerWidth, screen.width || innerWidth) + TW * 2;
    const coverH = Math.max(innerHeight, screen.height || innerHeight) + TW * 2;
    cols = Math.ceil(coverW / TW); rows = Math.ceil(coverH / TW);
    grid.style.width = cols * TW + "px"; grid.style.height = rows * TW + "px";
    grid.style.gridTemplateColumns = `repeat(${cols},${TW}px)`;
    grid.style.gridAutoRows = `${TW}px`;
    let html = "";
    for (let i = 0; i < cols * rows; i++) html += `<div class="cell"></div>`;
    grid.innerHTML = html;
    const kids = grid.children;
    cells = [];
    for (let i = 0; i < kids.length; i++) cells.push({ el: kids[i], r: (i / cols) | 0, c: i % cols, loaded: false, role: null, kind: null, color: null });
    syncViewport();
  }

  function populate(cell) {
    if (cell.loaded) return;
    const k = randKind(), col = randColor(), k2 = randKind();
    cell.el.innerHTML = `<div class="bubble"></div><div class="card" style="--c:${col}"><div class="flip"><div class="face front">${glyph(k)}</div><div class="face back">${glyph(k2)}</div></div></div>`;
    cell.card = cell.el.querySelector(".card");
    cell.flip = cell.el.querySelector(".flip");
    cell.front = cell.el.querySelector(".front");
    cell.back = cell.el.querySelector(".back");
    cell.kind = k; cell.color = col; cell.loaded = true; cell.role = null;
  }
  function clearCell(cell) {
    if (!cell.loaded) return;
    cell.el.innerHTML = ""; cell.loaded = false; cell.card = null;
    if (cell.role === "sun") state.sun = null;
    if (cell.role === "github") state.github = null;
    if (cell.role === "at") state.at = null;
    cell.role = null;
  }
  function syncViewport() {
    for (const cell of cells) {
      const vis = inView(cell);
      if (vis && !cell.loaded) populate(cell);
      else if (!vis && cell.loaded) clearCell(cell);
    }
    placeSun();
    if (state.spelled && state.formed && !state.github) placeGithub();
    else if (state.github && !state.github.loaded) { state.github = null; placeGithub(); }
    if (threadLeft() && (!state.at || !state.at.loaded)) { state.at = null; placeAt(); }
  }

  function setFace(cell, html, colorVar) {
    const back = cell.flip.classList.contains("on") ? cell.front : cell.back;
    back.innerHTML = html;
    if (colorVar) cell.card.style.setProperty("--c", colorVar);
    cell.flip.classList.toggle("on");
    woven++; if (nEl) nEl.textContent = woven;
  }
  function flipKind(cell, kind, colorVar) {
    const col = colorVar || randColor();
    setFace(cell, glyph(kind), col);
    cell.kind = kind; cell.color = col;
  }

  let cooldown = 0;
  function branch(seed) {
    if (!seed || !seed.loaded) return;
    const now = performance.now(); if (now < cooldown) return; cooldown = now + C.branch.cooldownMs;
    const target = rint(C.branch.min, C.branch.max);
    const visited = new Set([seed]); const nodes = [seed]; const edges = [];
    let frontier = [seed];
    for (let hop = 0; hop < C.branch.hops && nodes.length < target; hop++) {
      const next = [];
      for (const f of frontier) {
        if (nodes.length >= target) break;
        const cand = cells.filter(t => t.loaded && !t.role && !visited.has(t) && (t.kind === f.kind || t.color === f.color) && inView(t));
        shuffle(cand);
        const take = cand.slice(0, hop === 0 ? Math.min(4, target - 1) : 2);
        for (const t of take) { if (nodes.length >= target) break; visited.add(t); nodes.push(t); edges.push([f, t]); next.push(t); }
      }
      frontier = next;
    }
    if (nodes.length < 2) { pace(); return; }
    const lines = edges.map(([a, b]) => line(a, b));
    nodes.forEach(t => { if (!t.role) t.el.classList.add("lit"); });
    setTimeout(() => {
      lines.forEach(l => { l.style.opacity = 0; setTimeout(() => l.remove(), C.branch.fadeMs); });
      nodes.forEach((t, k) => setTimeout(() => { t.el.classList.remove("lit"); if (!t.role && t.loaded) flipKind(t, randKind()); }, k * 60));
    }, C.branch.litMs);
    pace();
  }
  function line(a, b) {
    const ln = document.createElementNS(SVGNS, "line");
    ln.setAttribute("x1", cx(a)); ln.setAttribute("y1", cy(a)); ln.setAttribute("x2", cx(b)); ln.setAttribute("y2", cy(b));
    web.appendChild(ln); return ln;
  }
  function shuffle(a) { for (let i = a.length - 1; i > 0; i--) { const j = (Math.random() * (i + 1)) | 0;[a[i], a[j]] = [a[j], a[i]]; } return a; }

  function pace() {
    state.interactions++;
    if (state.busy) return;
    if (state.interactions >= state.nextSpell) { state.nextSpell = state.interactions + between(C.reveal.spellEvery); spellName(); }
    else if (state.interactions >= state.nextForm) { state.nextForm = state.interactions + between(C.reveal.formEvery); formMark(); }
  }

  function spellName() {
    if (state.busy) return;
    const word = C.spell.word, L = word.length, runs = [];
    for (let r = 0; r < rows; r++) {
      let run = [];
      for (let c = 0; c < cols; c++) {
        const cell = cells[r * cols + c];
        if (cell.loaded && !cell.role && !cell.el.classList.contains("lit")) { run.push(cell); if (run.length >= L) runs.push(run.slice(run.length - L)); }
        else run = [];
      }
    }
    if (!runs.length) return;
    state.busy = true;
    const run = pick(runs), step = reduce ? 0 : C.spell.stepMs;
    run.forEach((cell, k) => setTimeout(() => { setFace(cell, glyph(word[k]), css("--teal")); cell.kind = "letter"; }, k * step));
    const hold = reduce ? 800 : C.spell.holdMs;
    setTimeout(() => {
      run.forEach((cell, k) => setTimeout(() => { if (cell.loaded) flipKind(cell, randKind()); }, k * C.spell.scatterStepMs));
      setTimeout(() => { state.spelled = true; state.busy = false; checkDoor(); }, run.length * C.spell.scatterStepMs + 80);
    }, run.length * step + hold);
  }

  function formMark() {
    if (state.busy) return;
    const opts = cells.filter(cell => {
      const j = cell.c + 1 < cols ? cells[cell.r * cols + (cell.c + 1)] : null;
      return j && free(cell) && free(j) && inView(cell) && inView(j);
    });
    if (!opts.length) return;
    state.busy = true;
    const a = pick(opts), b = cells[a.r * cols + (a.c + 1)];
    a.card.style.transition = b.card.style.transition = `opacity ${C.form.fadeMs}ms ease`;
    a.card.style.opacity = b.card.style.opacity = "0";
    const size = TW * C.form.markScale;
    const mx = (cx(a) + cx(b)) / 2, my = (cy(a) + cy(b)) / 2;
    const o = document.createElement("div");
    o.className = "mark";
    o.style.cssText = `left:${mx - size / 2}px;top:${my - size / 2}px;width:${size}px;height:${size}px;color:${css("--teal")}`;
    o.innerHTML = MARK_SVG("currentColor");
    document.body.appendChild(o);
    const done = () => {
      o.remove();
      [a, b].forEach(cell => { if (cell.loaded) { flipKind(cell, randKind()); cell.card.style.opacity = "1"; } });
      state.formed = true; state.busy = false; checkDoor();
    };
    if (reduce) { setTimeout(done, 700); return; }
    const anim = o.animate([
      { transform: "scale(.3) rotate(-120deg)", opacity: 0 },
      { transform: "scale(1.1) rotate(16deg)", opacity: 1, offset: .45 },
      { transform: "scale(1) rotate(0deg)", opacity: 1, offset: .7 },
      { transform: "scale(1) rotate(0deg)", opacity: 1, offset: .86 },
      { transform: "scale(.7) rotate(0deg)", opacity: 0 }
    ], { duration: C.form.holdMs + 250, easing: "cubic-bezier(.3,1.2,.4,1)" });
    anim.onfinish = done;
  }

  function topRightCell() {
    let best = null, bestScore = Infinity;
    for (const cell of loadedCells()) {
      if (cell.role && cell.role !== "sun") continue;
      const score = Math.hypot(innerWidth - cx(cell), cy(cell));
      if (score < bestScore) { bestScore = score; best = cell; }
    }
    return best;
  }
  function paintSun(cell) {
    if (!cell || !cell.loaded) return;
    setFace(cell, glyph(state.mode === "day" ? "sun" : "moon"), css(state.mode === "day" ? "--orange" : "--slate"));
  }
  function placeSun() {
    if (!C.sunMoon) return;
    const want = topRightCell();
    if (!want || state.sun === want) return;
    if (state.sun && state.sun.loaded) { state.sun.role = null; flipKind(state.sun, randKind()); }
    want.role = "sun"; state.sun = want; paintSun(want);
  }
  function toggleMode() {
    state.mode = state.mode === "day" ? "night" : "day";
    document.documentElement.dataset.mode = state.mode;
    if (state.sun) paintSun(state.sun);
  }

  function checkDoor() { if (state.spelled && state.formed && !state.github) placeGithub(); }
  function placeGithub() {
    if (state.github) return;
    const pool = freeCells(); if (!pool.length) return;
    const cell = pick(pool);
    cell.role = "github"; state.github = cell;
    setFace(cell, glyph("github"), css("--coffee")); cell.el.classList.add("door");
    clearTimeout(state.ghTimer);
    state.ghTimer = setTimeout(relocateGithub, between(C.github.flipEveryMs));
  }
  function relocateGithub() {
    if (!state.github) return;
    const old = state.github; old.role = null; old.el.classList.remove("door");
    if (old.loaded) flipKind(old, randKind());
    state.github = null; placeGithub();
  }
  function openDoor() {
    const target = C.repoUrl && C.repoUrl.trim() ? C.repoUrl.trim() : "./404.html";
    window.open(target, "_blank", "noopener");
    clearTimeout(state.ghTimer);
    const old = state.github; if (old) { old.role = null; old.el.classList.remove("door"); if (old.loaded) flipKind(old, randKind()); }
    state.github = null; state.spelled = false; state.formed = false;
  }

  const threadLeft = () => { try { return localStorage.getItem("weever.thread") === "1"; } catch (e) { return false; } };
  function placeAt() {
    if (state.at && state.at.loaded) return;
    const pool = freeCells(); if (!pool.length) return;
    const cell = pick(pool);
    cell.role = "at"; state.at = cell;
    setFace(cell, glyph("at"), css("--coffee"));
  }

  function twitch(card) {
    const roll = Math.random(); let frames, dur, easing;
    if (roll < C.live.tiltProb) {
      const a = (Math.random() * 30 - 15).toFixed(1);
      frames = [{ transform: "rotate(0deg)" }, { transform: `rotate(${a}deg)`, offset: .55 }, { transform: "rotate(0deg)" }];
      dur = 520 + Math.random() * 240; easing = "cubic-bezier(.3,1.5,.45,1)";
    } else if (roll < C.live.tiltProb + C.live.swingProb) {
      const a = ((Math.random() < .5 ? -1 : 1) * (148 + Math.random() * 28)).toFixed(1);
      frames = [{ transform: "rotate(0deg)" }, { transform: `rotate(${a}deg)`, offset: .62 }, { transform: "rotate(0deg)" }];
      dur = 640 + Math.random() * 260; easing = "cubic-bezier(.34,1.6,.4,1)";
    } else {
      const dir = Math.random() < .5 ? 1 : -1;
      frames = [{ transform: "rotate(0deg)" }, { transform: `rotate(${dir * 360}deg)` }];
      dur = 500 + Math.random() * 200; easing = "cubic-bezier(.5,0,.25,1)";
    }
    card.animate(frames, { duration: dur, easing, composite: "replace" });
  }
  (function tickLive() {
    if (!reduce) { const pool = freeCells(); if (pool.length) { const c = pick(pool); if (c.card) twitch(c.card); } }
    setTimeout(tickLive, C.live.minGap + Math.random() * (C.live.maxGap - C.live.minGap));
  })();
  (function tickSpont() {
    if (!reduce && !state.busy && loadedCells().length) { if (Math.random() < 0.5) spellName(); else formMark(); }
    setTimeout(tickSpont, between(C.reveal.spontaneousMs));
  })();

  let down = false, lastCell = null;
  function cellAt(x, y) {
    const c = Math.floor((x - gridLeft()) / TW), r = Math.floor((y - gridTop()) / TW);
    if (c < 0 || c >= cols || r < 0 || r >= rows) return null;
    return cells[r * cols + c];
  }
  function onDown(x, y) {
    const cell = cellAt(x, y); if (!cell || !cell.loaded) { down = true; return; }
    if (cell.role === "sun") { toggleMode(); return; }
    if (cell.role === "github") { openDoor(); return; }
    down = true; lastCell = cell; branch(cell);
  }
  function onMove(x, y) {
    if (!down) return;
    const cell = cellAt(x, y); if (!cell || cell === lastCell || !cell.loaded || cell.role) return;
    lastCell = cell; branch(cell);
  }
  const endDown = () => { down = false; lastCell = null; };
  addEventListener("pointerdown", e => onDown(e.clientX, e.clientY));
  addEventListener("pointermove", e => onMove(e.clientX, e.clientY));
  addEventListener("pointerup", endDown);
  addEventListener("pointercancel", endDown);
  addEventListener("pointerleave", endDown);

  const keep = document.getElementById("keep"), email = document.getElementById("email");
  if (keep) {
    let opened = false;
    const valid = a => /.+@.+\..+/.test(a);
    keep.querySelector(".pill").addEventListener("click", e => { if (!keep.classList.contains("open")) { e.preventDefault(); if (!opened) { opened = true; keep.classList.add("open"); email.focus(); } } });
    keep.addEventListener("submit", async e => {
      e.preventDefault();
      const addr = email.value.trim(); if (!valid(addr)) { email.focus(); return; }
      if (C.formEndpoint) { try { await fetch(C.formEndpoint, { method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" }, body: JSON.stringify({ email: addr }) }); } catch (err) {} }
      try { localStorage.setItem("weever.thread", "1"); } catch (err) {}
      placeAt();
      keep.classList.add("kept"); keep.querySelector(".pill").textContent = "woven";
      email.value = ""; email.placeholder = "kept. a thread is yours now.";
    });
  }

  let rt;
  addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(() => {
    web.innerHTML = "";
    const need = Math.round(Math.min(C.tile.max, Math.max(C.tile.min, innerWidth / C.tile.divisor)));
    if (need !== TW) buildGrid(); else syncViewport();
  }, 150); });

  document.documentElement.dataset.mode = state.mode;
  if (document.fonts && document.fonts.load) { document.fonts.load("400 64px 'Bagel Fat One'"); document.fonts.load("500 14px 'Fredoka'"); }
  const ready = (document.fonts && document.fonts.ready) ? document.fonts.ready : Promise.resolve();
  ready.then(buildGrid).catch(buildGrid);

  if (/[?&]debug=1/.test(location.search)) {
    window.weever = { spell: spellName, form: formMark, door: () => { state.spelled = state.formed = true; placeGithub(); }, at: placeAt, toggle: toggleMode, state };
  }
})();
