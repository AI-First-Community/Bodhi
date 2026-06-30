---
type: "Architecture Component"
title: "Hybrid SSM–Transformer"
description: "Interleave a majority of Mamba/linear layers with a minority of full-attention layers — long-context throughput with retained recall."
cluster: "architecture"
level: 2
tags:
  - "architecture"
when_to_use: "Production long-context models that need Transformer-level quality at much lower serving cost."
relations:
  - "combines:mamba"
  - "combines:attention"
  - "builds-on:transformer"
references:
  - "Nemotron-H|https://arxiv.org/abs/2504.03624"
  - "Jamba|https://arxiv.org/abs/2403.19887"
resource: "https://arxiv.org/abs/2504.03624"
---

# Hybrid SSM–Transformer

Pure SSMs are efficient but weaker at precise recall; pure attention is costly. Hybrids keep ~1 attention layer per several SSM layers to get both. Shipped at scale in Jamba (AI21), NVIDIA Nemotron-H, and IBM Granite 4.0, cutting KV memory and roughly doubling inference speed at parity.

## When to use

Production long-context models that need Transformer-level quality at much lower serving cost.

## References

- [Nemotron-H](https://arxiv.org/abs/2504.03624)
- [Jamba](https://arxiv.org/abs/2403.19887)
