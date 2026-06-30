#!/usr/bin/env node
/* ============================================================================
   LLM BODHI — OKF tooling
   Usage:
     node scripts/okf.js export   # bootstrap: js/data.js  -> knowledge/ (OKF bundle)
     node scripts/okf.js build    # pipeline:  knowledge/ + okf.config.js -> js/data.js

   The OKF bundle (knowledge/) is the source of truth. `build` regenerates the
   browser's js/data.js from it. Conforms to Open Knowledge Format v0.1:
   markdown files + YAML frontmatter, required `type`, bundle-relative .md links.
   ============================================================================ */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const BUNDLE = path.join(ROOT, 'knowledge');
const DATA_JS = path.join(ROOT, 'js', 'data.js');
const CONFIG = require(path.join(ROOT, 'okf.config.js'));

// ---------------------------------------------------------------------------
// Frontmatter codec (controlled YAML subset: scalars + lists of scalars).
// Strings are emitted JSON-quoted so any content (colons, quotes) round-trips.
// ---------------------------------------------------------------------------
function emitScalar(v) {
  if (typeof v === 'number') return String(v);
  return JSON.stringify(String(v)); // double-quoted, valid YAML scalar
}
function emitFrontmatter(fm) {
  const lines = ['---'];
  for (const [k, v] of Object.entries(fm)) {
    if (v === undefined || v === null) continue;
    if (Array.isArray(v)) {
      if (!v.length) continue;
      lines.push(`${k}:`);
      v.forEach((item) => lines.push(`  - ${emitScalar(item)}`));
    } else {
      lines.push(`${k}: ${emitScalar(v)}`);
    }
  }
  lines.push('---');
  return lines.join('\n');
}
function parseScalar(s) {
  s = s.trim();
  if (s.startsWith('"')) return JSON.parse(s);
  if (/^-?\d+(\.\d+)?$/.test(s)) return Number(s);
  return s;
}
function parseFrontmatter(text) {
  // returns { fm, body }
  if (!text.startsWith('---')) return { fm: {}, body: text };
  const end = text.indexOf('\n---', 3);
  const fmText = text.slice(3, end).replace(/^\n/, '');
  const body = text.slice(end + 4).replace(/^\n+/, '');
  const fm = {};
  const lines = fmText.split('\n');
  let curKey = null;
  for (const line of lines) {
    if (/^\s+-\s/.test(line)) {
      // list item
      const val = parseScalar(line.replace(/^\s+-\s/, ''));
      if (curKey) (fm[curKey] = fm[curKey] || []).push(val);
    } else {
      const m = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
      if (!m) continue;
      curKey = m[1];
      if (m[2].trim() === '') fm[curKey] = []; // list follows
      else { fm[curKey] = parseScalar(m[2]); curKey = null; }
    }
  }
  return { fm, body };
}

