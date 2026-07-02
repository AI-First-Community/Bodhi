---
type: "Multimodal / Vision"
title: "Multimodal Fusion"
description: "How modalities are combined into one model: input-level projection, deep cross-attention, or late fusion — the core design choice behind any multimodal system."
cluster: "multimodal"
level: 4
added: "0.5.0"
tags:
  - "multimodal"
when_to_use: "Deciding how to wire a vision (or audio) encoder into an LLM — trading simplicity and data-efficiency against capacity."
relations:
  - "builds-on:attention"
  - "combines:vlm"
references:
  - "Flamingo — a Visual Language Model for Few-Shot Learning|https://arxiv.org/abs/2204.14198"
  - "LLaVA — Visual Instruction Tuning|https://arxiv.org/abs/2304.08485"
resource: "https://arxiv.org/abs/2204.14198"
---

# Multimodal Fusion

Fusion is *how* two modalities are combined, and it spans a spectrum:

- **Early / input fusion** — project encoded image features into embeddings the LLM consumes as if they were tokens (LLaVA). Simple and data-efficient; the dominant recipe.
- **Deep / cross-attention fusion** — interleave gated cross-attention layers so the LLM attends to visual features at every block (Flamingo). More capacity, and it handles arbitrarily interleaved image–text.
- **Late fusion** — encode each modality separately and combine only at the end (a dual-encoder like CLIP). Cheap and great for retrieval, but the modalities interact minimally.

The choice trades compute and training data against how tightly the modalities need to interact.

## When to use

Deciding how to wire a vision (or audio) encoder into an LLM — trading simplicity and data-efficiency against capacity.

## References

- [Flamingo — a Visual Language Model for Few-Shot Learning](https://arxiv.org/abs/2204.14198)
- [LLaVA — Visual Instruction Tuning](https://arxiv.org/abs/2304.08485)
