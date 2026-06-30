---
title: Changelog
nav_order: 10
---

# Changelog

Notable changes per release. The in-app **New** chip always reflects the current release's additions (see [Release Process](Release-Process.md)).

## v0.4.0

**Content** — 118 → **123 concepts**, **229 edges**. Added five core gaps:
- `sampling` — Sampling & Decoding (temperature, top-k, top-p, beam) *(foundations)*
- `pipeline-parallelism` — completes the parallelism trio *(efficiency)*
- `function-calling` — structured tool/function calling *(agents)*
- `multi-agent` — multi-agent orchestration *(agents)*
- `self-refine` — self-refine / reflection *(reasoning)*

**Features**
- **"What's new" highlighting** — concepts carry an optional `added: "<version>"`; an `okf.config.js` `RELEASE` marker keys the highlight. New concepts get a green ring, a "✦ New in vX" panel badge, and a **New** filter chip that spotlights them *with their connections*.
- **Cluster filter** — the legend dock now toggles cluster visibility (click a swatch to show/hide; click the name to zoom).
- **Level chips** simplified to number-only (full names remain in tooltips).

**Docs**
- README: corrected counts, plus motivation/philosophy, "Why Bodhi", and credits & sources sections.
- New documentation **wiki** (this site).
- Polished `LICENSE`/`CONTRIBUTING`; `package.json` → 0.4.0.

## v0.3.0 — Initial release

- First public release: **118 concepts across 11 clusters** as an [OKF](https://github.com/GoogleCloudPlatform/knowledge-catalog/tree/main/okf) bundle.
- Interactive graph (Cytoscape + fcose), detail panels, fuzzy search, level filters, categorized legend dock.
- Interactive flows: decision wizard ("Which technique?"), guided path, compare matrices.
- Export-for-agents (single LLM-ready markdown), light/dark themes, shareable deep links.
- Fully offline, zero runtime dependencies.
