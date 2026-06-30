# Bodhi Map 🍃 — Documentation

*An open, interactive knowledge graph of modern AI.*

> 📖 This is the project documentation. Browsing on GitHub? Every page below is a markdown file in this `docs/` folder.

**Bodhi Map** turns the scattered landscape of modern AI — from tokens and attention all the way to LoRA, DPO, reasoning models, agents, and quantization — into a single navigable map. Every concept is a node; typed edges show how techniques **relate**, **improve on**, **combine with**, or **build on** each other. It runs **fully offline** in a browser with **zero dependencies** — just open `index.html`.

> New here? Jump to **[Getting Started](Getting-Started.md)** to run it, or the **[User Guide](User-Guide.md)** to learn what it can do.

---

## At a glance

| | |
|---|---|
| **Concepts** | 123 across 11 clusters |
| **Relations** | 229 typed edges (`is-a`, `improves-on`, `alternative`, `requires`, `combines`, `builds-on`) |
| **Runtime** | Single folder, no build step, no internet — works on a plane |
| **Source format** | [Open Knowledge Format (OKF)](https://github.com/GoogleCloudPlatform/knowledge-catalog/tree/main/okf) bundle — markdown, git-shippable, agent-ready |
| **License** | MIT |
| **Current release** | v0.4.0 |

## Why it exists (philosophy)

Modern AI moves faster than anyone can read, and the knowledge that matters is real but **scattered** across hundreds of papers, blogs, and docs. The hard part isn't finding definitions — it's seeing the **connections**: how LoRA relates to full fine-tuning, when DPO beats PPO, where quantization fits. Bodhi Map draws that map in the open. Guiding principles:

- **Understanding over hype** — every concept cites a real source and explains *why* and *when to use*.
- **Connections are the content** — the typed edges are where the insight lives.
- **Open & offline by default** — no accounts, no CDNs, no telemetry.
- **A path, not a pile** — clustered from foundations to the frontier.

*Bodhi* (बोधि) is Sanskrit/Pali for **awakening** — the moment scattered facts resolve into understanding.

## How the project is organized

`knowledge/` is the **source of truth** — an OKF bundle of one markdown file per concept. A tiny zero-dependency build compiles it into `js/data.js`, which the browser app renders. See **[Architecture](Architecture.md)** for the full pipeline.

```
knowledge/      ← OKF bundle (SOURCE OF TRUTH — edit here)
okf.config.js   ← clusters, levels, relations, release, interactive flows
scripts/        ← build + validate tooling (no deps)
js/data.js      ← GENERATED (do not hand-edit)
js/graph.js     ← the app (Cytoscape.js, vendored offline)
index.html      ← app shell · landing.html ← landing page
```

## Documentation map

- **[Getting Started](Getting-Started.md)** — run it in 30 seconds.
- **[User Guide](User-Guide.md)** — graph navigation, search, level & cluster filters, the *New* highlight, the decision wizard, guided path, compare tables, export-for-agents, themes, deep links, keyboard shortcuts.
- **[Concept Authoring](Concept-Authoring.md)** — add or edit a concept (the most common contribution): the frontmatter schema, relation verbs, levels, sources, and marking something new.
- **[Configuration Reference](Configuration-Reference.md)** — extend the controlled vocabulary and interactive flows in `okf.config.js`.
- **[Architecture](Architecture.md)** — how the bundle → build → runtime pipeline works, and why it's offline.
- **[Contributing](Contributing.md)** — the full fork → PR workflow and quality bar.
- **[Release Process](Release-Process.md)** — how to cut a versioned release and highlight what's new.
- **[Roadmap](Roadmap.md)** — direction and candidate additions.
- **[Changelog](Changelog.md)** — notable changes per release.
- **[FAQ](FAQ.md)** — quick answers.

## Contributing in one line

Adding a concept is just writing a markdown file in `knowledge/` and running `npm run build` (which validates). Start with **[Concept Authoring](Concept-Authoring.md)**.