// ---------------------------------------------------------------------------
// Body codec: detail + optional code live in the markdown body (OKF-natural).
// ---------------------------------------------------------------------------
function buildBody(node, idMap) {
  const out = [`# ${node.label}`, '', node.detail || node.summary, ''];
  if (node.code) { out.push('## Example', '', '```python', node.code, '```', ''); }
  if (node.whenToUse) { out.push('## When to use', '', node.whenToUse, ''); }
  // Related concepts — real bundle-relative markdown links (OKF link-graph)
  if (node._out && node._out.length) {
    out.push('## Related concepts', '');
    node._out.forEach((e) => {
      const tgt = idMap[e.t];
      if (!tgt) return;
      const relLabel = (CONFIG.RELATIONS[e.r] || {}).label || e.r;
      out.push(`- ${relLabel} → [${tgt.label}](/${tgt.cluster}/${e.t}.md)`);
    });
    out.push('');
  }
  if (node.refs && node.refs.length) {
    out.push('## References', '');
    node.refs.forEach((r) => out.push(`- [${r.t}](${r.u})`));
    out.push('');
  }
  return out.join('\n').replace(/\n{3,}/g, '\n\n').trim() + '\n';
}
function extractDetail(body) {
  // text between the H1 line and the first '## ' heading or first code fence
  let b = body.replace(/^#\s+.*\n/, '');
  const stop = b.search(/\n#{2}\s|\n```/);
  if (stop !== -1) b = b.slice(0, stop);
  return b.trim();
}
function extractCode(body) {
  const m = body.match(/```[a-zA-Z0-9]*\n([\s\S]*?)```/);
  return m ? m[1].replace(/\n$/, '') : undefined;
}

// ---------------------------------------------------------------------------
// Load the current (hand-written) data.js — used only by `export` to bootstrap.
// ---------------------------------------------------------------------------
function loadDataJs() {
  const txt = fs.readFileSync(DATA_JS, 'utf8');
  const fn = new Function(txt + '\n;return { GRAPH: GRAPH };');
  return fn().GRAPH;
}

// ---------------------------------------------------------------------------
// EXPORT: js/data.js -> knowledge/ (one .md per concept + index.md files)
// ---------------------------------------------------------------------------
function doExport() {
  const GRAPH = loadDataJs();
  const idMap = {};
  GRAPH.nodes.forEach((n) => { idMap[n.id] = n; });

  // attach outgoing typed edges to each node (exclude derived 'path' edges)
  GRAPH.nodes.forEach((n) => { n._out = []; });
  GRAPH.edges.forEach((e) => {
    if (e.r === 'path') return;
    if (idMap[e.s]) idMap[e.s]._out.push(e);
  });

  // clean bundle dir
  if (fs.existsSync(BUNDLE)) fs.rmSync(BUNDLE, { recursive: true });
  fs.mkdirSync(BUNDLE, { recursive: true });

  const byCluster = {};
  GRAPH.nodes.forEach((n) => { (byCluster[n.cluster] = byCluster[n.cluster] || []).push(n); });

  Object.entries(byCluster).forEach(([cluster, nodes]) => {
    const dir = path.join(BUNDLE, cluster);
    fs.mkdirSync(dir, { recursive: true });
    nodes.forEach((n) => {
      const fm = {
        type: CONFIG.CLUSTER_TYPE[cluster] || 'Concept',
        title: n.label,
        description: n.summary,
        cluster: cluster,
        level: n.level,
        added: n.added,
        tags: [cluster, (CONFIG.LEVELS[n.level] || '').toLowerCase().replace(/[^a-z]+/g, '-')].filter(Boolean),
        when_to_use: n.whenToUse || undefined,
        relations: n._out.map((e) => `${e.r}:${e.t}`),
        references: (n.refs || []).map((r) => `${r.t}|${r.u}`),
        resource: n.refs && n.refs[0] ? n.refs[0].u : undefined,
      };
      const md = emitFrontmatter(fm) + '\n\n' + buildBody(n, idMap);
      fs.writeFileSync(path.join(dir, n.id + '.md'), md);
    });
    // cluster index.md (reserved file, no frontmatter)
    const idx = [`# ${CONFIG.CLUSTERS[cluster].label}`, '',
      ...nodes.sort((a, b) => a.level - b.level).map((n) => `- [${n.label}](./${n.id}.md) — ${n.summary}`), ''].join('\n');
    fs.writeFileSync(path.join(dir, 'index.md'), idx);
  });

  // root index.md
  const rootIdx = ['# LLM Bodhi — Knowledge Bundle (OKF v0.1)', '',
    'An Open Knowledge Format bundle of LLM and fine-tuning concepts. Each markdown',
    'file is a concept; markdown links between them form the knowledge graph.', '',
    '## Clusters', '',
    ...Object.entries(CONFIG.CLUSTERS).map(([id, c]) => `- [${c.label}](./${id}/index.md)`), ''].join('\n');
  fs.writeFileSync(path.join(BUNDLE, 'index.md'), rootIdx);

  console.log(`export ✓  ${GRAPH.nodes.length} concepts -> ${path.relative(ROOT, BUNDLE)}/`);
}

// ---------------------------------------------------------------------------
// BUILD: knowledge/ + okf.config.js -> js/data.js (browser runtime)
// ---------------------------------------------------------------------------
function walkMd(dir, acc) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walkMd(p, acc);
    else if (entry.name.endsWith('.md') && entry.name !== 'index.md' && entry.name !== 'log.md') acc.push(p);
  }
  return acc;
}
function doBuild() {
  const files = walkMd(BUNDLE, []);
  const nodes = [];
  const edges = [];
  files.forEach((file) => {
    const { fm, body } = parseFrontmatter(fs.readFileSync(file, 'utf8'));
    if (!fm.type) { console.warn('skip (no type):', path.relative(ROOT, file)); return; }
    const id = path.basename(file, '.md');
    const node = {
      id,
      label: fm.title || id,
      type: fm.type,
      cluster: fm.cluster,
      level: fm.level,
      summary: fm.description || '',
      detail: extractDetail(body),
      whenToUse: fm.when_to_use,
      code: extractCode(body),
      refs: (fm.references || []).map((s) => { const [t, u] = String(s).split('|'); return { t, u }; }),
    };
    if (fm.added) node.added = String(fm.added); // release tag for "what's new" highlighting
    if (!node.refs.length) delete node.refs;
    if (!node.code) delete node.code;
    if (!node.whenToUse) delete node.whenToUse;
    nodes.push(node);
    (fm.relations || []).forEach((rel) => {
      const i = String(rel).indexOf(':');
      if (i === -1) return;
      edges.push({ s: id, t: rel.slice(i + 1), r: rel.slice(0, i) });
    });
  });

  // deterministic ordering
  const cOrder = Object.keys(CONFIG.CLUSTERS);
  nodes.sort((a, b) => (a.level - b.level) || (cOrder.indexOf(a.cluster) - cOrder.indexOf(b.cluster)) || a.id.localeCompare(b.id));

  // derive the guided-path edges from the flow definition
  const gp = CONFIG.GUIDED_PATH.steps;
  for (let i = 0; i < gp.length - 1; i++) edges.push({ s: gp[i].id, t: gp[i + 1].id, r: 'path' });

  // validate edge endpoints
  const ids = new Set(nodes.map((n) => n.id));
  const broken = edges.filter((e) => !ids.has(e.s) || !ids.has(e.t));
  if (broken.length) console.warn(`⚠ ${broken.length} edge(s) reference unknown concepts:`,
    broken.map((e) => `${e.s}-${e.r}->${e.t}`).join(', '));

  const GRAPH = { nodes, edges, decisionTree: CONFIG.DECISION_TREE, guidedPath: CONFIG.GUIDED_PATH, comparisons: CONFIG.COMPARISONS };
  const out =
`/* ============================================================================
   LLM BODHI — GENERATED FILE. Do not edit by hand.
   Source of truth: the OKF bundle in knowledge/  (+ okf.config.js for vocab/flows)
   Regenerate with:  node scripts/okf.js build
   ============================================================================ */
const CLUSTERS = ${JSON.stringify(CONFIG.CLUSTERS, null, 2)};
const LEVELS = ${JSON.stringify(CONFIG.LEVELS, null, 2)};
const RELATIONS = ${JSON.stringify(CONFIG.RELATIONS, null, 2)};
const RELEASE = ${JSON.stringify(CONFIG.RELEASE, null, 2)};
const GRAPH = ${JSON.stringify(GRAPH, null, 2)};
`;
  fs.writeFileSync(DATA_JS, out);
  console.log(`build ✓  ${nodes.length} concepts, ${edges.length} edges -> ${path.relative(ROOT, DATA_JS)}`);
}

// ---------------------------------------------------------------------------
const cmd = process.argv[2];
if (cmd === 'export') doExport();
else if (cmd === 'build') doBuild();
else { console.error('Usage: node scripts/okf.js [export|build]'); process.exit(1); }
