# Bodhi Map 🍃

*An open, interactive knowledge graph of modern AI.*

Understand AI from tokens and attention all the way to LoRA, DPO, reasoning models, agents, and quantization. Every concept is a node; edges show how techniques relate, improve on, or combine with each other.

Fully **offline & self-contained** — no internet, no build step. Just open `index.html`.

> Open source — contributions welcome. Concepts are plain markdown in [`knowledge/`](knowledge/) (see [Editing / extending](#editing--extending)).
> Created by **Sanjeev** · *Innovate with Sanjeev*.

## Run

```bash
open index.html          # macOS — opens in default browser
# or double-click index.html
```

## Features

- **Graph view** — ~67 concepts clustered by theme (Foundations · Architecture · Adaptation · PEFT · SFT · Alignment · Efficiency · Data/Eval), color-coded, with typed edges (`is-a`, `improves-on`, `alternative-to`, `requires`, `combines-with`, `builds-on`). Force-directed `fcose` layout with clean cluster separation.
- **Click any node** → detail panel: plain-language summary, deeper detail, *when to use*, a code snippet, connections, and paper references.
- **🧭 Which technique?** — an interactive decision wizard that asks a few questions and recommends the right rung of the adaptation ladder (RAG vs prompting vs LoRA/QLoRA vs full fine-tuning vs DPO/RLVR), then opens it in the graph.
- **▶ Guided Path** — an animated walkthrough of a real workflow: base model → SFT → LoRA → DPO → eval → quantize.
- **Compare** — side-by-side matrices for the technique families people most need to choose between: PEFT methods (LoRA · QLoRA · DoRA · AdaLoRA · Adapters · Prefix/Prompt/P-tuning · IA³ · BitFit) and Preference optimization (PPO · DPO · IPO · KTO · ORPO · SimPO · GRPO), across dimensions like trainable params, VRAM, mergeability, reward/reference-model needs, and pipeline. Click any technique to jump to it in the graph.
- **⬇ For agents** — one click downloads the entire knowledge base as a single LLM-ready markdown context file (`llm-bodhi-knowledge.md`): every concept with its type, summary, detail, when-to-use, example, typed relations, and references. Drop it into an LLM/RAG pipeline as grounding context — the agent-ready payoff of the OKF backing.
- **Light / dark theme** — toggle in the top-right (or press `t`); preference persists across sessions.
- **Fuzzy search** (`f`) — ranked, typo-tolerant matching over names + summaries (e.g. "attn" → Attention), with `↑`/`↓`/`Enter` keyboard navigation. **Level filters** — focus from Foundations (1) to Advanced/Alignment (5). **Categorized legend dock** — clusters grouped by learning phase, collapsible, with concept counts; click to zoom.
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
| `index.html` | App shell + UI |
| `css/style.css` | Light/dark themes, typography, panel & graph layout |
| `fonts/` | Manrope (woff2, 400–800) — vendored locally, no font CDN |
| `knowledge/` | **OKF bundle — the source of truth** (concepts + typed relations) |
| `okf.config.js` | Controlled vocabulary + interactive flows |
| `scripts/okf.js` | OKF export / build tooling (zero dependencies) |
| `js/data.js` | **Generated** runtime data (do not hand-edit) |
| `js/graph.js` | Cytoscape rendering & interactions |
| `js/cytoscape.min.js` + `fcose` deps | Vendored graph libraries (offline) |

## Contributing

Contributions — new concepts, corrections, better explanations — are welcome.
Adding a concept is just writing a Markdown file in [`knowledge/`](knowledge/)
and running `npm run build` (which validates). See [CONTRIBUTING.md](CONTRIBUTING.md)
for the format and quality bar.

## License

[MIT](LICENSE) © 2026 Sanjeev Azad — *Innovate with Sanjeev*. Use, fork, and build on it freely.
