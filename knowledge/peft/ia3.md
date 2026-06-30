---
type: "PEFT Method"
title: "(IA)³"
description: "Learn tiny per-feature scaling vectors that rescale keys, values, and FFN activations."
cluster: "peft"
level: 4
tags:
  - "peft"
  - "fine-tuning-techniques"
when_to_use: "Extreme parameter efficiency / few-shot fine-tuning."
references:
  - "(IA)³ / T-Few|https://arxiv.org/abs/2205.05638"
resource: "https://arxiv.org/abs/2205.05638"
---

# (IA)³

Even fewer parameters than LoRA; multiplies activations by learned vectors. Used in the T-Few recipe for strong few-shot results.

## When to use

Extreme parameter efficiency / few-shot fine-tuning.

## References

- [(IA)³ / T-Few](https://arxiv.org/abs/2205.05638)
