---
type: "Efficiency Technique"
title: "GaLore (Gradient Low-Rank Projection)"
description: "Project gradients/optimizer state into a periodically-recomputed low-rank subspace — memory-efficient *full-parameter* training, not an adapter."
cluster: "efficiency"
level: 4
tags:
  - "efficiency"
when_to_use: "You want full-FT quality but are optimizer-memory-bound and LoRA's low-rank limit is hurting."
relations:
  - "alternative:lora"
  - "requires:full-ft"
  - "combines:mixed-precision"
references:
  - "GaLore|https://arxiv.org/abs/2403.03507"
resource: "https://arxiv.org/abs/2403.03507"
---

# GaLore (Gradient Low-Rank Projection)

Unlike LoRA (which restricts the weight update to low rank), GaLore keeps full-rank weight updates but compresses the optimizer state by projecting gradients onto a low-rank subspace, cutting optimizer memory up to ~65%. Lets you full-fine-tune a 7B model on a single consumer GPU. Choosing among low-memory full-FT optimizers: **GaLore** is the general baseline; **LOMO/AdaLOMO** push memory/wall-clock lower (AdaLOMO adds adaptive scaling); **Fira** targets very large models; **APOLLO** cheaply approximates Adam's state; **BAdam** does block-wise updates.

## When to use

You want full-FT quality but are optimizer-memory-bound and LoRA's low-rank limit is hurting.

## References

- [GaLore](https://arxiv.org/abs/2403.03507)
