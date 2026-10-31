// Point-cloud targets for the background particle field. Each shape returns
// `count` positions and colours so any shape can morph into any other.

const PAPER = [0.95, 0.93, 0.89];
const EOSIN = [0.94, 0.42, 0.6];
const HEMA = [0.55, 0.48, 1.0];
const DIM = [0.42, 0.4, 0.5];
const DUST_SHARE = 0.06;

function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function gauss(r) {
  return Math.sqrt(-2 * Math.log(r() + 1e-9)) * Math.cos(2 * Math.PI * r());
}

function unitVec(r) {
  const x = gauss(r);
  const y = gauss(r);
  const z = gauss(r);
  const l = Math.hypot(x, y, z) || 1;
  return [x / l, y / l, z / l];
}

function mixColor(a, b, t) {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
}

function rotate(pos, rx, ry, rz) {
  const [sx, cx, sy, cy, sz, cz] = [
    Math.sin(rx), Math.cos(rx), Math.sin(ry), Math.cos(ry), Math.sin(rz), Math.cos(rz),
  ];
  for (let i = 0; i < pos.length; i += 3) {
    let x = pos[i];
    let y = pos[i + 1];
    let z = pos[i + 2];
    [y, z] = [y * cx - z * sx, y * sx + z * cx];
    [x, z] = [x * cy + z * sy, -x * sy + z * cy];
    [x, y] = [x * cz - y * sz, x * sz + y * cz];
    pos[i] = x;
    pos[i + 1] = y;
    pos[i + 2] = z;
  }
}

function build(count, seed, fn, rot = [0, 0, 0], scale = 1) {
  const r = rng(seed);
  const pos = new Float32Array(count * 3);
  const col = new Float32Array(count * 3);
  const dustFrom = Math.floor(count * (1 - DUST_SHARE));
  for (let i = 0; i < count; i++) {
    let p;
    let c;
    if (i >= dustFrom) {
      const d = unitVec(r);
      const rad = 4 + r() * 6;
      p = [d[0] * rad * 1.6, d[1] * rad, d[2] * rad - 2];
      c = DIM;
    } else {
      [p, c] = fn(r, i / dustFrom);
      p = [p[0] * scale, p[1] * scale, p[2] * scale];
    }
    pos.set(p, i * 3);
    col.set(c, i * 3);
  }
  // Dust is shared space around the object, so it should not inherit the object's tilt.
  const body = pos.subarray(0, dustFrom * 3);
  rotate(body, ...rot);
  return { pos, col };
}

function helix(r) {
  const R = 1.2;
  const turns = 2.3;
  const height = 7.2;
  if (r() < 0.64) {
    const t = r();
    const strand = r() < 0.5 ? 0 : 1;
    const a = t * Math.PI * 2 * turns + strand * Math.PI;
    const j = 0.07;
    return [
      [Math.cos(a) * R + gauss(r) * j, (t - 0.5) * height + gauss(r) * j, Math.sin(a) * R + gauss(r) * j],
      strand ? mixColor(PAPER, HEMA, 0.25) : HEMA,
    ];
  }
  const rungs = 42;
  const k = Math.floor(r() * rungs);
  const t = (k + 0.5) / rungs;
  const a = t * Math.PI * 2 * turns;
  const u = r();
  const s = 1 - 2 * u;
  return [
    [Math.cos(a) * R * s + gauss(r) * 0.025, (t - 0.5) * height + gauss(r) * 0.025, Math.sin(a) * R * s + gauss(r) * 0.025],
    u < 0.5 ? EOSIN : mixColor(HEMA, PAPER, 0.3),
  ];
}

