---
type: "Reasoning Method"
title: "Reasoning Distillation"
description: "Distill long chain-of-thought traces from a large reasoner into a smaller model — cheap reasoning ability without running RL."
cluster: "reasoning"
level: 5
tags:
  - "reasoning"
  - "distillation"
when_to_use: "You want strong reasoning in a small / cheap model and have access to a capable reasoner to generate traces."
relations:
  - "is-a:distillation"
  - "requires:reasoning-models"
  - "combines:long-cot"
  - "combines:sft"
references:
  - "DeepSeek-R1 (distilled models)|https://arxiv.org/abs/2501.12948"
resource: "https://arxiv.org/abs/2501.12948"
---

# Reasoning Distillation

Generate long-CoT reasoning traces with a strong reasoner (e.g. DeepSeek-R1), then supervised-fine-tune a smaller model on those traces. DeepSeek showed that small models distilled from R1 outperform the same small models trained with RL directly — the reasoning behavior transfers through the traces. It is the cheapest path to a capable small reasoner, since it needs only SFT, no reward model or RL infrastructure. Limitation: distilled students still trail the frontier teacher (R1-distilled models show sizable gaps on the hardest benchmarks) and inherit its blind spots — set expectations accordingly.

## When to use

You want strong reasoning in a small / cheap model and have access to a capable reasoner to generate traces.

## References

- [DeepSeek-R1: distilled dense models](https://arxiv.org/abs/2501.12948)
