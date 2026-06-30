---
type: "Efficiency Technique"
title: "Model Merging"
description: "Combine multiple fine-tuned models/adapters into one — no extra training (SLERP, TIES, DARE)."
cluster: "efficiency"
level: 5
tags:
  - "efficiency"
  - "advanced-alignment"
when_to_use: "Fuse several specialist fine-tunes (or LoRA adapters) into one model without retraining."
relations:
  - "alternative:full-ft"
references:
  - "TIES-Merging|https://arxiv.org/abs/2306.01708"
resource: "https://arxiv.org/abs/2306.01708"
---

# Model Merging

Average or interpolate weights of models tuned on different tasks/data to fuse their skills. TIES/DARE resolve sign conflicts and prune redundant deltas. Cheap way to build a multi-skill model or ensemble LoRA adapters.

## When to use

Fuse several specialist fine-tunes (or LoRA adapters) into one model without retraining.

## Related concepts

- alternative to → [Full Fine-Tuning](/adaptation/full-ft.md)

## References

- [TIES-Merging](https://arxiv.org/abs/2306.01708)
