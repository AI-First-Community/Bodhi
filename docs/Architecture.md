---
title: Architecture
nav_order: 6
---

# Architecture

Bodhi Map is intentionally tiny: a markdown knowledge bundle, a zero-dependency build that compiles it to a single JS file, and a browser app that renders it. No server, no framework, no internet.

## The pipeline

```
knowledge/            okf.config.js
(OKF bundle,          (clusters, levels, relations,
 source of truth)      RELEASE, wizard, path, comparisons)
      │                       │
      └─────────┬─────────────┘
                ▼
      scripts/okf.js build         ← parse frontmatter + bodies, derive edges
                │
                ▼
          js/data.js               ← GENERATED runtime (CLUSTERS, LEVELS,
                │                     RELATIONS, RELEASE, GRAPH)
                ▼
   app.html → js/graph.js           ← Cytoscape renders the graph + UI
                │
       scripts/validate.js          ← integrity gate (runs after every build)
```

### Why generate `js/data.js` at all?
Browsers can't `fetch()` local markdown over `file://`, so the app can't read `knowledge/` directly while staying offline and single-folder. The build compiles the bundle into one JS file the page can load with a plain `<script>` tag. **`knowledge/` is the source of truth; `js/data.js` is a generated artifact — never hand-edit it.**

## Key files

| File | Role |
|---|---|
| `knowledge/` | OKF v0.1 bundle — one markdown file per concept, grouped by cluster. `index.md` files are reserved listings. **Edit here.** |
| `okf.config.js` | Controlled vocabulary + interactive flows. See [Configuration Reference](Configuration-Reference.md). |
| `scripts/okf.js` | Build/export tooling. `build`: bundle + config → `js/data.js`. `export`: `js/data.js` → bundle (bootstrap only). |
| `scripts/validate.js` | Integrity auditor; exits non-zero on errors so it can gate a build/commit. |
| `js/data.js` | **Generated** runtime data. |
| `js/graph.js` | The app: builds Cytoscape elements, styling, layout, panels, search, filters, flows, compare, export. |
| `js/cytoscape.min.js` + `cose-base.js` + `layout-base.js` + `cytoscape-fcose.js` | Vendored graph library + `fcose` layout (offline). |
| `css/style.css` | Themes (light/dark), typography, panel & graph layout. |
| `fonts/` | Manrope (woff2) vendored locally — no font CDN. |
| `index.html` | Landing/intro page — the site front door. |
| `app.html` | The interactive map — app shell + top bar + dock. |

## How the build works (`scripts/okf.js build`)

1. **Walk** `knowledge/` for `*.md` (skipping `index.md`/`log.md`).
2. **Parse** each file's YAML-subset frontmatter and body. Frontmatter → node fields (`id`, `label`, `type`, `cluster`, `level`, `summary`, `whenToUse`, `added`, `refs`). Body → `detail` (text before the first `##`/code fence) and `code` (first fenced block).
3. **Derive edges** from each concept's `relations: verb:target` lines, plus `path` edges from `GUIDED_PATH`.
4. **Order** nodes deterministically (by level, then cluster order, then id).
5. **Emit** `js/data.js` as `const CLUSTERS / LEVELS / RELATIONS / RELEASE / GRAPH = …`.

The frontmatter codec is a deliberately small, controlled subset of YAML (scalars + lists of scalars), with strings JSON-quoted so any content round-trips. There is no YAML dependency.

## How the app works (`js/graph.js`)

- Builds Cytoscape **elements**: a compound parent per cluster, a node per concept (carrying `cluster`, `level`, `color`, `isNew`), and an edge per relation (carrying `rel`, `color`, `lineStyle`).
- Lays out with **fcose** (cose fallback) for clean cluster separation.
- Wires up the detail panel, fuzzy search, the combined **level + cluster + new** filter, the legend dock (grouped by learning phase), the decision wizard and guided path, compare modals, the agents export, theming, minimap, and deep links (URL hash).

## Validation (`scripts/validate.js`)

Runs after every build and can gate a commit (non-zero exit on errors). It checks:
- **Nodes:** unique ids, required fields (label, summary, cluster, level in range), known cluster, valid `added` semver, URL-shaped references.
- **Edges:** endpoints exist, known relation verb, no dangling targets; warns on self-loops, duplicates, orphans.
- **Vocab cross-checks:** every cluster has concepts and a `CLUSTER_TYPE`.
- **Flows & comparisons:** wizard `rec`, guided-path steps, and comparison rows all reference real nodes.
- **Bundle ↔ data sync:** every markdown file is in `data.js` and vice-versa (catches a stale build).

## Design constraints

- **Offline & self-contained** — no CDNs, external fonts, scripts, or icons. Everything is vendored; icons are inline SVG.
- **Zero runtime dependencies** — `npm` is only a task runner; the build/validate scripts use just Node's standard library.
- **OKF-conformant** — `knowledge/` is a valid Open Knowledge Format bundle, so it also opens in other OKF tooling and feeds LLM/RAG pipelines directly.
