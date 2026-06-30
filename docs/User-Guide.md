---
title: User Guide
nav_order: 3
---

# User Guide

Everything the Bodhi Map app can do. Open `app.html` (the interactive map — or click *Enter the map* from the `index.html` landing) and follow along.

## The graph

- **Nodes** are concepts, grouped into **clusters** (color-coded compound boxes) and laid out with a force-directed `fcose` layout for clean separation.
- **Edges** are typed relationships. The relationship legend (in the dock) shows each verb's color and line style:
  - `is-a` — is a type of
  - `improves-on` — improves on
  - `alternative` — alternative to
  - `requires` — requires
  - `combines` — combines with
  - `builds-on` — builds on
- **Navigation:** drag to pan, scroll/pinch to zoom. Click empty space to deselect.
- **Click a node** → it spotlights, fades the rest, and opens the **detail panel** with: summary, deeper detail, *when to use*, an example snippet, its typed connections (clickable), and references.

## Search (`f`)

Ranked, typo-tolerant fuzzy search over concept names and summaries (e.g. "attn" → Attention, "speculate" → Speculative Decoding). Navigate results with `↑` / `↓` and open with `Enter`.

## Filters

Filters combine — a node shows only if it passes all active filters.

- **Level filter (top bar):** chips `1`–`5` toggle learning depth, from Foundations (1) to Advanced/Alignment (5). Each chip's tooltip names the level.
- **Cluster filter (legend dock):** the legend doubles as a filter. **Click a cluster's color swatch** to show/hide that cluster (it dims with a strikethrough when hidden); **click the cluster name** to zoom to it. Use this to pare the map down to your area of interest.
- **✦ New (top bar):** spotlights concepts added in the current release **together with their direct neighbors**, so you can see how the latest additions wire into the existing map. The count on the chip shows how many are new. (Hidden automatically if a release adds nothing.)

## Interactive flows

- **🧭 Which technique?** — a decision wizard. Answer a few questions about your data, compute, and goals; it recommends the right rung of the adaptation ladder (RAG vs prompting vs LoRA/QLoRA vs full fine-tuning vs DPO/RLVR) and opens it in the graph.
- **▶ Guided Path** — an animated walkthrough of a real workflow: base model → dataset prep → SFT → LoRA → DPO → eval → quantize, with a note at each step.

## Compare

Side-by-side matrices for the families people most need to choose between — e.g. **PEFT methods** (LoRA · QLoRA · DoRA · AdaLoRA · Adapters · Prefix/Prompt/P-tuning · IA³ · BitFit), **Preference optimization** (PPO · DPO · IPO · KTO · ORPO · SimPO · GRPO), adaptation strategies, quantization, and attention variants. Click any row to jump to that concept in the graph.

## Export for agents (⬇)

One click downloads the entire knowledge base as a single LLM-ready markdown file (`llm-bodhi-knowledge.md`): every concept with its type, summary, detail, when-to-use, example, typed relations, and references. Drop it into an LLM/RAG pipeline as grounding context — the agent-ready payoff of the OKF backing.

## Display

- **Light / dark theme** — toggle top-right or press `t`; the preference persists across sessions.
- **Minimap** — orientation in the corner; click/drag to pan, press `m` to hide/show.
- **Fit / Re-layout** — buttons to fit the graph to screen or recompute the layout.

## Shareable deep links

The open concept or comparison is encoded in the URL hash — `#concept=lora`, `#compare=peft` — so any view can be bookmarked or shared and reopens exactly there.

## Keyboard shortcuts

| Key | Action |
|---|---|
| `f` | Focus search |
| `↑` / `↓` / `Enter` | Navigate / open search results |
| `t` | Toggle light/dark theme |
| `m` | Toggle minimap |
| `?` | Help & welcome |
| `Esc` | Close panel / modal / flow |

## Responsive

The layout adapts to narrow screens; the legend dock collapses on mobile.
