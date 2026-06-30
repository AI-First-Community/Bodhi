# Configuration Reference

`okf.config.js` is the **single source of truth for everything that is not a concept** — the controlled vocabulary (clusters, levels, relations), the release marker, and the interactive flows (decision wizard, guided path, comparison tables). The build inlines it into `js/data.js`, so after any change run `npm run build`.

It's a UMD module that works in both Node (the build) and the browser. All exports are returned at the bottom: `{ CLUSTERS, CLUSTER_TYPE, LEVELS, RELATIONS, RELEASE, DECISION_TREE, GUIDED_PATH, COMPARISONS }`.

---

## CLUSTERS

The themed groups nodes belong to. Each has a label and a color (used for the node fill and cluster box).

```js
const CLUSTERS = {
  foundations:  { label: 'Foundations',            color: '#3b82f6' },
  architecture: { label: 'Architecture',           color: '#8b5cf6' },
  // …
};
```

**Add a cluster:**
1. Add an entry here (id → `{ label, color }`).
2. Add a matching `CLUSTER_TYPE[id]` (the OKF `type` its concepts use).
3. Create `knowledge/<id>/` and add concept files with `cluster: <id>`.
4. Optionally add the cluster to a learning-phase group in `js/graph.js` (`CLUSTER_GROUPS`) so it appears in the legend dock — otherwise it still renders but won't be grouped.
5. `npm run build`.

## CLUSTER_TYPE

Maps each cluster id to the OKF `type` value its concepts declare in frontmatter (e.g. `peft → 'PEFT Method'`). Every cluster needs one (the validator warns otherwise).

## LEVELS

The 1–5 learning-depth scale used by the level filter. Names are display-only.

```js
const LEVELS = { 1:'Foundations', 2:'Core Mechanics', 3:'Adaptation Basics',
                 4:'Fine-Tuning Techniques', 5:'Advanced / Alignment' };
```

## RELATIONS

The typed edge vocabulary — each verb's label, color, and line style in the graph.

```js
const RELATIONS = {
  'is-a':        { label: 'is a type of',   color: '#64748b', style: 'solid'  },
  'improves-on': { label: 'improves on',    color: '#10b981', style: 'solid'  },
  // … 'alternative', 'requires', 'combines', 'builds-on'
  'path':        { label: 'example step',   color: '#fbbf24', style: 'solid'  }, // internal: guided-path edges
};
```

`path` is reserved for guided-path edges (derived from `GUIDED_PATH`, not authored on concepts). To add a new authorable verb, add an entry here, then you can use it in concept `relations`.

## RELEASE

The current version marker that powers the **"what's new"** highlight.

```js
const RELEASE = { version: '0.4.0', label: 'v0.4.0' };
```

Concepts whose frontmatter `added:` equals `RELEASE.version` are surfaced as new (green ring + **New** filter chip). On each release, bump this and tag the new concepts — see **[Release Process](Release-Process.md)**.

## DECISION_TREE (the "Which technique?" wizard)

A small state machine: `start` names the first step; `steps` maps step ids to a question `q` and an array of answers `a`. Each answer either **recommends** a concept (`rec: '<id>'`, with a `why`) or advances to the next step (`next: '<stepId>'`). An answer may also chain a follow-up after a recommendation via `then: '<stepId>'`.

```js
const DECISION_TREE = {
  start: 'knowledge',
  steps: {
    knowledge: { q: '…', a: [
      { label: 'Yes — needs fresh facts', rec: 'rag', why: '…' },
      { label: 'No — needs new behavior',  next: 'data' },
    ]},
    // …
  },
};
```
`rec` ids must be real concept ids (the validator checks this).

## GUIDED_PATH (the "▶ Guided Path" walkthrough)

An ordered list of concept ids with a note each. The build derives `path` edges between consecutive steps automatically.

```js
const GUIDED_PATH = {
  title: 'Worked example: base model → production support assistant',
  steps: [
    { id: 'decoder-gpt',  note: 'Start from a pretrained decoder-only base.' },
    { id: 'sft',          note: 'Supervised fine-tune on demonstrations.' },
    // …
  ],
};
```
Every `id` must be a real concept (validator-checked).

## COMPARISONS (the "Compare" tables)

An array of comparison matrices. Each has an `id`, `title`, `blurb`, a list of `dimensions` (the columns: `{ key, label }`), and `rows` keyed by concept `id` plus a value per dimension `key`.

```js
{
  id: 'peft',
  title: 'PEFT methods',
  blurb: '…',
  dimensions: [ { key: 'params', label: 'Trainable params' }, /* … */ ],
  rows: [
    { id: 'lora', params: '~0.1–1%', /* …one value per dimension key… */ },
  ],
}
```
Each row's `id` must be a real concept (clicking the row jumps to it). The validator warns if a row is missing a dimension value.

---

After editing `okf.config.js`, always run `npm run build` and confirm `npm run validate` reports **0 errors**. See **[Architecture](Architecture.md)** for how this file flows into the runtime.