function brain(r) {
  const roll = r();
  if (roll < 0.07) {
    // Lesion in the left middle cerebral artery territory.
    const d = unitVec(r);
    const rad = 0.45 * Math.cbrt(r());
    return [[-1.0 + d[0] * rad * 0.6, 0.45 + d[1] * rad, 0.35 + d[2] * rad * 1.3], EOSIN];
  }
  if (roll < 0.17) {
    // Cerebellum, with folia as horizontal ridges.
    const d = unitVec(r);
    const k = 1 + 0.06 * Math.sin(d[1] * 28);
    return [[d[0] * 1.15 * k, -0.95 + d[1] * 0.55 * k, -1.55 + d[2] * 0.75 * k], mixColor(HEMA, PAPER, 0.15)];
  }
  if (roll < 0.21) {
    const t = r();
    const a = r() * Math.PI * 2;
    return [[Math.cos(a) * 0.28, -0.8 - t * 1.3, -0.7 - t * 0.35 + Math.sin(a) * 0.28], mixColor(HEMA, DIM, 0.4)];
  }
  const h = r() < 0.5 ? -1 : 1;
  const d = unitVec(r);
  d[0] = Math.abs(d[0]);
  const k =
    1 +
    0.09 * Math.sin(7 * d[0] + 8 * d[1] + 2 * h) * Math.cos(8 * d[2] + 6 * d[1]) +
    0.05 * Math.sin(15 * d[2] + 12 * d[0]);
  const interior = roll > 0.86;
  const s = interior ? Math.cbrt(r()) * 0.88 : 1;
  const x = h * (0.07 + d[0] * 1.3 * k * s);
  let y = d[1] * 1.7 * k * s;
  const z = d[2] * 2.3 * k * s;
  if (y < -0.4) y = -0.4 + (y + 0.4) * 0.55;
  if (interior) return [[x, y, z], mixColor(DIM, HEMA, 0.35)];
  return [[x, y, z], mixColor(HEMA, PAPER, Math.min(1, Math.max(0, (y + 1.0) / 2.8)))];
}

const tissueCells = (() => {
  const r = rng(7);
  const cells = [];
  for (let gx = -4; gx <= 4; gx += 0.42) {
    for (let gz = -2.6; gz <= 2.6; gz += 0.42) {
      if (r() < 0.82) cells.push([gx + (r() - 0.5) * 0.3, gz + (r() - 0.5) * 0.3, 0.6 + r() * 0.8]);
    }
  }
  return cells;
})();

function tissue(r) {
  const roll = r();
  if (roll < 0.46) {
    const [cx, cz, s] = tissueCells[Math.floor(r() * tissueCells.length)];
    return [[cx + gauss(r) * 0.085 * s, gauss(r) * 0.05, cz + gauss(r) * 0.06 * s], HEMA];
  }
  if (roll < 0.8) {
    // Stroma follows gentle fibre lines.
    const x = (r() - 0.5) * 8.4;
    const z = (r() - 0.5) * 5.4 + 0.18 * Math.sin(x * 2.2 + Math.floor(r() * 6));
    return [[x, gauss(r) * 0.03, z], mixColor(EOSIN, PAPER, r() * 0.35)];
  }
  // Spatial transcriptomics spots: a lattice of expression columns above the slide.
  const ix = Math.floor(r() * 15);
  const iz = Math.floor(r() * 9);
  const x = -3.5 + ix * 0.5 + (iz % 2) * 0.25;
  const z = -2 + iz * 0.5;
  const expr = 0.5 + 0.5 * Math.sin(x * 0.9 + 0.6) * Math.cos(z * 1.3);
  const t = r();
  return [[x + gauss(r) * 0.025, 0.25 + t * expr * 1.6, z + gauss(r) * 0.025], mixColor(PAPER, EOSIN, t * expr)];
}

function polyp(r) {
  const roll = r();
  if (roll < 0.5) {
    const d = unitVec(r);
    const k = 1 + 0.12 * Math.sin(3 * d[0] + 2 * d[1]) + 0.08 * Math.cos(4 * d[2] + 3 * d[0]);
    return [[d[0] * 1.85 * k, d[1] * 1.85 * k, d[2] * 1.3 * k], mixColor(HEMA, PAPER, 0.15 + r() * 0.3)];
  }
  if (roll < 0.78) {
    const a = r() * Math.PI * 2;
    const R = 2.0 * (1 + 0.1 * Math.sin(3 * a + 0.5) + 0.05 * Math.sin(5 * a));
    const j = gauss(r) * 0.035;
    return [[Math.cos(a) * (R + j), Math.sin(a) * (R + j), 0.12 * Math.sin(2 * a) + gauss(r) * 0.04], EOSIN];
  }
  // Four-way scan lattice behind the lesion.
  const dir = Math.floor(r() * 4);
  const line = (Math.floor(r() * 11) - 5) * 0.6;
  const s = (r() - 0.5) * 6.4;
  const dirs = [[1, 0], [0, 1], [Math.SQRT1_2, Math.SQRT1_2], [Math.SQRT1_2, -Math.SQRT1_2]];
  const [ux, uy] = dirs[dir];
  return [[ux * s - uy * line, uy * s + ux * line, -1.1], mixColor(DIM, PAPER, 0.2)];
}

