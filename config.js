window.WEEVER_CONFIG = {
  repoUrl: "",

  formEndpoint: "",

  tile: { min: 54, max: 74, divisor: 16 },

  colors: ["--teal","--teal","--teal","--coffee","--coffee","--coffee","--orange","--mint","--slate"],

  baseWeights: ["petal","dots","node","seed","petal","node","dots","ring","legs","W","seed"],

  funcKeys: ["waypoints","gitbranch","link","sync","layers","database"],
  funcReplaceProb: 0.30,

  rest_upright: ["W","legs","waypoints","gitbranch","link","sync","layers","database","github","at","sun","moon","mark"],
  mirrorProb: 0.5,
  quarterTurnProb: 0.12,

  scale: { default: 1.0, func: 0.72, github: 0.78, at: 0.9, sun: 0.8 },

  branch: { min: 3, max: 9, hops: 2, cooldownMs: 140, litMs: 620, fadeMs: 500 },

  live: { minGap: 110, maxGap: 320, tiltProb: 0.55, swingProb: 0.30 },

  spell: { word: "weever", stepMs: 210, holdMs: 2400, scatterStepMs: 95 },

  form: { fadeMs: 280, holdMs: 1500, markScale: 1.15 },

  reveal: { firstSpellAfter: 4, firstFormAfter: 7, spellEvery: [7,14], formEvery: [9,16], spontaneousMs: [15000, 27000] },

  github: { flipEveryMs: [7000, 12000] },

  sunMoon: true,

  startMode: "day"
};
