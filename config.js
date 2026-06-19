window.WEEVER_CONFIG = {
  repoUrl: "https://github.com/weever-ai/site",

  formEndpoint: "https://weever-list.shuey298.workers.dev",

  tile: { min: 54, max: 74, divisor: 16 },

  colors: ["--teal","--teal","--teal","--coffee","--coffee","--coffee","--orange","--mint","--slate"],

  baseWeights: ["petal","dots","node","seed","petal","node","dots","ring","legs","w","seed"],

  funcKeys: ["waypoints","gitbranch","link","sync","layers","database"],
  funcReplaceProb: 0.30,

  webProb: 0.012,

  rest_upright: ["w","web","legs","waypoints","gitbranch","link","sync","layers","database","github","at","sun","moon","mark"],
  mirrorProb: 0.5,
  quarterTurnProb: 0.12,

  // size of each glyph relative to its tile. keys can be any kind (web, at, github,
  // sun, the lowercase letter, etc); func = all the lucide line icons; default = the rest.
  scale: { default: 1.0, func: 0.72, web: 0.72, github: 0.78, at: 0.9, sun: 0.8, letter: 0.58 },

  // per-icon nudge, x/y in percent of the tile. negative y = up, negative x = left.
  // add any kind here (web, at, github, sun, letter, ...) to fine-tune its centering.
  shift: { letter: { x: 0, y: -21 }, web: { x: 0, y: 0 } },

  branch: { min: 3, max: 9, hops: 2, cooldownMs: 140, litMs: 620, fadeMs: 500 },

  live: { minGap: 110, maxGap: 320, tiltProb: 0.55, swingProb: 0.30 },

  spell: { word: "weever", stepMs: 210, holdMs: 3100, scatterStepMs: 95 },

  form: { fadeMs: 280, holdMs: 2050, markScale: 1.15 },

  reveal: { firstSpellAfter: 4, firstFormAfter: 7, spellEvery: [7,14], formEvery: [9,16], spontaneousMs: [15000, 27000] },

  github: { flipEveryMs: [7000, 12000] },

  sunMoon: true,

  startMode: "day"
};
