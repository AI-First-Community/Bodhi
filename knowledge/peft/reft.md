---
type: "PEFT Method"
title: "ReFT (Representation Fine-Tuning)"
description: "Learn lightweight interventions on frozen hidden-state representations instead of editing weights — reportedly 15–65× more parameter-efficient than LoRA."
cluster: "peft"
level: 4
tags:
  - "peft"
when_to_use: "You want maximal parameter efficiency or to steer behavior via representations rather than weights."
relations:
  - "alternative:lora"
references:
  - "ReFT (Wu et al)|https://arxiv.org/abs/2404.03592"
resource: "https://arxiv.org/abs/2404.03592"
---

# ReFT (Representation Fine-Tuning)

ReFT (e.g. LoReFT) leaves all weights frozen and instead trains small interventions on activations in a low-rank subspace at selected layers/positions. A different paradigm from weight-delta PEFT (LoRA family), it is highly parameter-efficient and composable with LoRA.

## When to use

You want maximal parameter efficiency or to steer behavior via representations rather than weights.

## References

- [ReFT (Wu et al)](https://arxiv.org/abs/2404.03592)
