#!/usr/bin/env node
/* ============================================================================
   LLM BODHI — integrity validator / auditor
   Usage:  node scripts/validate.js
   Checks the generated runtime (js/data.js), the OKF bundle (knowledge/), and
   their consistency. Exits non-zero on errors so it can gate a build/commit.
   ============================================================================ */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DATA_JS = path.join(ROOT, 'js', 'data.js');
const BUNDLE = path.join(ROOT, 'knowledge');
const CONFIG = require(path.join(ROOT, 'okf.config.js'));

const errors = [];
const warns = [];
const err = (m) => errors.push(m);
const warn = (m) => warns.push(m);

// ---- load generated runtime data ------------------------------------------
const { CLUSTERS, RELATIONS, LEVELS, RELEASE, GRAPH } =
  new Function(fs.readFileSync(DATA_JS, 'utf8') + '\n;return { CLUSTERS, RELATIONS, LEVELS, RELEASE: typeof RELEASE !== "undefined" ? RELEASE : null, GRAPH };')();

const nodes = GRAPH.nodes || [];
const edges = GRAPH.edges || [];
const ids = new Set();

// ---- node checks -----------------------------------------------------------
for (const n of nodes) {
  if (!n.id) { err(`node with no id: ${JSON.stringify(n).slice(0, 60)}`); continue; }
  if (ids.has(n.id)) err(`duplicate node id: ${n.id}`);
  ids.add(n.id);
  if (!n.label) err(`${n.id}: missing label`);
  if (!n.summary) err(`${n.id}: missing summary`);
  if (!n.cluster) err(`${n.id}: missing cluster`);
  else if (!CLUSTERS[n.cluster]) err(`${n.id}: unknown cluster "${n.cluster}"`);
  if (!(n.level in LEVELS)) err(`${n.id}: level ${n.level} not in 1..${Object.keys(LEVELS).length}`);
  if (!n.type) warn(`${n.id}: no OKF type carried through`);
  if (n.added != null && !/^\d+\.\d+\.\d+$/.test(String(n.added))) warn(`${n.id}: "added" is not a semver version (${n.added})`);
  if (n.refs) n.refs.forEach((r) => { if (!r.u || !/^https?:\/\//.test(r.u)) warn(`${n.id}: ref "${r.t}" has a non-URL link`); });
}

// ---- edge checks -----------------------------------------------------------
const degree = {};
const edgeKeys = new Set();
for (const e of edges) {
  if (!ids.has(e.s)) err(`edge source not a node: ${e.s} -${e.r}-> ${e.t}`);
  if (!ids.has(e.t)) err(`edge target not a node: ${e.s} -${e.r}-> ${e.t}`);
  if (!RELATIONS[e.r]) err(`edge uses unknown relation "${e.r}": ${e.s} -> ${e.t}`);
  if (e.s === e.t) warn(`self-loop edge on ${e.s} (${e.r})`);
  const k = `${e.s}|${e.t}|${e.r}`;
  if (edgeKeys.has(k)) warn(`duplicate edge ${e.s} -${e.r}-> ${e.t}`);
  edgeKeys.add(k);
  degree[e.s] = (degree[e.s] || 0) + 1;
  degree[e.t] = (degree[e.t] || 0) + 1;
}
nodes.forEach((n) => { if (!degree[n.id]) warn(`orphan node (no edges): ${n.id}`); });

// ---- cluster / vocab cross-checks -----------------------------------------
Object.keys(CLUSTERS).forEach((c) => {
  if (!nodes.some((n) => n.cluster === c)) warn(`cluster "${c}" has zero concepts`);
  if (!CONFIG.CLUSTER_TYPE[c]) warn(`cluster "${c}" has no CLUSTER_TYPE in okf.config.js`);
});

// ---- flows & comparisons reference real nodes ------------------------------
(GRAPH.guidedPath?.steps || []).forEach((s) => { if (!ids.has(s.id)) err(`guidedPath step references missing node: ${s.id}`); });
Object.values(GRAPH.decisionTree?.steps || {}).forEach((step) =>
  (step.a || []).forEach((a) => { if (a.rec && !ids.has(a.rec)) err(`decisionTree recommends missing node: ${a.rec}`); }));
(GRAPH.comparisons || []).forEach((set) => {
  set.rows.forEach((r) => { if (!ids.has(r.id)) err(`comparison "${set.id}" row references missing node: ${r.id}`); });
  set.rows.forEach((r) => set.dimensions.forEach((d) => { if (r[d.key] == null) warn(`comparison "${set.id}" row ${r.id} missing dimension "${d.key}"`); }));
});

// ---- OKF bundle conformance + bundle/data consistency ----------------------
function walkMd(dir, acc) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walkMd(p, acc);
    else if (e.name.endsWith('.md') && e.name !== 'index.md' && e.name !== 'log.md') acc.push(p);
  }
  return acc;
}
let bundleIds = new Set();
if (fs.existsSync(BUNDLE)) {
  const files = walkMd(BUNDLE, []);
  for (const f of files) {
    const id = path.basename(f, '.md');
    bundleIds.add(id);
    const txt = fs.readFileSync(f, 'utf8');
    if (!txt.startsWith('---')) { err(`OKF: ${path.relative(ROOT, f)} has no frontmatter`); continue; }
    const fm = txt.slice(3, txt.indexOf('\n---', 3));
    if (!/(^|\n)\s*type:\s*\S/.test(fm)) err(`OKF: ${path.relative(ROOT, f)} missing required "type" field`);
  }
  // consistency: bundle files <-> generated nodes
  nodes.forEach((n) => { if (!bundleIds.has(n.id)) warn(`data.js node "${n.id}" has no markdown file (stale build?)`); });
  [...bundleIds].forEach((id) => { if (!ids.has(id)) warn(`bundle file "${id}.md" not in data.js — run: node scripts/okf.js build`); });
} else {
  warn('knowledge/ bundle not found — skipped OKF conformance checks');
}

// ---- report ----------------------------------------------------------------
console.log(`\nLLM Bodhi — validation`);
const newCount = RELEASE ? nodes.filter((n) => n.added === RELEASE.version).length : 0;
console.log(`  concepts: ${nodes.length}  edges: ${edges.length}  clusters: ${Object.keys(CLUSTERS).length}  ` +
            `comparisons: ${(GRAPH.comparisons || []).length}  bundle files: ${bundleIds.size}` +
            (RELEASE ? `  new in ${RELEASE.version}: ${newCount}` : ''));
if (warns.length) { console.log(`\n⚠ ${warns.length} warning(s):`); warns.forEach((w) => console.log('  - ' + w)); }
if (errors.length) { console.log(`\n✗ ${errors.length} error(s):`); errors.forEach((e) => console.log('  - ' + e)); }
else console.log(`\n✓ no errors`);
process.exit(errors.length ? 1 : 0);
