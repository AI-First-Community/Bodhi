---
type: "Architecture Component"
title: "Feed-Forward / MLP"
description: "Per-token 2-layer MLP (often with SwiGLU); holds most of the parameters and factual knowledge."
cluster: "architecture"
level: 2
tags:
  - "architecture"
  - "core-mechanics"
when_to_use: "Some PEFT methods (DoRA, full-FT) target these; MoE models scale here."
relations:
  - "is-a:moe"
---

# Feed-Forward / MLP

Expands to ~4× d_model then projects back. Modern models use a **gated** variant (SwiGLU) where the gate is Swish/SiLU — *not* sigmoid — outperforming plain ReLU/GELU MLPs. Mechanistic-interpretability work suggests FFN layers act as key-value memories storing facts. Mixture-of-Experts (MoE) sparsifies this layer.

## When to use

Some PEFT methods (DoRA, full-FT) target these; MoE models scale here.

## Related concepts

- is a type of → [Mixture of Experts (MoE)](/architecture/moe.md)
