# Bodhi Map 🍃

*An open, interactive knowledge graph of modern AI.*

### 🔗 [Open the live map ↗](https://ai-first-community.github.io/Bodhi/) · [Documentation ↗](https://ai-first-community.github.io/Bodhi/docs/)

Understand AI from tokens and attention all the way to LoRA, DPO, reasoning models, agents, and quantization. Every concept is a node; edges show how techniques relate, improve on, or combine with each other.

Fully **offline & self-contained** — no internet, no build step. Just open `index.html`.

> Open source — contributions welcome. Concepts are plain markdown in [`knowledge/`](knowledge/) (see [Editing / extending](#editing--extending)).
> Created by **Sanjeev** · *Innovate with Sanjeev*.

## Why "Bodhi"? — motivation & philosophy

**Bodhi** (बोधि) is a Sanskrit/Pali word for *awakening* — the moment scattered
facts suddenly resolve into understanding. The 🍃 is a nod to the Bodhi tree, under
which that insight is said to have dawned. The name is the goal: not to pile up
information, but to help understanding *click*.

The motivation is simple. Modern AI moves faster than anyone can read, and the
knowledge that matters is real but **scattered** across hundreds of papers, blog
posts, and docs. The hardest part isn't finding definitions — it's seeing the
**connections**: how LoRA relates to full fine-tuning, when DPO beats PPO, where
quantization fits in a pipeline. Newcomers drown in tabs; practitioners keep a
messy map in their heads. Bodhi Map is an attempt to draw that map in the open.

A few principles guide it:

- **Understanding over hype** — every concept earns its place with a real source
  and a plain-language *why* and *when to use*, not buzzwords.
- **Connections are the content** — techniques are nodes; the typed edges
  (`improves-on`, `alternative`, `combines`) are where the real insight lives.
- **Open & offline by default** — no accounts, no CDNs, no telemetry. One folder,
  open `index.html`, and it works on a plane.
- **A path, not a pile** — clustered from foundations to the frontier so you can
  walk from tokens to agents at your own pace.

## Run

```bash
open index.html          # the landing page — then click "Enter the map"
# or open app.html directly for the interactive graph
```

## Features

- **Graph view** — 123 concepts across 11 clusters (Foundations · Architecture · Model Archetypes · Adaptation Spectrum · PEFT · SFT/Instruction · Alignment/Preference · Reasoning & Test-Time · Agents & Retrieval · Efficiency & Infra · Data & Evaluation), color-coded, with typed edges (`is-a`, `improves-on`, `alternative`, `requires`, `combines`, `builds-on`). Force-directed `fcose` layout with clean cluster separation.
- **Click any node** → detail panel: plain-language summary, deeper detail, *when to use*, a code snippet, connections, and paper references.
- **🧭 Which technique?** — an interactive decision wizard that asks a few questions and recommends the right rung of the adaptation ladder (RAG vs prompting vs LoRA/QLoRA vs full fine-tuning vs DPO/RLVR), then opens it in the graph.
- **▶ Guided Path** — an animated walkthrough of a real workflow: base model → SFT → LoRA → DPO → eval → quantize.
- **Compare** — side-by-side matrices for the technique families people most need to choose between: PEFT methods (LoRA · QLoRA · DoRA · AdaLoRA · Adapters · Prefix/Prompt/P-tuning · IA³ · BitFit) and Preference optimization (PPO · DPO · IPO · KTO · ORPO · SimPO · GRPO), across dimensions like trainable params, VRAM, mergeability, reward/reference-model needs, and pipeline. Click any technique to jump to it in the graph.
- **⬇ For agents** — one click downloads the entire knowledge base as a single LLM-ready markdown context file (`llm-bodhi-knowledge.md`): every concept with its type, summary, detail, when-to-use, example, typed relations, and references. Drop it into an LLM/RAG pipeline as grounding context — the agent-ready payoff of the OKF backing.
- **Light / dark theme** — toggle in the top-right (or press `t`); preference persists across sessions.
- **Fuzzy search** (`f`) — ranked, typo-tolerant matching over names + summaries (e.g. "attn" → Attention), with `↑`/`↓`/`Enter` keyboard navigation. **Level filters** — focus from Foundations (1) to Advanced/Alignment (5). **Cluster filters** — the legend dock doubles as a filter: click a swatch to show/hide that cluster (label still zooms), so you can pare the map down to your interest.
- **✦ What's new** — concepts added in the current release are marked (`added:` in frontmatter, keyed to a `RELEASE` version), shown with a green ring on the graph and a **New** chip in the toolbar that filters to just the additions — so every release can highlight what changed.
- **Shareable deep links** — the open concept or comparison is encoded in the URL hash (`#concept=lora`, `#compare=peft`), so any view can be bookmarked or shared and reopens exactly there.
- **Responsive** — adapts to narrow screens; legend dock collapses on mobile.

### Coverage highlights

Foundations & architecture (tokens → attention → MoE) · the full adaptation ladder · all major PEFT methods (LoRA, QLoRA, DoRA, AdaLoRA, adapters, prefix/prompt/P-tuning, IA³, BitFit) · SFT & instruction tuning · preference alignment (RLHF/PPO, DPO, IPO, KTO, ORPO, SimPO, **GRPO**, **RLVR**, rejection sampling, RLAIF) · efficiency (quantization, GPTQ/AWQ, distillation, FSDP/ZeRO, FlashAttention, **speculative decoding**, **model merging**) · data & evaluation.

## Built on the Open Knowledge Format (OKF)

The content is stored as a conformant [**Open Knowledge Format**](https://github.com/GoogleCloudPlatform/knowledge-catalog/tree/main/okf) v0.1 bundle (Google Cloud, Apache 2.0) under [`knowledge/`](knowledge/) — a directory of markdown files, one per concept, with YAML frontmatter and bundle-relative `.md` links forming the knowledge graph. This makes the content **portable, git-shippable, and agent-ready**: the same bundle that powers this visualizer can be fed to an LLM/RAG pipeline or rendered by any other OKF tool.

`knowledge/` is the **source of truth**. The browser's `js/data.js` is a *generated* artifact — a tiny build compiles the bundle into it so the app stays single-folder and works offline (browsers can't `fetch()` local markdown over `file://`).

```
knowledge/                 ← OKF bundle (SOURCE OF TRUTH)
  index.md                 ← bundle root (reserved, no frontmatter)
  peft/
    index.md               ← cluster listing (reserved)
    lora.md                ← one concept = one markdown file
    ...
okf.config.js              ← controlled vocab (clusters, relations, levels) + flows (wizard, path)
scripts/okf.js             ← export (data.js→bundle) + build (bundle→data.js)
js/data.js                 ← GENERATED — do not edit by hand
```

### Editing / extending

Add or edit a concept by writing a markdown file in the right cluster folder, then rebuild:

```bash
# knowledge/peft/my-technique.md
---
type: PEFT Method
title: My Technique
description: One-line essence (the node summary).
cluster: peft
level: 4
when_to_use: When to reach for it.
relations:
  - improves-on:lora        # creates a typed edge in the graph
references:
  - My Paper|https://arxiv.org/abs/...
---

# My Technique

Deeper explanation (becomes the detail panel body).

## Example
```python
example()
```
```

```bash
npm run build          # or: node scripts/okf.js build   → regenerates js/data.js
npm start              # or: open index.html
```

New clusters / relation types / wizard steps live in `okf.config.js`. The bundle remains valid OKF, so `knowledge/` also opens in Google's reference OKF visualizer.

## Files

| File | Purpose |
|------|---------|
| `index.html` | Landing page — the site front door |
| `app.html` | The interactive map — app shell + UI |
| `css/style.css` | Light/dark themes, typography, panel & graph layout |
| `fonts/` | Manrope (woff2, 400–800) — vendored locally, no font CDN |
| `knowledge/` | **OKF bundle — the source of truth** (concepts + typed relations) |
| `okf.config.js` | Controlled vocabulary + interactive flows |
| `scripts/okf.js` | OKF export / build tooling (zero dependencies) |
| `js/data.js` | **Generated** runtime data (do not hand-edit) |
| `js/graph.js` | Cytoscape rendering & interactions |
| `js/cytoscape.min.js` + `fcose` deps | Vendored graph libraries (offline) |

## Documentation

Full docs live in [**`docs/`**](docs/) — a complete guide to using, authoring, and
extending Bodhi Map:

- [Getting Started](docs/Getting-Started.md) · [User Guide](docs/User-Guide.md) · [FAQ](docs/FAQ.md)
- [Concept Authoring](docs/Concept-Authoring.md) · [Configuration Reference](docs/Configuration-Reference.md) · [Architecture](docs/Architecture.md)
- [Contributing](docs/Contributing.md) · [Release Process](docs/Release-Process.md) · [Roadmap](docs/Roadmap.md) · [Changelog](docs/Changelog.md)

## Contributing

Contributions — new concepts, corrections, better explanations — are welcome.
Adding a concept is just writing a Markdown file in [`knowledge/`](knowledge/)
and running `npm run build` (which validates). See [CONTRIBUTING.md](CONTRIBUTING.md)
and the [Concept Authoring](docs/Concept-Authoring.md) guide for the format and quality bar.

## Credits & sources

Bodhi Map stands on **publicly published research** — it does not originate the
techniques it describes, and credit for the underlying ideas belongs to the
respective authors and research teams. Every concept is grounded in its primary
source: the original paper, official blog post, or documentation. Those citations
live with the content, not buried in a footnote — each concept node shows its
**References** in the detail panel, and the same links are in the OKF frontmatter
under `knowledge/` (200+ source links in total).

What Bodhi Map adds on top is its own contribution: the **curation, hands-on
experience, and practical judgment** — how the pieces fit together, plain-language
explanations, *when to use* guidance, the typed relationships between techniques,
and the interactive experience (decision wizard, guided path, comparisons). The
value is in the synthesis and the experience of navigating it, not in any single
paper.

If you spot a missing, wrong, or better source for any concept, please open an
issue or PR — accurate attribution is part of the [quality bar](CONTRIBUTING.md#quality-bar).

**Third-party software & assets** (all vendored locally so the app stays offline):

| Component | Used for | License |
|-----------|----------|---------|
| [Open Knowledge Format](https://github.com/GoogleCloudPlatform/knowledge-catalog/tree/main/okf) (Google Cloud) | Knowledge bundle format | Apache-2.0 |
| [Cytoscape.js](https://js.cytoscape.org/) + [fcose](https://github.com/iVis-at-Bilkent/cytoscape.js-fcose) layout | Graph rendering & layout | MIT |
| [Manrope](https://github.com/sharanda/manrope) | UI typeface (`fonts/`) | SIL OFL 1.1 |

## License

[MIT](LICENSE) © 2026 Sanjeev Azad — *Innovate with Sanjeev*. Use, fork, and build on it freely.

The MIT license covers this project's own code and the curation/explanations. The
referenced papers and sources remain the property of their respective authors.