function spine(r) {
  const n = 6;
  const gap = 1.22;
  const roll = r();
  const k = Math.floor(r() * n);
  const cy = (k - (n - 1) / 2) * gap;
  const curve = (y) => 0.32 * Math.sin(y * 0.55);
  if (roll < 0.11 && k < n - 1) {
    const y = cy + gap / 2;
    const a = r() * Math.PI * 2;
    const rad = Math.sqrt(r()) * 0.88;
    return [[Math.cos(a) * rad, y + gauss(r) * 0.05, Math.sin(a) * rad * 0.72 + curve(y)], EOSIN];
  }
  const h = 0.78;
  if (roll < 0.7) {
    const a = r() * Math.PI * 2;
    const yy = (r() - 0.5) * h;
    const waist = 1 - 0.13 * (1 - (2 * yy / h) ** 2);
    const inner = roll > 0.56;
    const s = inner ? Math.sqrt(r()) : 1;
    return [
      [Math.cos(a) * 0.98 * waist * s, cy + yy, Math.sin(a) * 0.72 * waist * s + curve(cy + yy)],
      inner ? mixColor(DIM, PAPER, 0.3) : mixColor(PAPER, HEMA, 0.35 + 0.3 * Math.abs(Math.sin(a))),
    ];
  }
  // Posterior arch and processes.
  const which = r();
  const t = r();
  const j = () => gauss(r) * 0.06;
  if (which < 0.4) {
    return [[j(), cy - t * 0.35 + j(), -0.72 - t * 1.05 + curve(cy) + j()], mixColor(HEMA, PAPER, 0.4)];
  }
  const side = which < 0.7 ? -1 : 1;
  return [[side * (0.55 + t * 0.85) + j(), cy + j(), -0.75 + curve(cy) + j()], mixColor(HEMA, PAPER, 0.4)];
}

const sphereNodes = (() => {
  const r = rng(11);
  const nodes = [];
  const n = 90;
  for (let i = 0; i < n; i++) {
    const y = 1 - (2 * (i + 0.5)) / n;
    const rad = Math.sqrt(1 - y * y);
    const a = i * Math.PI * (3 - Math.sqrt(5));
    nodes.push([Math.cos(a) * rad * 2.6, y * 2.6, Math.sin(a) * rad * 2.6]);
  }
  const edges = [];
  for (let i = 0; i < 160; i++) {
    const a = Math.floor(r() * n);
    let best = -1;
    let bestD = Infinity;
    for (let tries = 0; tries < 12; tries++) {
      const b = Math.floor(r() * n);
      if (b === a) continue;
      const d = Math.hypot(...nodes[a].map((v, ax) => v - nodes[b][ax]));
      if (d < bestD) {
        bestD = d;
        best = b;
      }
    }
    edges.push([a, best]);
  }
  return { nodes, edges };
})();

function network(r) {
  const { nodes, edges } = sphereNodes;
  if (r() < 0.45) {
    const p = nodes[Math.floor(r() * nodes.length)];
    return [[p[0] + gauss(r) * 0.06, p[1] + gauss(r) * 0.06, p[2] + gauss(r) * 0.06], r() < 0.2 ? EOSIN : PAPER];
  }
  const [a, b] = edges[Math.floor(r() * edges.length)];
  const t = r();
  const p = nodes[a].map((v, ax) => v + (nodes[b][ax] - v) * t);
  // Bow edges outward so they read as arcs on the sphere.
  const l = Math.hypot(...p) || 1;
  const bow = 2.6 / l;
  return [[p[0] * bow, p[1] * bow, p[2] * bow], mixColor(HEMA, DIM, 0.3)];
}

function scatter(r) {
  const d = unitVec(r);
  const rad = 6 + r() * 8;
  return [[d[0] * rad, d[1] * rad, d[2] * rad], DIM];
}

export function buildShapes(count) {
  return {
    scatter: build(count, 1, scatter),
    helix: build(count, 2, helix, [0.25, 0, -0.42]),
    tissue: build(count, 3, tissue, [0.82, -0.4, 0.06], 0.85),
    brain: build(count, 4, brain, [0.12, 1.2, 0]),
    polyp: build(count, 5, polyp, [-0.18, 0.4, 0]),
    spine: build(count, 6, spine, [0.05, 1.0, 0.12], 0.78),
    network: build(count, 8, network, [0.3, 0, 0.2]),
  };
}
